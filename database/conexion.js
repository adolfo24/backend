'use strict';
const mongoose = require('mongoose');
var Config = require("../config");
function conectar(callback) {
	mongoose.Promise = global.Promise;
	/*mongoose.connect(Config.IP_DATABASE, function (err, resp) {
		if (err) { callback(null) } else { console.log("conectando..");callback(resp) }
	});*/
	mongoose.connect(Config.IP_DATABASE, {})
	.then((resp) =>{callback(resp);})
	.catch(err => {console.log(err);callback(null)});
	}

	function cerrar() {
		mongoose.connection.close(function (err, res) {
			//console.log("Desconectado de la base de datos");
		})
	}
	module.exports = {
		conectar,
		cerrar
	}