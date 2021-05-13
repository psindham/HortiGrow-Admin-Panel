const mongoose = require('mongoose');

const ProductSchema= new mongoose.Schema({
    ProductName:{
        type:String,
        required: 'This field is required.'
    },
    ProductDescription:{
        type:String,
        required: 'This field is required.'
    },
    ProductStock:{
        type:Number,
        required:'This field is required.'
    },
    ProductImage:{
        type:String,
        required:'This field is required.'
    },
    ProductDate:{
        type:Date,
        required:true
    },
    ProductCategory:{
        type:String,
        required:true
    },
    ProductPrice:{
        type:Number,
        required:true
    },
});





module.exports= mongoose.model('product',ProductSchema);