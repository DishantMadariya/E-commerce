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
routs.post('/login',passport.authenticate('user',{failureRedirect : '/'}),usercontroller.UserLogin);
routs.get('/logout',function(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
});
routs.get('/cart/:productid/:userid',usercontroller.addtoCart);
routs.get('/delet/:id',usercontroller.deletcart);
routs.get('/cart/:id',passport.checkUserAthuntication,usercontroller.cart);
routs.get('/google',
  passport.authenticate('google', { scope: ['profile','email']}));

routs.get('/google/callback',passport.authenticate('google', { failureRedirect: '/' }),function(req, res) {res.redirect('/')});
  routs.post('/changeQuantity', passport.checkUserAthuntication, usercontroller.changeQuantity);
  routs.get('/deletcartitem/:id',usercontroller.deletcartitem);
routs.get('/checkout',passport.checkUserAthuntication,usercontroller.checkout);
routs.post('/payment', passport.checkUserAthuntication, usercontroller.payment);
module.exports = routs;