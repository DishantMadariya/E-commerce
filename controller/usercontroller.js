const Cate = require('../models/Category');
const Scate = require('../models/Scate');
const Ecate = require('../models/Ecate');
const Brand = require('../models/Brand');
const Type = require('../models/Type');
const Product = require('../models/Product');
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
module.exports.cateProduct = async(req,res)=>{
    let catData = await Product.find({category : req.params.id}).populate('brandname').exec();
    let Category = await Cate.find({isActive : true});
    let Subcategory = await Scate.find({isActive : true});
    let Extracategory = await Ecate.find({isActive : true});
    let recentPost = await Product.find({}).sort({ id: -1 }).limit(3);
    var brands =[];
    catData.forEach(v => {
        let pos = brands.findIndex((v1,i1)=> v1.id==v.brandname.id);
        if(pos==-1){
            brands.push({id : v.brandname.id , name : v.brandname.brandname});
        }
    });
    return res.render('UserPanel/product',{
        cate : Category,
        subcate : Subcategory,
        ecate : Extracategory,
        productData : catData,
        brand : brands,
        recentPost : recentPost
    })
}
module.exports.filterBrand = async(req,res)=>{
    let catData = await Product.find({category : req.body.cid,subcategory:req.body.sid,extracategory:req.body.eid,brandname:req.body.id});
    let product = await Product.find({category : req.body.cid});
    return res.render('UserPanel/filter',{
        productData : catData,
        product : product
    })
}