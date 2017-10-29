var Sequelize = require('sequelize');
var sequelizeConfig = require('.././database/config');
var Op = Sequelize.Op

var productDB = sequelizeConfig.define('product', {

    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },

    description: {
        type: Sequelize.STRING,
        field: 'description'
    },

    code: {
        type: Sequelize.STRING,
        field: 'code',
    },

    price: {
        type: Sequelize.DECIMAL,
        field: 'price'
    },

    quantity: {
        type: Sequelize.INTEGER,
        field: 'quantity'
    },


}, {
        freezeTableName: true,
        timestamps: false
    });

var newProduct = function (req, res, next) {

 var product = {
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    quantity: req.body.quantity
  };

    sequelizeConfig.authenticate().then(function () {

        productDB.findOne({
            where: {
                code: product.code
            }

        }).then(function (result) {
            if (!result) {

                productDB.create({

                    description: product.description,
                    code: product.code,
                    price: product.price,
                    quantity: product.quantity

                }).then(function (result) {

                    var response = {
                        status: 200,
                        message: "New product added.",
                        data: null
                    };

                    res.status(200);
                    res.send(response);
                });
            }
            else {
                var response = {
                    status: 400,
                    message: "This product already exist.",
                    data: null
                };

                res.status(400);
                res.send(response);
            }
        });
    });
};

//add and remove, for add: quantity > 0 and remove quantiry < 0 
var addProduct = function (req, res, next) {


    var product = {
        code: req.body.code,
        quantity: req.body.quantity
    };

    sequelizeConfig.authenticate().then(function () {

        productDB.findOne({
            where: {
                code: product.code
            }

        }).then(function (result) {
            if (result) {

                var newValue = parseInt(result.quantity) + parseInt(product.quantity);

                if (newValue < 0) {
                    var response = {
                        status: 400,
                        message: "The specified quantity is not available."
                        + " There are only: " + result.quantity + " for this product.",
                        data: null
                    };

                    res.status(400);
                    res.send(response);
                }
                else {
                    productDB.update(
                        {
                            quantity: newValue
                        },
                        {
                            where: {
                                id: result.id
                            }
                        }).then(function (result) {

                            var response = {
                                status: 200,
                                message: "Product quantity updated.",
                                data: null
                            };

                            res.status(200);
                            res.send(response);

                        }).catch(function (err) {

                            var response = {
                                status: 500,
                                message: "Product can't be updated.",
                                data: null
                            };

                            res.status(500);
                            res.send(response);
                        });
                }
            }
            else {
                var response = {
                    status: 400,
                    message: "Product not found. Verify code product.",
                    data: null
                };

                res.status(400);
                res.send(response);
            }
        });


    });
};

var revifyInventory = function (req, res, next) {

    var product = {
        code: req.body.code,
        quantity: req.body.quantity
    };

    sequelizeConfig.authenticate().then(function () {

        productDB.findOne({
            where: {
                code: product.code
            }

        }).then(function (result) {
            if (result) {

                var newValue = parseInt(result.quantity) + parseInt(product.quantity);

                if (newValue < 0) {
                    var response = {
                        status: 400,
                        message: "The specified quantity is not available."
                        + " There are only: " + result.quantity + " for this product.",
                        data: null
                    };

                    res.status(400);
                    res.send(response);
                }
                else {
                    var response = {
                        status: 200,
                        message: "inventory available.",
                        data: null
                    };
                    res.status(200);
                    res.send(response);
                }
            }
            else {
                var response = {
                    status: 400,
                    message: "Product not found. Verify code product.",
                    data: null
                };

                res.status(400);
                res.send(response);
            }
        });


    });
};

var getAll = function (req, res, next) {

    sequelizeConfig.authenticate().then(function () {

        productDB.findAll({

            attributes: ['code', 'description', 'price', 'quantity']

        }).then(function (result) {
            if (result) {

                var response = {
                    status: 200,
                    message: "",
                    data: result
                };

                res.status(200);
                res.send(response);
            }
            else {
                var response = {
                    status: 400,
                    message: "Products not found.",
                    data: null
                };

                res.status(400);
                res.send(response);
            }
        });

    });
};

var getByCode = function (req, res, next) {

    var code = req.query.code

    sequelizeConfig.authenticate().then(function () {

        productDB.findOne({
            where: {
                code: code
            }

        }).then(function (result) {
            if (result) {

                 var response = {
                    status: 200,
                    message: "",
                    data: result
                };

                res.status(200);
                res.send(response);
            }
            else {
                var response = {
                    status: 400,
                    message: "Product not found. Verify code product.",
                    data: null
                };

                res.status(400);
                res.send(response);
            }
        });
    });

};

module.exports = {
    newProduct: newProduct,
    addProduct: addProduct,
    revifyInventory: revifyInventory,
    getAll: getAll,
    getByCode: getByCode
};