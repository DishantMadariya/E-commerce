const express = require('express');
const routs = express.Router();
const typecontroller = require('../controller/typecontroller');
routs.get('/AddType',typecontroller.addType);
routs.post('/insertTypeData',typecontroller.insertType);
routs.get('/viewType',typecontroller.viewType);
routs.post('/getBrand',typecontroller.getBrand);
routs.get('/isActive/:id',typecontroller.isActive);
routs.get('/deActive/:id',typecontroller.deActive);
routs.get('/updateType/:id',typecontroller.updateType);
routs.post('/editType',typecontroller.editType);
routs.get('/deletType/:id',typecontroller.deletType);
module.exports = routs