const express = require('express')
const routs = express.Router();
const brandcontroller = require('../controller/brandcontroller');
routs.get('/addBrand',brandcontroller.addBrand);
routs.post('/insertBrandData',brandcontroller.insertBrand);
routs.get('/viewBrand',brandcontroller.viewBrand);
routs.post('/getExcate',brandcontroller.getExcate);
routs.get('/isActive/:id',brandcontroller.isActive);
routs.get('/deActive/:id',brandcontroller.deActive);
routs.get('/updateBrand/:id',brandcontroller.updateBrand);
routs.post('/editBrand',brandcontroller.editBrand);
routs.get('/deletBrand/:id',brandcontroller.deletBrand);
module.exports = routs;