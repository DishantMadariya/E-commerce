const Category = require('../models/Category');
const Scate = require('../models/Scate');
const Ecate = require('../models/Ecate');
module.exports.addEcate = async (req, res) => {
    let cateRecord = await Category.find({isActive : true});
    let scateRecord = await Scate.find({isActive : true});
    return res.render('addEcate', {
        cateData: cateRecord,
        scateData: scateRecord
    });
}
module.exports.insertEcate = async (req, res) => {
    try {
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        await Ecate.create(req.body);
        return res.redirect('back');
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.viewEcate = async (req, res) => {
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
        let EcateData = await Ecate.find({
            isActive : true,
            $or: [
                { "ecateName": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).limit(perPage).skip(perPage * page).populate(['category', 'subcategory']).exec();
        let totalEcatedata = await Ecate.find({
            isActive : true,
            $or: [
                { "ecateName": { $regex: ".*" + search + ".*", $options: "i" } },
            ]
        }).countDocuments();
        return res.render('viewEcate', {
            ecateData: EcateData,
            searchValue: search,
            totaldocument: Math.ceil(totalEcatedata / perPage),
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
            let deactive = await Ecate.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Ecate.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.getSubCate = async (req, res) => {
    let SubData = await Scate.find({ category: req.body.categoryId });
    var options = `<option value="">--Select--</option>`;
    SubData.map((v, i) => {
        options += `<option value='${v.id}'>${v.scateName}</option>`;
    });
    return res.json(options);
}
module.exports.updateEcate = async(req,res)=>{
    try {
        let ecateData = await Ecate.findById(req.params.id);
        let catedata = await Category.find({isActive : true});
        let scatedata = await Scate.find({isActive : true});
        if(ecateData){
            return res.render('updateEcate',{
                cateData : catedata,
                scateData : scatedata,
                ecateData : ecateData
            })
        }
        else{
            console.log('Something Wrong');
        }
        return res.redirect('/admin/ecate/viewEcate');
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/ecate/viewEcate');
    }
}
module.exports.editEcate = async(req,res)=>{
    try {
        let oldData = await Ecate.findById(req.body.EditId);
        if(oldData){
            req.body.updateDate = new Date().toLocaleString();
            let Cd = await Ecate.findByIdAndUpdate(req.body.EditId, req.body);
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
        return res.redirect('/admin/ecate/viewEcate');
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/ecate/viewEcate');
    }
}
module.exports.deletEcate = async(req,res)=>{
    try {
        let deletCate = await Ecate.findByIdAndUpdate(req.params.id, { isActive: false });
        if(deletCate){
            console.log('Extra category data delet succesfully');
        }
        else{
            console.log('Extra category not deleted');
        }
        return res.redirect('/admin/ecate/viewEcate');    
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/ecate/viewEcate');    
    }
}