const Cate = require('../models/Category');
const Scate = require('../models/Scate');
const Ecate = require('../models/Ecate');
const Brand = require('../models/Brand');
const Type = require('../models/Type');
const Product = require('../models/Product');
const User = require('../models/User')
module.exports.home = async(req,res)=>{
    let Category = await Cate.find({isActive : true});
    let Subcategory = await Scate.find({isActive : true});
    let Extracategory = await Ecate.find({isActive : true});
    let product = await Product.find({isActive : true});
    return res.render('UserPanel/home',{
        cate : Category,
        subcate : Subcategory,
        ecate : Extracategory,
        productData : product
    });
}
module.exports.filterBrand = async(req,res)=>{
    let catData = await Product.find({category : req.body.cid,subcategory:req.body.sid,extracategory:req.body.eid,brandname:req.body.id});
    let product = await Product.find({category : req.body.cid});
    catData
    return res.render('UserPanel/filter',{
        productData : catData,
        product : product
    })
}
module.exports.findData = async(req,res)=>{
    let product = await Product.find({category : req.params.cid,subcategory:req.params.sid,extracategory:req.params.eid}).populate('brandname').exec();
    let Category = await Cate.find({isActive : true});
    let Subcategory = await Scate.find({isActive : true});
    let Extracategory = await Ecate.find({isActive : true});
    let recentPost = await Product.find({}).sort({ id: -1 }).limit(3);
    var brands =[];
    product.forEach(v => {
        let pos = brands.findIndex((v1,i1)=> v1.id==v.brandname.id);
        if(pos==-1){
            brands.push({id : v.brandname.id , name : v.brandname.brandname});
        }
    });
    var max = 0;
    product.map((v,i)=>{
        if(parseInt(v.price)>max){
            max = parseInt(v.price);
        }
    })
    min = max;

    product.map((v,i)=>{
        if(parseInt(v.price)<min){
            min = parseInt(v.price);
        }
    })
    return res.render('UserPanel/product',{
        productData : product,
        cate : Category,
        subcate : Subcategory,
        ecate : Extracategory,
        brand : brands,
        recentPost : recentPost,
        cid : req.params.cid,
        sid : req.params.sid,
        eid : req.params.eid,
        min:min,
        max:max,
    });
}
module.exports.gotocart = async(req,res)=>{
    let singleproduct = await Product.findById(req.params.id);
    let Category = await Cate.find({isActive : true});
    let Subcategory = await Scate.find({isActive : true});
    let Extracategory = await Ecate.find({isActive : true});
    let recentPost = await Product.find({}).sort({ id: -1 }).limit(6);
    return res.render('UserPanel/singleproduct',{
        cate : Category,
        subcate : Subcategory,
        ecate : Extracategory,
        details : singleproduct,
        recentProduct : recentPost
    })
}
module.exports.userlogin = async(req,res)=>{
    let Category = await Cate.find({isActive : true});
    let Subcategory = await Scate.find({isActive : true});
    let Extracategory = await Ecate.find({isActive : true});
    return res.render('UserPanel/userLogin',{
        cate : Category,
        subcate : Subcategory,
        ecate : Extracategory,
    });
}
module.exports.userRegister = async(req,res)=>{
    try {
        let Checkmail = await User.findOne({email : req.body.email});
        if(Checkmail){
            console.log('Email ALready Exist');
            return res.redirect('back');
        }
        else{
            if(req.body.password == req.body.cpassword){
                req.body.isActive = true;
                req.body.currentDate = new Date().toLocaleString();
                req.body.updateDate = new Date().toLocaleString();
                req.body.role = 'user';
                let createuser = await User.create(req.body)
                if(createuser){
                    console.log('Register Succesfully');
                    return res.redirect('back');
                }
                else{
                    console.log('Something Wrong');
                    return res.redirect('back');
                }
            }
            else{
                console.log('Password & confirm Password are not match');
                return res.redirect('back');
            }
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.UserLogin = async(req,res)=>{
    console.log('login Succesfully');
    return res.redirect('/');
}