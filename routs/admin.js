const express = require('express');
const routs = express.Router();
const adminController = require('../controller/admincontroller')
const Admin = require('../models/Admin');
const passport = require('passport');
routs.get('/', (req,res)=>{
    return res.render('login')
});
routs.post('/logincheck',passport.authenticate('local',{failureRedirect : '/admin/'}),passport.checkAthuntication,adminController.loginCheck);
routs.get('/dashboard', (req,res)=>{
    return res.render('dashboard')
});
routs.get('/addAdmin',passport.checkAthuntication,adminController.addAdmin);
routs.post('/insertAdminData',passport.checkAthuntication,Admin.uploadImage,adminController.insertAdmin);
routs.get('/viewAdmin',passport.checkAthuntication,adminController.viewAdmin);
routs.get('/isActive/:id',passport.checkAthuntication,adminController.isActive);
routs.get('/deActive/:id',passport.checkAthuntication,adminController.deActive);
routs.get('/updateAdmin/:id',passport.checkAthuntication,adminController.updateAdmin);
routs.post('/editAdminData',passport.checkAthuntication,Admin.uploadImage,adminController.editAdmin);
routs.get('/deletAdmin/:id',passport.checkAthuntication,adminController.deletAdmin);
routs.get('/logout',passport.checkAthuntication,(req,res)=>{
    if(req.user == undefined){
            return res.redirect('/admin/');
    }
    return res.redirect('/admin/')
})
routs.get('/checkMail', passport.checkAthuntication,async(req,res)=>{
    return res.render('ForgotePassword/checkMail');
})
routs.post('/sendMail',passport.checkAthuntication,adminController.sendMail);
routs.get('/verifyOtp',passport.checkAthuntication,(req,res)=>{
    return res.render('ForgotePassword/verifyOtp');
})
routs.post('/setNewPass',passport.checkAthuntication,adminController.setNewPassword)
routs.post('/verifyPass',passport.checkAthuntication,adminController.verifyPass);
routs.get('/profile',passport.checkAthuntication,(req,res)=>{
    if(req.user == undefined){
        return res.redirect('/admin/');
    }
    return res.render('Profile');
});
routs.get('/editProfile/:id',passport.checkAthuntication,adminController.updateProfile);
routs.post('/editProfileData',passport.checkAthuntication,Admin.uploadImage,adminController.editProfile);
routs.get('/changePassword',passport.checkAthuntication,adminController.changePassword);
routs.post('/modifyPassword',passport.checkAthuntication,adminController.modifyPassword);
routs.use('/category',passport.checkAthuntication,require('./category'));
routs.use('/scate',passport.checkAthuntication,require('./scate'));
routs.use('/ecate',passport.checkAthuntication,require('./ecate'));
routs.use('/brand',passport.checkAthuntication,require('./brand'));
routs.use('/type',passport.checkAthuntication,require('./type'));
routs.use('/product',passport.checkAthuntication,require('./product'));
module.exports = routs;