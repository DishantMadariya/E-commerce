const Cate = require('../models/Category');
const Scate = require('../models/Scate');
const Ecate = require('../models/Ecate');
const Brand = require('../models/Brand');
const Type = require('../models/Type');
const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');
module.exports.home = async(req,res)=>{
    try {
        let Category = await Cate.find({isActive : true});
        let Subcategory = await Scate.find({isActive : true});
        let Extracategory = await Ecate.find({isActive : true});
        let product = await Product.find({isActive : true});
        if(req.user){
            var cartData = await Cart.find({userId : req.user.id, status : 'pending'}).countDocuments();
            var cartPendingData = await Cart.find({ userId: req.user.id, status: 'pending' }).populate('productId').exec();
        }
        return res.render('UserPanel/home',{
            cate : Category,
            subcate : Subcategory,
            ecate : Extracategory,
            productData : product,
            cartdata : cartData,
            cartpendingData : cartPendingData
        });
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.filterBrand = async(req,res)=>{
    try {
        let catData = await Product.find({category : req.body.cid,subcategory:req.body.sid,extracategory:req.body.eid,brandname:req.body.id});
        let product = await Product.find({category : req.body.cid});
        catData
        return res.render('UserPanel/filter',{
            productData : catData,
            product : product
        });
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.findData = async(req,res)=>{
    try {
        let product = await Product.find({category : req.params.cid,subcategory:req.params.sid,extracategory:req.params.eid}).populate('brandname').exec();
        let Category = await Cate.find({isActive : true});
        let Subcategory = await Scate.find({isActive : true});
        let Extracategory = await Ecate.find({isActive : true});
        let recentPost = await Product.find({category : req.params.cid}).sort({ id: -1 }).limit(3);
        if(req.user){
            var cartData = await Cart.find({userId : req.user.id, status : 'pending'}).countDocuments();
            var cartPendingData = await Cart.find({ userId: req.user.id, status: 'pending' }).populate('productId').exec();
        }
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
            cartdata : cartData,
            cartpendingData : cartPendingData
        });
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.gotocart = async(req,res)=>{
    try {
        let singleproduct = await Product.findById(req.params.id);
        let Category = await Cate.find({isActive : true});
        let Subcategory = await Scate.find({isActive : true});
        let Extracategory = await Ecate.find({isActive : true});
        let recentPost = await Product.find({category: singleproduct.category}).sort({ id: -1 }).limit(6);
        if(req.user){
            var cartData = await Cart.find({userId : req.user.id, status : 'pending'}).countDocuments();
            var cartPendingData = await Cart.find({ userId: req.user.id, status: 'pending' }).populate('productId').exec();
        }
        return res.render('UserPanel/singleproduct',{
            cate : Category,
            subcate : Subcategory,
            ecate : Extracategory,
            details : singleproduct,
            recentProduct : recentPost,
            cartdata : cartData,
            cartpendingData : cartPendingData
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.userlogin = async(req,res)=>{
    try {
        let Category = await Cate.find({isActive : true});
        let Subcategory = await Scate.find({isActive : true});
        let Extracategory = await Ecate.find({isActive : true});
        if(req.user){
            var cartData = await Cart.find({userId : req.user.id, status : 'pending'}).countDocuments();
            var cartPendingData = await Cart.find({ userId: req.user.id, status: 'pending' }).populate('productId').exec();
        }
        return res.render('UserPanel/userLogin',{
            cate : Category,
            subcate : Subcategory,
            ecate : Extracategory,
            cartdata : cartData,
            cartpendingData : cartPendingData
        });
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
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
module.exports.addtoCart = async(req,res)=>{
    try {
        let already = await Cart.findOne({userId: req.params.userid, productId : req.params.productid});
        if(already){
            console.log('Product Already into Cart');
        }
        else{
            const cartdata = {
                productId : req.params.productid,
                userId : req.params.userid,
                quantity : 1,
                status : 'pending',
                currentDate : new Date().toLocaleString(),
                updateDate : new Date().toLocaleString(),
            }
            let cart = await Cart.create(cartdata);
            if(cart){
                console.log('Add to Cart Succesfully');
                return res.redirect('back');
            }
            return res.redirect('back');
        }
        return res.redirect('back');
    }
    catch (error) {
        console.log('something Wrong');
        return res.redirect('back');    
    }
    
}
module.exports.deletcart = async(req,res)=>{
    try {
        let finddata = await Cart.findByIdAndDelete(req.params.id);
        if(finddata){
            console.log('cart item delet succesfully');
        }
    return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
    
}
module.exports.cart = async(req,res)=>{
    try {
        let Category = await Cate.find({isActive : true});
        let Subcategory = await Scate.find({isActive : true});
        let Extracategory = await Ecate.find({isActive : true});
        if(req.user){
            var cartData = await Cart.find({userId : req.user.id, status : 'pending'}).countDocuments();
            var cartPendingData = await Cart.find({ userId: req.user.id, status: 'pending' }).populate('productId').exec();
        }
        let findcart = await Cart.find({userId : req.params.id}).populate('productId').exec();
        if(findcart){
            return res.render('UserPanel/cart',{
                cate : Category,
                subcate : Subcategory,
                ecate : Extracategory,
                cartdata : cartData,
                cartpendingData : cartPendingData,
                cart : findcart
            });
        }
        else{
            console.log('cart Data not Found');
            return res.redirect('/');
        }
       
    }
    catch (error) {
        console.log(error);
        return res.redirect('/');
    }
}
module.exports.changeQuantity = async(req,res)=>{
    try {
        let change = await Cart.findByIdAndUpdate(req.body.cartId,{quantity :req.body.quantity });
        if(change){
            console.log('quantity Update Succesfully');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.deletcartitem = async(req,res)=>{
    try {
        let delet = await Cart.findByIdAndDelete(req.params.id);
        if(delet){
            console.log('item delete succesfully');
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}