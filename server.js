var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '/static')));
app.use(express.static( __dirname + '/productManager/dist'));
// app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'ejs');
var mongoose = require('mongoose'); //require mongoose
mongoose.connect('mongodb://localhost/productmngdb');
mongoose.Promise = global.Promise;

var ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 3},
    price: {type: Number, required: true},
    image: {type: String}
}, {timestamps: true})

mongoose.model('Product', ProductSchema);
var Product = mongoose.model('Product');


app.get('/allproducts', function(req, res){
    console.log("HEREERR");
    Product.find({}, function(err, products){
        if(err){
            res.json({message: 'Error', err})
        }
        else{
            res.json({data: products})
        }
    })
})

app.post('/products', function(req, res){
    var new_product = new Product({title: req.body.title, price: req.body.price, image: req.body.image});
    new_product.save(function(err, products){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({message: 'Success', data: products})
        }
    })
})

app.get('/products/:id', function(req, res){
    Product.findOne({_id: req.params.id}, function(err, products){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({data: products})
        }
    })
})

app.delete('/products/:id', function(req, res){
    Product.remove({_id: req.params.id}, function(err, products){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({message: 'Success', data: products})
        }
    })
})

app.put('/products/:id', function(req, res){
    Product.update({_id: req.params.id}, {title: req.body.title, price: req.body.price, image: req.body.image}, function(err, products){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({message: 'Success', data: products})
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./productManager/dist/index.html"))
  });


app.listen(8000, function(){
    console.log("Listening on port 8000");
})