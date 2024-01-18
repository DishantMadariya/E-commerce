const Category = require('../models/Category');
const Subcategory = require('../models/Scate');
const Extracategory = require('../models/Ecate');
const Brand = require('../models/Brand');
module.exports.addBrand = async (req, res) => {
    let category = await Category.find({isActive : true});
    let subcategory = await Subcategory.find({isActive : true});
    let extracategory = await Extracategory.find({isActive : true});
    return res.render('addBrand', {
        cate: category,
        subcate: subcategory,
        extracate: extracategory
    })
}
module.exports.insertBrand = async (req, res) => {
    try {
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        await Brand.create(req.body);
        return res.redirect('back');
    }
    catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}
module.exports.viewBrand = async (req, res) => {
    try {
        var search = "";
        if (req.query.search) {
            search = req.query.search;
        }
        if (req.query.page) {
            page = req.query.page;
        }
        else {
            page = 0;
        }
        var perPage = 12;
        let BrandData = await Brand.find({
            isActive : true,
            $or: [
                { "brandname": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).limit(perPage).skip(perPage * page).populate(['category', 'subcategory', 'extracategory']).exec();
        let totalBranddata = await Brand.find({
            isActive : true,
            $or: [
                { "brandname": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).countDocuments();
        return res.render('viewBrand', {
            brandData: BrandData,
            searchValue: search,
            totaldocument: Math.ceil(totalBranddata / perPage),
            currentPage: page,
        })
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.isActive = async(req,res)=>{
    try {
        if (req.params.id) {
            let deactive = await Brand.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Brand.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.updateBrand = async (req,res)=>{
    try {
        let catedata = await Category.find();
        let Scate = await Subcategory.find();
        let Ecate = await Extracategory.find();
        let brand = await Brand.findById(req.params.id);
        if(brand){
            return res.render('updateBrand',{
                Brand : brand,
                cate : catedata,
                subcate : Scate,
                extracate : Ecate

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
module.exports.editBrand = async(req,res)=>{
    try {
        let oldData = await Brand.findById(req.body.EditId);
        if(oldData){
            req.body.updateDate = new Date().toLocaleString();
            let Cd = await Brand.findByIdAndUpdate(req.body.EditId, req.body);
            if(Cd){
                console.log('Extra category Data Update Succesfully');
            }
            else{
                console.log('Extra category data not updated ');
            }
        }
        else{
            console.log('Old Data not found');
        }
        return res.redirect('/admin/brand/viewBrand');
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/brand/viewBrand');
    }
}
module.exports.deletBrand = async(req,res)=>{
    try {
        let deletCate = await Brand.findByIdAndUpdate(req.params.id, { isActive: false });
        if(deletCate){
            console.log('Brand data delet succesfully');
        }
        else{
            console.log('Brand not deleted');
        }
        return res.redirect('/admin/brand/viewBrand');    
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/brand/viewBrand');    
    }
}
module.exports.getExcate = async (req, res) => {
    var ExData = await Extracategory.find({ subcategory: req.body.subId });
    var options = `<option value="">--Select--</option>`;
    ExData.map((v, i) => {
        options += `<option value='${v.id}'>${v.ecateName}</option>`;
    });
    return res.json(options);
}