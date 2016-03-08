/**
 */
 
var fs = require('fs-extra'),
	path = require('path'),
	exitMsg = function(msg){
	  console.log(msg);
	  return;
	};
 
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
	
	/*fs.readFile('/doesnt/exist', 'utf8', function (err,data) {
	  if (err) {
		return exitMsg(err);
	  }
	  
	});*/
  }
}