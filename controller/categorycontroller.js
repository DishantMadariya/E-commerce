const Cate = require('../models/Category');
module.exports.insertCateData = async(req,res)=>{
    try {
        if(req.body){
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            await Cate.create(req.body);
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.viewCate = async(req,res)=>{
    try {
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
        var perPage = 12;

        let CateData = await Cate.find({
            isActive : true,
            $or :[
                {"cateName":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).limit(perPage).skip(perPage*page);
        let totalCatedata = await Cate.find({
            isActive : true,
            $or :[
                {"cateName":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).countDocuments();
        return res.render('viewCategory',{
            cateData : CateData,
            searchValue : search,
            totaldocument : Math.ceil(totalCatedata/perPage),
            currentPage : page
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
            let deactive = await Cate.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Cate.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.updateCate = async(req,res)=>{
    let CateData = await Cate.findById(req.params.id);
    return res.render('updateCategory',{
        catedata : CateData
    })
}
module.exports.editCate = async(req,res)=>{
    try {
        let oldData = await Cate.findById(req.body.EditId);
        if(oldData){
            req.body.updateDate = new Date().toLocaleString();
            let Cd = await Cate.findByIdAndUpdate(req.body.EditId, req.body);
            if(Cd){
                console.log('Category Data Update Succesfully');
            }
            else{
                console.log('Category data not updated ');
            }
        }
        else{
            console.log('Old Data not found');
        }
        return res.redirect('/admin/category/viewCategory');
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/category/viewCategory');
    }
}
module.exports.deletCate = async(req,res)=>{
    try {
        let deletCate = await Cate.findByIdAndUpdate(req.params.id, { isActive: false });
        if(deletCate){
            console.log('Category data delet succesfully');
        }
        else{
            console.log('Category not deleted');
        }
        return res.redirect('/admin/category/viewCategory');
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/category/viewCategory');
    }
}