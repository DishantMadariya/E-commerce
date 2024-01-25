const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const Admin = require('../models/Admin');
const User = require('../models/User')
passport.use(new passportLocal({
    usernameField : 'email'
},async (email,password,done)=>{
    let adminData = await Admin.findOne({email : email});
    if(adminData){
        if(password==adminData.password){
            return done(null,adminData);
        }
        else{
            return done(null,false);
        }
    }
    else{
        return done(null,false);
    }
}));
passport.use('user',new passportLocal({
    usernameField : 'email'
}, async function(email,password,done){
    let userdata = await User.findOne({email : email});
    console.log(userdata.password);
    console.log(password);
    if(userdata){
        if(userdata.password == password){
            console.log('pass='+userdata);
            return done(null,userdata)
        }
        else{
            return done(null,false)
        }
    }
    else{
        return done(null,false);
    }
}));
passport.serializeUser(function(userdata,done){
    return done(null,userdata.id);
})
passport.serializeUser( async (adminData,done)=>{
    return done(null,adminData.id);
});
passport.deserializeUser(async(id,done)=>{
    let adminRecord = await Admin.findById(id);
    let userdata = await User.findById(id);
    if(adminRecord){
        return done (null,adminRecord);
    }
    else if(userdata.role =='user'){
        return done(null,userdata)
    }
    else{
        return done(null,false);
    }
});
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    else{
        res.locals.userdata = req.user;
    }
    return next();
}
passport.checkAthuntication = function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role =='admin'){
            next();
        }
        else if(req.user.role == 'user'){
            return res.redirect('/');
        }
    }
    else{
        return res.redirect('/admin/');
    }
}
module.exports = passport