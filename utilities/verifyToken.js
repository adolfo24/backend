var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file

function verifyTokenGet(req, res, next) {
  // check header or url parameters or post parameters for token
  req.auth= true;
  var token = req.query.token;
  console.log(token);

  if (!token){
    req.auth= false;
    next();
    //return res.status(500).send({ success: false,auth: false, message: 'Failed to authenticate token.' });
  }else{
    jwt.verify(token, config.SECRET, function(err, decoded) {      
      if (err){
        req.auth= false;
        //return res.status(500).send({ success: false,auth: false, message: 'Failed to authenticate token.' });    
      } 
      if(req.auth){
        req.userId = decoded.id;
      }
      next();
    });

  } 


}

function verifyTokenPost(req, res, next) {
  // check header or url parameters or post parameters for token
  req.auth= true;
  var token = req.body.token;
  if (!token){
    req.auth= false;
    next();
    //return res.status(500).send({ success: false,auth: false, message: 'Failed to authenticate token.' });
  }else{
    jwt.verify(token, config.SECRET, function(err, decoded) {      
      if (err){
        req.auth= false;  
      } 
      if(req.auth){
        req.userId = decoded.id;
      }
      next();
    });
  } 
}
module.exports = {
  verifyTokenGet,
  verifyTokenPost
};