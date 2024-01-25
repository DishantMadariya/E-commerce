const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    isActive :{
        type : Boolean,
        required : true
    },
    currentDate :{
        type : String,
        required : true
    },
    updateDate :{
        type : String,
        required : true
    },
    role :{
        type : String,
        required : true
    }
});
const User = mongoose.model('User',UserSchema);
module.exports=User;