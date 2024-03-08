const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/User');


passport.use(new GoogleStrategy({
    clientID: '263694405779-akdmn01fphdt1bairvvof6ibse8km08a.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://e-commerce-63vv.onrender.com/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    let checkemail = await User.findOne({ email: profile.emails[0].value });
    if (checkemail) {
       cb(null,checkemail);
    }
    else{
        var pass = 123;
        let userdetails ={
            name: profile.displayName,
            email: profile.emails[0].value,
            isActive : true,
            password : pass,
            currentDate : new Date().toLocaleString(),
            updateDate : new Date().toLocaleString(),
            role : 'user'
        }
        let userdatanew =await User.create(userdetails);
        if(userdatanew){
            return cb(null,userdatanew);
        }
        else{
            return cb(null,false);
        }
    }
  
  }
));


module.exports = GoogleStrategy;