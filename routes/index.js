var express = require('express');
var router = express.Router();


var productController = require('../controllers/product');


router.post('/newProduct', productController.newProduct);
router.post('/addProduct', productController.addProduct);
router.post('/verifyInventory', productController.revifyInventory);
router.get('/getAll', productController.getAll);
router.get('/getByCode', productController.getByCode);


module.exports = router;

