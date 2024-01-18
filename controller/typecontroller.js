const Cate = require('../models/Category');
const SubCate = require('../models/Scate');
const ExtraCate = require('../models/Ecate');
const Brand = require('../models/Brand');
const Type = require('../models/Type');
module.exports.addType = async(req,res)=>{
    let Category = await Cate.find({isActive : true});
    let Subcate = await SubCate.find({isActive : true});
    let Extracate = await ExtraCate.find({isActive : true});
    let BrandData = await Brand.find({isActive : true});
    return res.render('addType',{
        cate : Category,
        subcate : Subcate,
        extracate : Extracate,
        brand : BrandData
    })
}
module.exports.insertType = async(req,res)=>{
    try {
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        await Type.create(req.body);
        return res.redirect('back');
    }
    catch (error) {
        console.log(error);
        return res.redirect('back')    
    }
}
module.exports.viewType = async(req,res)=>{
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
        let TypeData = await Type.find({
            isActive : true,
            $or: [
                { "typeName": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).limit(perPage).skip(perPage * page).populate(['category', 'subcategory','extracategory','brandname']).exec();
        let totalTypedata = await Type.find({
            isActive : true,
            $or: [
                { "typeName": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).countDocuments();
        return res.render('viewType', {
            typeData: TypeData,
            searchValue: search,
            totaldocument: Math.ceil(totalTypedata / perPage),
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
            let deactive = await Type.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Type.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.updateType = async(req,res)=>{
    try {
        let catedata = await Cate.find();
        let Scate = await SubCate.find();
        let Ecate = await ExtraCate.find();
        let brand = await Brand.find();
        let type = await Type.findById(req.params.id);
        if(type){
            return res.render('updateType',{
                cate : catedata,
                subcate : Scate,
                extracate : Ecate,
                brand : brand,
                typedata : type
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
module.exports.editType = async(req,res)=>{
    try {
        let oldData = await Type.findById(req.body.EditId);
        if(oldData){
            req.body.updateDate = new Date().toLocaleString();
            let Cd = await Type.findByIdAndUpdate(req.body.EditId, req.body);
            if(Cd){
                console.log('Type data Update Succesfully');
            }
            else{
                console.log('Type data not updated ');
            }
        }
        else{
            console.log('Old Data not found');
        }
        return res.redirect('/admin/type/viewType');
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/type/viewType');
    }
}
module.exports.deletType = async(req,res)=>{
    try {
        let deletCate = await Type.findByIdAndUpdate(req.params.id, { isActive: false });
        if(deletCate){
            console.log('Type data delet succesfully');
        }
        else{
            console.log('Type not deleted');
        }
        return res.redirect('/admin/type/viewType');    
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/type/viewType');    
    }
}
module.exports.getBrand = async(req,res)=>{
    var BrandData = await Brand.find({extracategory : req.body.exId});
    var options = `<option value="">--Select--</option>`;
    BrandData.map((v,i)=>{
        options+=`<option value='${v.id}'>${v.brandname}</option>`;
    });
    return res.json(options);
}