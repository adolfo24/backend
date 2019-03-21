'use strict'
var Encuesta = require('../models/encuesta');
var conexion = require('../database/conexion');
/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get config file

function nueva(data, callback) {
    console.log(data);
    conexion.conectar(function (conex) {
        if (conex != null) {
            console.log(data)
            let encuesta = new Encuesta();
            encuesta.nombre = data.nombre;
            encuesta.descripcion = data.descripcion;
            encuesta.preguntas = data.preguntas;
            encuesta.save((err, store) => {
                if (err) {
                    callback({ success: false, message: "error al insertar", error:err })
                } else {
                    callback({ success: true, message: "correcto", encuesta: store })
                }
            })
        } else {
            conexion.cerrar();
            callback({ success: false, message: "error de conexion a db                  [ERROR]" });
        }
    })
}

function getEncuesta(callback) {
    conexion.conectar(function (conex) {
        if (conex != null) {
            Encuesta.find({}, function (err, user) {
                if (err) {
                    callback({ success: false, message: "Error al consultar bd          [ERROR]" });
                }
                else {
                    callback({ success: true, message: "Consulta existosa       [EXITO]", data:user });
                }
            });            
        } else {
            conexion.cerrar();
            callback({ success: false, message: "Error de conexión a db                  [ERROR]" });
        }
    })
}

module.exports = {
    nueva,
    getEncuesta
}