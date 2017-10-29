var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelizeConfig = require('.././database/config');

var addProduct = function (req, res, next){
    
    var product = {
      description  : req.body.description,
      code  : req.body.code,
      price : req.body.price
     
    };

    res.status(200);
    res.send(product);
    
      
  
  };

module.exports = {
  addProduct: addProduct
}