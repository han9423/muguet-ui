const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const pkg = require('../../package.json');

//  preset config like env
const runTimeEnv = Object.is(process.env.NODE_ENV, 'production') ? 'production': 'development'
module.exports = function exportDefaultConfig(config = {}){
	const configEnv = config.mode ? config.mode: runTimeEnv;
	const devtoolConfig = Object.is(configEnv, 'production') ? null: { devtool: 'source-map' }
	const banner = `
							 Name:${pkg.name} version: ${pkg.version}
										 Author:  ${pkg.author}
							 			LICENSE ${pkg.license}`;

	const webpackConfig = {
		mode: configEnv,
		module: {
			// =======================
			rules: [
				{
					test: /\.tsx?$/,
					use: [{
						loader: 'babel-loader',
					},{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					}]
				},{
					test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
					use: [{
						loader: 'url-loader',
						options: {
							limit: 1024 * 10,
							name: './images/[name].[ext]'
						}
					}]
				},{
					test: /\.(ttf|eot|woff|woff2|otf|svg)/,
					use: [{
						loader: 'file-loader',
						options: {
							name: './font/[name].[ext]',
						}
					}]
				},{
					test: /\.s(c|a)ss$/,
					use: [{
						loader: "style-loader"
					}, {
						loader: "css-loader"
					}, {
						loader: "sass-loader"
					}]
				},{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								sourceMap: Object.is(configEnv, 'development') ? true: false
							}
						}
					]
				}
			]
			//==========================
		},
		resolve:{
			alias: {
				'Muguet': path.resolve(__dirname, './src')
			},
			extensions: ['.js', '.json', '.jsx', '.tsx', '.ts', '.json', 'css', 'scss'],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "his.css",
			}),
			new webpack.BannerPlugin(banner),
			new UglifyWebpackPlugin({
				test: /\.(j|t)s(x|\b)$/i,
				include: /\/src/,
				uglifyOptions: {
					compress: {
						warnings: false,
						drop_console: true,
						collapse_vars: true,
						reduce_vars: true,
					},
					output: {
						beautify: false,
						comments: false,
					},
				},
				extractComments: {
					banner: banner
				}
			}),
			new OptimizeCSSAssetsPlugin({
				sourceMap: Object.is(configEnv, 'development') ? true: false
			}),
		]
	}
	return Object.assign(webpackConfig, devtoolConfig) ;
}
