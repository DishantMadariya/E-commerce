const express = require('express');
const routs = express.Router();
const usercontroller = require('../controller/usercontroller');
routs.get('/',usercontroller.home);
routs.post('/filterBrand',usercontroller.filterBrand);
routs.get('/product/:cid/:sid/:eid',usercontroller.findData);
routs.get('/gotocart/:id',usercontroller.gotocart);
module.exports = routs;