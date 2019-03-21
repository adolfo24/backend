'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubPreguntasSchema= Schema({
    pregunta:{ type :String,required:true},
    tipo:{ type:Number,required:true},
    respuesta:{ type :String,default:"EMPTY"},
    justificacion:{ type :String,default:"EMPTY"},
    respJust:{ type :String,default:"EMPTY"},
    opciones:[String],
    date:{type:Date,default:Date.now},//fecha de registro de usuario
    isDelete:{type:Boolean,default:false}//BORRADO O NO
});
const PreguntasSchema= Schema({
    pregunta:{ type :String,required:true},
    tipo:{ type:Number,required:true},
    respuesta:{ type :String,default:"EMPTY"},
    respJust:{ type :String,default:"EMPTY"},
    justificacion:{ type :String,default:"EMPTY"},
    subpreguntas:[SubPreguntasSchema],
    opciones:[String],
    date:{type:Date,default:Date.now},//fecha de registro de usuario
    isDelete:{type:Boolean,default:false}//BORRADO O NO

});
const EncuestaSchema=Schema({
    nombre:{ type :String,required:true},//nombre de usuario
    descripcion:{ type :String,required:true},//email de usuario
    preguntas:[PreguntasSchema],
    date:{type:Date,default:Date.now},//fecha de registro de usuario
    isDelete:{type:Boolean,default:false}//BORRADO O NO
});

module.exports=mongoose.model('Encuesta',EncuestaSchema);