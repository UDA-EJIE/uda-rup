exports.selectSimple = {};
exports.selectEnlazadoSimple = {};
exports.comboEnlazadoMultiple = {};
exports.autocomplete = {};

exports.selectSimple.remote = function(req, res) {
  var json = require('./json/selectSimple.remote.json');
  res.status(200).json(json);
};

exports.selectSimple.remoteDos = function(req, res) {
  var json = require('./json/selectSimple.remoteDos.json');
  res.status(200).json(json);
};

exports.selectSimple.remoteGroup = function(req, res) {
  var json = require('./json/selectSimple.remoteGroup.json');
  res.status(200).json(json);
};

exports.selectSimple.remoteGroupEnlazado = function(req, res) {
  var retArray = [],
      jsonProvincias = require('./json/selectEnlazadoSimple.remoteEnlazadoProvincia.json'),
      jsonComarcas = require('./json/selectEnlazadoSimple.remoteEnlazadoComarca.json'),
      jsonLocalidades = require('./json/selectEnlazadoSimple.remoteEnlazadoLocalidad.json'),
      localidadAux = [],
      comarcasProvincia= [],
      localidadesProvincia = [];

  if (req.query.provincia===undefined){
    retArray.push({"Provincia": jsonProvincias});
    for(var i=0;i<jsonProvincias.length;i++){
      comarcasProvincia = comarcasProvincia.concat(jsonComarcas[jsonProvincias[i].value]);
    }

  }else{
    comarcasProvincia = jsonComarcas[req.query.provincia+""];
  }



  retArray.push({"Comarca": comarcasProvincia});

  for (var j=0;j<comarcasProvincia.length;j++){
    localidadesProvincia = localidadesProvincia.concat(jsonLocalidades[comarcasProvincia[j].value]);
  }

  retArray.push({"Localidad": localidadesProvincia});

  res.status(200).json(retArray);
};

exports.selectEnlazadoSimple.remoteEnlazadoProvincia = function(req, res) {
  var json = require('./json/selectEnlazadoSimple.remoteEnlazadoProvincia.json');

  res.status(200).json(json);
};

exports.selectEnlazadoSimple.remoteEnlazadoComarca = function(req, res) {
  var json = require('./json/selectEnlazadoSimple.remoteEnlazadoComarca.json');
  res.status(200).json(json[req.query.provincia+""]);
};

exports.selectEnlazadoSimple.remoteEnlazadoLocalidad = function(req, res) {
  var json = require('./json/selectEnlazadoSimple.remoteEnlazadoLocalidad.json');
  res.status(200).json(json[req.query.comarca+""]);
};

exports.comboEnlazadoMultiple.departamentoRemote = function(req, res) {
  var json = require('./json/comboEnlazadoMultiple.departamentoRemote');
  res.status(200).json(json);
};

exports.comboEnlazadoMultiple.provinciaRemote = function(req, res) {
  var json = require('./json/selectEnlazadoSimple.remoteEnlazadoProvincia.json');
  res.status(200).json(json);
};

exports.comboEnlazadoMultiple.dptoProvRemote = function(req, res) {
  var json = require('./json/comboEnlazadoMultiple.dptoProvRemote.json'),
      idProvincia = req.query.provincia,
      idDepartamento = req.query.departamento,
      retArray=[];

  for (var i=0;i<json.length;i++){
    if (json[i].idDepartamento===idDepartamento && json[i].idProvincia === idProvincia){
      retArray.push(json[i]);
    }
  }

  res.status(200).json(retArray);
};

exports.autocomplete.remote = function(req, res) {
	var retArray = [];
	var q = req.query.q;
	var c = req.query.c; //contains
    var json = [
        {'id':1,'text':'Ayuntamiento de Álava'},
        {'id':2,'text':'Ayuntamiento de Vizcaya'},
        {'id':3,'text':'Ayuntamiento de Gipuzcoa'},
        {'id':4,'text':'Diputación de Álava'},
        {'id':5,'text':'Diputación de Vizcaya'},
        {'id':6,'text':'Diputación de Gipuzcoa'},
        {'id':7,'text':'Policia de Álava'},
        {'id':8,'text':'Policia de Vizcaya'},
        {'id':9,'text':'Policia de Gipuzcoa'},
        {'id':10,'text':'Bomberos de Álava'},
        {'id':11,'text':'Bomberos de Vizcaya'},
        {'id':12,'text':'Bomberos de Gipuzcoa'}
    ];
    
    if (q !== undefined){
    	for (var i=0;i<json.length;i++){
    		if(c === 'false'){
	    	    if (json[i].text.toUpperCase().indexOf(q.toUpperCase()) == 0){
		    	      retArray.push(json[i]);
		    	    }
    		}else{
	    	    if (json[i].text.toUpperCase().indexOf(q.toUpperCase()) >= 0){
	    	      retArray.push(json[i]);
	    	    }
    		}
    	}    	
    }else{
    	retArray = json;
    }

    res.status(200).json(retArray);
};