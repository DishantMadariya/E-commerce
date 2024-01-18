const express = require('express');
const routs = express.Router();
const Product = require('../models/Product');
const productcontroller = require('../controller/productcontroller');
routs.get('/AddProduct',productcontroller.addProduct);
routs.post('/insertProductData',Product.uploadImage,productcontroller.insertProductData);
routs.get('/viewProduct',productcontroller.viewProduct);
routs.post('/getType',productcontroller.getType);
routs.get('/viewmore/:id',productcontroller.viewmore);
routs.get('/isActive/:id',productcontroller.isActive);
routs.get('/deActive/:id',productcontroller.deActive);
routs.get('/updateProduct/:id',productcontroller.updateProduct);
routs.post('/editProduct',Product.uploadImage,productcontroller.editProduct);
routs.post('/deletimg',productcontroller.deletImg);
routs.get('/editImg',productcontroller.editImg);
routs.post('/editImg',Product.uploadImage,productcontroller.updateImg);
module.exports = routs