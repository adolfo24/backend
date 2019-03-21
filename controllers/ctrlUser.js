'use strict'
var User = require('../models/user');
var conexion = require('../database/conexion');
/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get config file

function login(data, callback) {
    conexion.conectar(function (conex) {
        if (conex != null) {
            let usuario = data.email;
            let pass = data.password;
            console.log(usuario);
            console.log(pass);
            User.findOne({ email: usuario, password:pass}, function (err, user) {
                if (!user) {
                    callback({ success: false, message: "no usuario", token: "", data:{}});

                }
                else {
                    var tok = jwt.sign({ id: user._id }, config.SECRET, {
                        expiresIn: 900 // expires in 24 hours
                      });
                    callback({ success: true, message: "Usuario encontrado", token: tok,data:user });
                }
            });
        } else {
            conexion.cerrar();
            callback({ success: false, message: "error de conexion a db                  [ERROR]" });
        }
    })
}

function nuevo(data, callback) {
    conexion.conectar(function (conex) {
        if (conex != null) {
            console.log(data)
            let usuario = new User();
            usuario.name = data.nombre;
            usuario.email = data.email;
            usuario.password = data.password;
            usuario.save((err, store) => {
                if (err) {
                    callback({ success: false, message: "error al insertar", error:err })
                } else {
                    callback({ success: true, message: "correcto", usuario: store })
                }
            })
        } else {
            conexion.cerrar();
            callback({ success: false, message: "error de conexion a db                  [ERROR]" });
        }
    })
}

module.exports = {
    login,
    nuevo
}