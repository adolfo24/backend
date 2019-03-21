var express = require('express');
var verifyToken = require("../utilities/verifyToken.js");
var logicaUsuario = require('../controllers/ctrlUser');
var router = express.Router();

/* GET home page. */
router.get('/', verifyToken.verifyTokenGet,function(req, res) {
  if(req.auth){
    res.json({"status": "access permited"});
    //res.render('index', { title: 'Express' });      
  }else{
    res.json({"status": "No acces"})
    //res.sendfile('./views/login.html');
  }
});

router.post('/', verifyToken.verifyTokenPost,function(req, res) {
  if(req.auth){
    res.json({"status": "access permited"});      
  }else{
    res.json({"status": "No acces"})
  }
});

router.post('/login', (req, res) => {
  logicaUsuario.login(req.body, (resp) => {
      res.status(200).send(resp);
  })
});

module.exports = router;
  