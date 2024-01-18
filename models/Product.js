const mongoose = require('mongoose');
const multer = require('multer');
const imgPath = "/uploads/productImages";
const multiimagePath = '/uploads/productMultiImage';
const path = require('path');
const ProductSchema = mongoose.Schema({
    category :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required : true
    },
    subcategory :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Scategory',
        required : true
    },
    extracategory :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Ecategory',
        required : true
    },
    brandname :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Brand',
        required : true
    },
    typename : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Type',
        required :true
    },
    price : {
        type : String,
        required :true
    },
    title : {
        type : String,
        required :true
    },
    oldprice : {
        type : String,
        required :true
    },
    color : {
        type : Array,
        required :true
    },
    size : {
        type : String,
    },
    description: {
        type : String,
        required : true
    },
    productImage: {
        type : String,
        required : true
    },
    multiImage: {
        type : Array,
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
    }
});
const imgStorage = multer.diskStorage({
    destination : function (req,file,cb){
        if(file.fieldname == 'productImage'){
            cb(null,path.join(__dirname,'..',imgPath));
        }
        else{
            cb(null,path.join(__dirname,'..',multiimagePath));
        }
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Math.random()*1000000);
    }
});
ProductSchema.statics.uploadImage = multer({storage : imgStorage}).fields([{name :'productImage',maxCount :1},{name : 'multiImage', maxCount :5}]);
ProductSchema.statics.imgModel = imgPath;
ProductSchema.statics.multiimgModel = multiimagePath;
const Product = mongoose.model('Product',ProductSchema);
module.exports=Product;