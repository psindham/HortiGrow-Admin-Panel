const express = require('express');
var router = express.Router();
var app=express.Router();
const mongoose = require('mongoose');
const { route } = require('./userController');

router.get('/', (req, res) => {
    res.render("Index/index");
});

router.get('/signin', (req, res) => {
    res.render("Index/signIn");
});


const product = mongoose.model('product');
const usr = mongoose.model('user');
router.get('/add_product',(req, res)=>{
    res.render("Index/add_product",{
        viewTitle : "Insert Product"
    });
});





router.get('/add_user',(req, res)=>{
    res.render("Index/add_user",{
        viewTitle : "Insert Product"
    });
});

// router.get('/edit_user/:id',(req, res)=>{
//     res.render("Index/edit_user",{
//         viewTitle:"Update Product",
//         Product: doc
//     });
// });

// router.get('/edit_product/:id', (req, res) => {
//     Employee.findById(req.params.id, (err, doc) => {
//         if (!err) {
//             res.render("Index/manage_product", {
//                 viewTitle: "Update Employee",
//                 employee: doc
//             });
//         }
//     });
// });




/*router.post('/edit_product',(req,res) => {
    if(req.body._id == '')
    {
        // insertRecord(req,res);
    }
    else{
        updateRecord(req,res);
    }
})*/


router.get('/delete/:id',(req,res) =>{
    product.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){
            res.redirect("/Index/manage_product");
            }
            else{
                console.log("Error in product table: " + err);
            }
        });
    });


router.get('/manage_product',(req, res)=>{
    product.find((err,docs) => {
        if(!err){
            res.render("Index/manage_product",{
                list: docs
            });
        }
        else{
            console.log('Error in retrieving list: ' + err);
        }
    }).lean()
});

router.get('/manage_user',(req, res)=>{
    usr.find((err,docs) => {
        if(!err){
            res.render("Index/manage_user",{
                list: docs
            });
        }
        else{
            console.log('Error in retrieving list: ' + err);
        }
    }).lean()
});

router.get('/order_report',(req, res)=>{
    res.render("Index/order_report");
});

router.get('/product_report',(req, res)=>{
    product.find((err,docs) => {
        if(!err){
            res.render("Index/product_report",{
                list: docs
            });
        }
        else{
            console.log('Error in retrieving list: ' + err);
        }
    }).lean()
});

router.get('/user_report',(req, res)=>{
    usr.find((err,docs) => {
        if(!err){
            res.render("Index/user_report",{
                list: docs
            });
        }
        else{
            console.log('Error in retrieving list: ' + err);
        }
    }).lean()
});


router.post('/manage_product',(req,res) => {
    if(req.body._id==''){
    insertRecord(req,res);
    }
    else{
        updateRecord(req,res);
    }
});

router.get('/delete/:id',(req,res) =>{
    product.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){
            res.redirect("/Index/manage_product");
            }
            else{
                console.log("Error in product table: " + err);
            }
        });
    });


    router.get('/deleteuser/:id',(req,res) =>{
        usr.findByIdAndRemove(req.params.id,(err,doc) => {
            if(!err){
                res.redirect("/Index/manage_user");
                }
                else{
                    console.log("Error in product table: " + err);
                }
            });
        });

    function insertRecord(req,res){
    var productt = new product();
    productt.ProductName = req.body.name;
    productt.ProductDescription = req.body.description;
    productt.ProductStock = req.body.stock;
    productt.ProductImage = req.body.image;
    productt.ProductDate = req.body.expire;
    productt.ProductCategory = req.body.Category;
    productt.ProductPrice = req.body.price;
    productt.save((err,doc) => {
        if(!err)
            res.redirect('/Index/manage_product');
        else{
            if(err.ProductName == ValidationError){
                handleValidationError(err,req.body);
                res.render("Index/add_user",{
                    viewTitle: "Insert Product",
                    productt: req.body
                })
            }else{
                console.log("Error during insertion: " + err);
            }
        }
    });
}


function updateRecord(req,res){
    product.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            console.log("reached");
            res.redirect('Index/manage_product');
        }
        else{
        console.log("Error during record update: " + err);
        }
    });
}




function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'ProductName':
                body['ProductNameError'] = err.errors[field].message;
                break;
            case 'ProductDescription':
                body['ProductDescriptioneError'] = err.errors[field].message;
                break;
            case 'ProductStock':
                body['ProductStockError'] = err.errors[field].message;
                break;
            case 'ProductImage':
                body['ProductImageError'] = err.errors[field].message;
                break;
            case 'ProductDate':
                body['ProductDateError'] = err.errors[field].message;
                break;
            case 'ProductCategory':
                body['ProductCategoryError'] = err.errors[field].message;
                break;
            case 'ProductPrice':
                body['ProductPriceError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/edit_product',(req, res)=>{
    res.render("Index/edit_product",{
        viewTitle : "Update Product"
    });
});

router.get('/edit_product/:id',(req, res)=>{
    product.findById(req.params.id,(err,doc) => {
        if(!err){
            res.render("Index/edit_product",{
                viewTitle:"Update Product",
                Product: doc
            });
        }
    });  
});




module.exports = router;
