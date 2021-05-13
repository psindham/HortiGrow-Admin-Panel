require('./models/dbs');
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const path = require('path');
let app = express();

mongoose.connect('mongodb+srv://admin:admin987@cluster0.yadal.mongodb.net/Hortigrow',{
    useNewUrlParser:true , useUnifiedTopology:true
});

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongoDB using mongoose");
});
app.use(express.static('views/Images')); 

app.use(express.static('Public'));

const UserController = require('./controllers/userController');

const IndexController = require('./controllers/IndexController');

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/Layouts/' }));
app.set('view engine', 'hbs');

app.use('/index',IndexController);

// const hbs =require('hbs');
// hbs.registerPartials(__dirname+'/views/partials')

// app.set('views', path.join(__dirname+"/"+"views"))
// app.set('view engine', 'hbs')

// app.get('/',async (req,res)=>{
//      res.render('product');
//  });

app.listen(8080);
console.log('Running at 5000');

