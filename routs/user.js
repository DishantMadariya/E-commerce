const express = require('express');
const routs = express.Router();
const usercontroller = require('../controller/usercontroller');
const passport = require('passport')
routs.get('/',usercontroller.home);
routs.post('/filterBrand',usercontroller.filterBrand);
routs.get('/product/:cid/:sid/:eid',usercontroller.findData);
routs.get('/gotocart/:id',usercontroller.gotocart);
routs.get('/userlogin',usercontroller.userlogin);
routs.post('/register',usercontroller.userRegister);
routs.post('/login',passport.authenticate('user',{failureRedirect : '/'}),passport.checkAthuntication,usercontroller.UserLogin);
module.exports = routs;