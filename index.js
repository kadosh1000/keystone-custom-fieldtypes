/**
 */
 
var fs = require('fs-extra'),
	path = require('path'),
	keystonePath = 'node_modules'+path.sep+'keystone',
	keystoneTypesDirPath = path.join(keystonePath,'fields'+path.sep+'types'),
	keystoneLibFieldTypesFile = path.join(keystonePath,'lib'+path.sep+'fieldTypes.js'),
	keystoneAdminFieldsFile = path.join(keystonePath,'admin'+path.sep+'src'+path.sep+'fields.js');

function copyTypesLibs(dirPath){
	var typesDirs = fs.readdirSync(dirPath).filter(function(file) {
		return fs.statSync(path.join(dirPath, file)).isDirectory();
	});
	
	typesDirs.forEach(function(dir){
		var keystonePath = path.join(keystoneTypesDirPath, dir);
		
		try{
			stats = fs.statSync(keystonePath);
			fs.removeSync(keystonePath)
		}catch(err){}
	
		fs.copySync(path.join(dirPath, dir), path.join(keystoneTypesDirPath, dir));
	});
}

function GetAvailableTypes(){
	return fs.readdirSync(keystoneTypesDirPath).filter(function(file) {
		return fs.statSync(path.join(keystoneTypesDirPath, file)).isDirectory();
	}).map(function(type){
		var typeDirPath = path.join(keystoneTypesDirPath,type),
			name = fs.readdirSync(path.join(typeDirPath)).filter(function(file) {
				return fs.statSync(path.join(typeDirPath, file)).isFile();
			})[0];

		return name ? {
			Dir : type,
			FullNameType : name.replace('Type','').replace('Field','').replace('.js','')
		} : null;
	});
}

function WriteLibFile(Types){
	var fileText = 'var fields = { \n';

	Types.forEach(function(type,index){
		if (type){
			fileText += '\t get '+type.FullNameType+' () { return require(\'../fields/types/'+type.Dir+'/'+type.FullNameType+'Type\'); }';
			fileText += (index!= Types.length-1) ? ', \n' : '\n';
		}
	})

	fileText += '};\nmodule.exports = fields;'

	fs.writeFileSync(keystoneLibFieldTypesFile, fileText, 'utf8');

	console.log('written!');
}

function WriteAdminFile(Types){
	var fileText = 'module.exports = {\n';

	Types.forEach(function(type,index){
		if (type){
			fileText += '\t'+type.Dir+':\trequire(\'../../fields/types/'+type.Dir+'/'+type.FullNameType+'Field\')';
			fileText += (index!= Types.length-1) ? ', \n' : '\n';
		}
	})

	fileText += '};'

	fs.writeFileSync(keystoneAdminFieldsFile, fileText, 'utf8');

	console.log('written 2!');
}
 
module.exports = {
  loadFromDir: function(dirPath) {
    
    dirPath = dirPath || 'fieldTypes';
    
	var stats = fs.statSync(dirPath);
	if (!stats.isDirectory())
		throw 'Path is not a directory';
	
	copyTypesLibs(dirPath);

	var availableTypes = GetAvailableTypes()

	WriteLibFile(availableTypes);
	WriteAdminFile(availableTypes);
  }
}