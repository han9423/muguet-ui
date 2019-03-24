var fs = require('fs-extra');
var path = require('path');
var { red, green } = require('chalk');
var { exec } = require('child_process');
var originPath = path.resolve(__dirname, '../', process.argv[2]);
var targetPath = path.resolve(__dirname, '../', process.argv[3]);
var root = path.resolve(__dirname, '../');

function compileScss(){
	return new  Promise((resolve , reject)=>{
		exec('node-sass src -o src', { cwd: root }, (err, stdout)=>{
			if(err) {
				reject({ code: 0, msg: err.toString() })
			}else{
				resolve({ code: 1, msg: stdout.toString() })
			}
		})
	})
}

function copyToRelease(val){
	if(1 === val.code){
		function copyIt(filePath, targetFilePath){
			fs.readdir(filePath, (err,files) => {
				if(err){
					console.warn(err)
				}else{
					files.forEach((filename) => {
						var filedir = path.join(filePath, filename);
						var targetdir = path.join(targetFilePath, filename);
						fs.stat(filedir, (error, stats) => {
							if(error){
								console.warn('获取文件stats失败');
							}else{
								if(filePath.indexOf('stylesheet') < 0){
									if(stats.isFile() && /\.css$/.test(filename)){
										fs.copy(filedir, targetdir, (err)=>{
											if(err) console.log(err);
										});
									}
								}
								if(stats.isDirectory()){
									copyIt(filedir, targetdir);
								}
							}
						})
					});
				}
			});
		}
		copyIt(originPath, targetPath);
	}
}

async function scss(){
	const finishCompile  = await  compileScss().then(data=> {
		console.log(green(data.msg));
		return data;
	}).catch((error)=>{
		console.error(red(error.msg));
	})
	await copyToRelease(finishCompile);
}

scss();
