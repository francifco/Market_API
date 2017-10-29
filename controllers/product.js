var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelizeConfig = require('.././database/config');
var productRepository = require('../repository/product');

var newProduct = function (req, res, next){
  productRepository.newProduct(req, res, next);
};

var addProduct = function (req, res, next){
  productRepository.addProduct(req, res, next);
};

var revifyInventory = function (req, res, next){
  productRepository.revifyInventory(req, res, next);
};

var getAll = function (req, res, next){
  productRepository.getAll(req, res, next);
};

var getByCode = function (req, res, next){
  productRepository.getByCode(req, res, next);
};

module.exports = {
  newProduct: newProduct,
  addProduct: addProduct,
  revifyInventory: revifyInventory,
  getAll: getAll,
  getByCode: getByCode
}