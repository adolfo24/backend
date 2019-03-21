var express = require('express');
var verifyToken = require("../utilities/verifyToken.js");
var logicaEncuesta = require('../controllers/ctrlEncuesta');
var router = express.Router();

/* GET home page. */

router.post('/encuesta', verifyToken.verifyTokenPost,function(req, res) {
//router.post('/encuesta',function(req, res) {
  if(req.auth){
    logicaEncuesta.nueva(req.body,(resp)=>{
      res.status(200).send(resp);
    });          
  }else{
    res.json({"success":"false","status": "No acces"})
  }
});
router.post('/encuesta/list',verifyToken.verifyTokenPost,function(req, res) {
  if(req.auth){
    logicaEncuesta.getEncuesta((resp)=>{
      res.status(200).send(resp);
    });          
  }else{
    res.json({"success":"false","status": "No acces"})
  }
});


module.exports = router;
  