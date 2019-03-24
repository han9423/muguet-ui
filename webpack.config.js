const webpackConfig = require('./config/webpack/webpack.default');
const path = require('path');

const webpackCustomCionfig = {
	entry: {
		main: './src/exports.tsx'
	},
	output: {
		path: path.resolve(__dirname, './release/dist'),
		filename: 'his.js',
		library: 'His',
		libraryTarget: 'umd'
	},
}
module.exports = Object.assign(webpackConfig(), webpackCustomCionfig);
