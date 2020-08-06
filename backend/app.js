const express =require('express');
var app = new express();
const jwt = require ('jsonwebtoken');
const cors = require ('cors');
const mongoose = require('mongoose');
const ProductData = require('./src/model/Productdata');
const User = require('./src/model/user');

const db ='mongodb+srv://shruthi555:shruthi555@cluster0.3h7kt.gcp.mongodb.net/ProductDb?retryWrites=true&w=majority';
mongoose.connect(db,err=>{
    if(err){
        console.error('Error!' + err)
    }else{
        console.log('Connected to mongodb');
    }
});



var bodyparser = require('body-parser');


app.use(cors());
app.use(bodyparser.json());




function verifyToken(req,res,next){
    if (!req.headers.authorization){
         return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()

}


app.get('/products',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    ProductData.find()
          .then(function(products){
              res.send(products);
          });
});
app.get('/insert',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    console.log(req.body);

var product ={
    productId : req.body.product.productId,
    productName : req.body.product.productName,
    productCode : req.body.product.productCode,
    releaseDate : req.body.product.releaseDate,
    description : req.body.product.description,
    price : req.body.product.price,
    starRating : req.body.product.starRating,
    imageUrl : req.body.product.imageUrl

}
var product = new ProductData(products);
product.save();
});


app.post('/update',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);

var product ={
    productId : req.body.product.productId,
    productName : req.body.product.productName,
    productCode : req.body.product.productCode,
    releaseDate : req.body.product.releaseDate,
    description : req.body.product.description,
    price : req.body.product.price,
    starRating : req.body.product.starRating,
    imageUrl : req.body.product.imageUrl

}
console.log("Data got in server in edit " +product._id);
ProductData.updateOne(
    {_id:req.body.productItem._id},{$set:product},
     function(err,res){
     if(err){
         console.log(err)
        }
    }
     )
     
});

app.post('/delete',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);

var product ={
    productId : req.body.product.productId,
    productName : req.body.product.productName,
    productCode : req.body.product.productCode,
    releaseDate : req.body.product.releaseDate,
    description : req.body.product.description,
    price : req.body.product.price,
    starRating : req.body.product.starRating,
    imageUrl : req.body.product.imageUrl

}
console.log("backend server item is " +product._id);
ProductData.deleteOne(
    {_id:req.body.productItem._id})
    .then(function(products){
        res.send(products);
    });
    console.log('remove() is executed')

});


app.post('/register',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS")
     let userData= req.body;
     let user = new User(userData);
     user.save((err,registeredUser)=>{
         if(err){console.log(err)}
         else{
            let payload = {subject:user._id}
            let token = jwt.sign(payload,'secretKey') 
            res.status(200).send({token})}

     })

     

})

app.post('/login',(req,res)=>{
    let userData =req.body;
    User.findOne({email: userData.email},(err,user)=>{
        if(err)
            {
                console.log(err);
            }
        else{
            if(!user)
                {
                    res.status(401).send('inavlid email')
                }
            else if(user.password != userData.password)
                {
                    res.status(401).send('invalid password')
                }
            else{
                let payload = {subject:user._id}
                let token = jwt.sign(payload,'secretKey') 
                res.status(200).send({token})
                   
                }
            }
    })


})


app.listen(5500,function(){
    console.log('listening to port 3000');
});