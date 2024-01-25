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
    return res.render('UserPanel/singleproduct',{
        cate : Category,
        subcate : Subcategory,
        ecate : Extracategory,
        details : singleproduct
    })
}