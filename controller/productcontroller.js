const Cate = require('../models/Category');
const SubCate = require('../models/Scate');
const ExtraCate = require('../models/Ecate');
const Brand = require('../models/Brand');
const Type = require('../models/Type');
const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');
module.exports.addProduct = async(req,res)=>{
    let Category = await Cate.find({isActive : true});
    let Subcate = await SubCate.find({isActive : true});
    let Extracate = await ExtraCate.find({isActive : true});
    let BrandData = await Brand.find({isActive : true});
    let TypeData = await Type.find({isActive : true});
    return res.render('addProduct',{
        cate : Category,
        subcate : Subcate,
        extracate : Extracate,
        brand : BrandData,
        type : TypeData
    })
}
// add product
module.exports.insertProductData = async(req,res)=>{
    try {
        productImagePath = '';
        productMultiImagePath = [];
        if (req.files) {
            productImagePath = Product.imgModel + '/' + req.files.productImage[0].filename;
            for(var i=0; i<req.files.multiImage.length; i++){
                productMultiImagePath.push(Product.multiimgModel+'/'+req.files.multiImage[i].filename);
            }
            if (productImagePath) {
                req.body.productImage = productImagePath;
                req.body.multiImage = productMultiImagePath;
            }
            else {
                console.log("Path Not Found");
            }
        }
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        await Product.create(req.body);
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
// viewProduct
module.exports.viewProduct = async(req,res)=>{
    try{
        var search ="";
        if(req.query.search){
            search = req.query.search;
        }
        if(req.query.page){
            page = req.query.page;
        }
        else{
            page = 0;
        }
        var perPage = 4;

        let ProductData = await Product.find({
            isActive : true,
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).limit(perPage).skip(perPage*page).populate(['category', 'subcategory','extracategory','brandname','typename']).exec();
        let totalProductData = await Product.find({
            isActive : true,
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).countDocuments();
        return res.render('viewProduct',{
            productData : ProductData,
            searchValue : search,
            totaldocument : Math.ceil(totalProductData/perPage),
            currentPage : page
        })
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.isActive = async(req,res)=>{
    try {
        if (req.params.id) {
            let deactive = await Product.findByIdAndUpdate(req.params.id, { isActive: false });
            if (deactive) {
                console.log("Data Deactive Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
        else {
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.deActive = async(req,res)=>{
    try {
        if (req.params.id) {
            let active = await Product.findByIdAndUpdate(req.params.id, { isActive: true });
            if (active) {
                console.log("Data Isactive Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
        else {
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
// edit Product 
module.exports.updateProduct = async(req,res)=>{
    try {
        let catedata = await Cate.find();
        let Scate = await SubCate.find();
        let Ecate = await ExtraCate.find();
        let brand = await Brand.find();
        let type = await Type.find();
        let product = await Product.findById(req.params.id);
        if(type){
            return res.render('updateProduct',{
                cate : catedata,
                subcate : Scate,
                extracate : Ecate,
                brand : brand,
                type : type,
                PrOduct : product
            })
        }
        else{
            console.log('Brand not found');
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
module.exports.editProduct = async(req,res)=>{
    try {
        if (req.files.productImage) {
            let oldData = await Product.findById(req.body.EditId);
            if (oldData) {
                if (oldData.productImage) {
                    let fullPath = path.join(__dirname,'..',oldData.productImage);
                   await fs.unlinkSync(fullPath);
                }
                if(req.files.multiImage){
                    let multipleimg = [];
                    let oldpro = await Product.findById(req.body.EditId);
                     for(var j=0;j<oldpro.multiImage.length;j++){
                         var fullPath1 = path.join(__dirname,'..',oldData.multiImage[j]);
                         await fs.unlinkSync(fullPath1);
                     }
                    for(var i=0;i<req.files.multiImage.length;i++){
                        multipleimg.push(Product.multiimgModel+"/"+req.files.multiImage[i].filename); 
                    }
                    req.body.multiImage = multipleimg;
                }
                var productImagePath = Product.imgModel+'/'+req.files.productImage[0].filename;
                req.body.productImage = productImagePath;
               
                req.body.updateDate = new Date().toLocaleString();
                let ad = await Product.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/product/viewProduct');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/product/viewProduct');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/product/viewProduct');
            }
        }
        else {
            let oldData = await Product.findById(req.body.EditId);
            if (oldData) {
                if(req.files.multiImage){
                    let multipleimg = [];
                    let oldpro = await Product.findById(req.body.EditId);
                     for(var j=0;j<oldpro.multiImage.length;j++){
                        multipleimg.push(oldpro.multiImage[j]); 
                        var fullPath = path.join(__dirname,'..',oldData.multiImage[j]);
                        await fs.unlinkSync(fullPath);
                     }
                    for(var i=0;i<req.files.multiImage.length;i++){
                        multipleimg.push(Product.multiimgModel+"/"+req.files.multiImage[i].filename); 
                    }
                    req.body.multiImage = multipleimg;
                }
                req.body.productImage = oldData.productImage;
                
                req.body.updateDate = new Date().toLocaleString();
                let ad = await Product.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/product/viewProduct');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/product/viewProduct');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/product/viewProduct');
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/product/viewProduct');
    }
}
// type data 
module.exports.getType = async(req,res)=>{
    var TypeData = await Type.find({ brandname: req.body.brId });
    var options = `<option value="">--Select--</option>`;
    TypeData.map((v, i) => {
        options += `<option value='${v.id}'>${v.typeName}</option>`;
    });
    return res.json(options);
}
module.exports.viewmore = async(req,res)=>{
    let ProductData = await Product.findById(req.params.id).populate(['category', 'subcategory','extracategory','brandname','typename']).exec();
    return res.render('viewMore',{
        product : ProductData
    })
}

module.exports.deletImg = async(req,res)=>{

    var product = await Product.findById(req.body.id);
    var imgdelet = product.multiImage.splice(req.body.i,1);
    var fullPath = path.join(__dirname,'..',req.body.img);
    await fs.unlinkSync(fullPath);
    var det = await Product.findByIdAndUpdate(req.body.id,product);
    if(det){
        console.log('image delet succesfully');
        return res.status(200).json({status :1});
    }
    else{
        console.log('img not deleted');
        return res.status(200).json({status :0});
    }
}
// end
// edit single img of multiple img
module.exports.editImg = async(req,res)=>{
    var id = req.query.id;
    var i = req.query.i;
    var img = req.query.img;

    return res.render('uploadimg', {
        id:id,
        i:i,
        img:img
    })
}
module.exports.updateImg = async(req,res)=>{
    try {
        // console.log(req.body.img);
        var id = req.body.id;
        var  productsdata = await Product.findById(req.body.id);
        var newimgpath =''
        if(productsdata){
            newimgpath = Product.multiimgModel+"/"+req.files.multiImage[0].filename;
            var de = productsdata.multiImage.splice(req.body.i,1,newimgpath);
            var fullPath =  path.join(__dirname,'..',req.body.img);
            await fs.unlinkSync(fullPath);
            var datas = await Product.findByIdAndUpdate(req.body.id,productsdata);
            if(datas) {
               console.log("image Updated Successfully");
               return res.redirect(`/admin/product/viewmore/${id}`);
             }
             else {
               console.log("Record Not Updated Successfully");
               return res.redirect('/admin/product/viewmore/id');
             }
        }
        else{
            console.log('Product Not Found');
            return res.redirect('/admin/product/viewmore/id')
        }
      }
      catch (err) {
          console.log(err);
          return res.redirect('back');
      }
}
// end