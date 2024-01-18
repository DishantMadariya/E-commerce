const Scate = require('../models/Scate');
const Category = require('../models/Category');
module.exports.addScate =  async(req,res)=>{
    var categoryData = await Category.find({isActive : true});
    return res.render('addScate',{
        cateData : categoryData
    });
}
module.exports.insertData = async(req,res)=>{
    try {
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            await Scate.create(req.body);
            return res.redirect('back');
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
module.exports.viewScate = async(req,res)=>{
    try {
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
            let ScateData = await Scate.find({
                isActive : true,
                $or :[
                    {"scateName":{$regex : ".*"+search+".*",$options:"i"}},
                ]
            }).limit(perPage).skip(perPage*page).populate('category').exec();
            let totalScatedata = await Scate.find({
                isActive : true,
                $or :[
                    {"scateName":{$regex : ".*"+search+".*",$options:"i"}},
                ]
            }).countDocuments();
            return res.render('viewScate',{
                scateData : ScateData,
                searchValue : search,
                totaldocument : Math.ceil(totalScatedata/perPage),
                currentPage : page,
            })
        }
        catch (error) {
            console.log(error);
            return res.redirect('back');    
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
module.exports.isActive = async(req,res)=>{
    try {
        if (req.params.id) {
            let deactive = await Scate.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Scate.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.updateScate = async(req,res)=>{
    try {
        let Cate = await Category.find();
        let ScateData = await Scate.findById(req.params.id);
        if(ScateData){
            return res.render('updateScate',{
                cateData : Cate,
                scatedata : ScateData
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
module.exports.editScate = async(req,res)=>{
    try {
        let oldData = await Scate.findById(req.body.EditId);
        if(oldData){
            req.body.updateDate = new Date().toLocaleString();
            let Cd = await Scate.findByIdAndUpdate(req.body.EditId, req.body);
            if(Cd){
                console.log('Sub category Data Update Succesfully');
            }
            else{
                console.log('Sub category data not updated ');
            }
        }
        else{
            console.log('Old Data not found');
        }
        return res.redirect('/admin/scate/viewScate');    
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/scate/viewScate');    
    }
}
module.exports.deletScate = async(req,res)=>{
    try {
        let deletCate = await Scate.findByIdAndUpdate(req.params.id, { isActive: false });
        if(deletCate){
            console.log('Sub category data delet succesfully');
        }
        else{
            console.log('Sub category not deleted');
        }
        return res.redirect('/admin/scate/viewScate');
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/scate/viewScate');
    }
}