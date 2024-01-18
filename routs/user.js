const express = require('express');
const routs = express.Router();
const usercontroller = require('../controller/usercontroller');
routs.get('/',usercontroller.home);
routs.get('/catproduct/:id',usercontroller.cateProduct);
routs.post('/filterBrand',usercontroller.filterBrand);
module.exports = routs;