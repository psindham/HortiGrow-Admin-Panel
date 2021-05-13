const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Users = mongoose.model('user');

router.get('/',async (req,res)=>{
    res.json('product');
});

module.exports = router;