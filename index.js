/**
 */
 
var fs = require('fs-extra'),
	path = require('path'),
	keystonePath = 'node_modules'+path.sep+'keystone',
	keystoneTypesDirPath = path.join(keystonePath,'fields'+path.sep+'types'),
	keystoneLibFieldTypesFile = path.join(keystonePath,'lib'+path.sep+'fieldTypes.js'),
	exitMsg = function(msg){
	  console.log(msg);
	  return;
	};
	
function GetFieldNameFromLine(line){
	var parts = line.split(' ');
	parts.forEach(function(part,index){
		console.log(index +': ' + part);
	})
}
 
module.exports = {
  loadFromDir: function(dirPath) {
    if (!dirPath)
      exitMsg('No path selected for custom fieldTypes');
    
	var stats = fs.statSync(dirPath);
	if (!stats.isDirectory())
		exitMsg('Path is not a directory');
	
	var typesDirs = fs.readdirSync(dirPath).filter(function(file) {
		return fs.statSync(path.join(dirPath, file)).isDirectory();
	});
	
	typesDirs.forEach(function(dir){
		var keystonePath = path.join(keystoneTypesDirPath, dir);
		
		try{
			stats = fs.statSync(keystonePath);
			if (stats)
				fs.removeSync(keystonePath)
		}catch(err){}
	
		fs.copySync(path.join(dirPath, dir), path.join(keystoneTypesDirPath, dir));
	});
	
	keystoneLibFieldTypesFile;
	var lines = fs.readFileSync(keystoneLibFieldTypesFile, 'utf8').toString().split("\n");
	lines=lines.filter(function(line){
		return line.indexOf('get') > -1;
	})
	
	GetFieldNameFromLine(lines[0]);
  }
}