const express = require('express');
const routs = express.Router();
const categoryController = require('../controller/categorycontroller');

routs.get('/addCategory', (req,res)=>{
    return res.render('addCategory');
});
routs.get('/viewCategory',categoryController.viewCate);
routs.post('/insertCategoryData',categoryController.insertCateData);
routs.get('/isActive/:id',categoryController.isActive);
routs.get('/deActive/:id',categoryController.deActive);
routs.get('/updateCate/:id',categoryController.updateCate);
routs.post('/editCategory',categoryController.editCate);
routs.get('/deletCate/:id',categoryController.deletCate);
module.exports = routs