var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var csurf = require('csurf');
var express = require('express');
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var sessions = require('client-sessions');
var formidable = require('formidable');
var clusterMaker = require('clusters');

 

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//connect to mongo and use reguser database we created 
mongoose.connect('mongodb://localhost/reguser');
//var db = mongojs('budgetdata',['budgetdata']);



var User = mongoose.model('User', new Schema({
    id       : ObjectId,
    firstName: String,
    lastName : String,
    email    : {type : String, unique :true},
    password : String
})); 

var bdata =  new Schema({
    no : Number,
    price    : Number,
    quantity : String,
    categories : String
});

var expensedata = new Schema({
    amount : Number,
    remainder : String,
    categories : String,
    expenseDate : String,
    remainderDate : String,
    setTime : Number,
    dueDate : Number
});

var expenses = mongoose.model('expenses',expensedata);

var budgets = mongoose.model('budget',bdata);

var app = express();
var path    = require("path");
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.locals.pretty = true;
 //middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessions({
    cookieName: 'session',
    secret: 'hdskfrefre32edhsekfjds23r3hdfsd32dnd',
    duration: 30*60*1000,
    activeDuration: 5*60*1000
}));

app.get('/',  function(req,res){
    res.sendFile(path.join(__dirname+'/public/index.html'));   
    res.send('Home page');
});

app.get('/reguser', function(req,res){
    console.log('get budget data');
    budgets.find(function(err,docs){
        if(err){
            console.log(err);
        }
        else{
        //console.log(docs);
        res.json(docs);
        }
    })
});

app.post('/reguser', function(req,res){
        console.log('budget data saved');
        console.log(req.body);
        
        var cost = new budgets({
            no : req.body.no,
            price : req.body.price,
            quantity : req.body.quantity,
            categories : req.body.categories
        });

        cost.save(req.body, function(err,docs){
            if (err) {
                throw err;
            }
            res.json(docs);
            console.log(cost);   
        });
});

app.post('/reguser' , function(req,res){
    console.log('Expense data being saved');
    console.log(req.body);
    var ex = new expenses({
        amount : req.body.amount,
        categories : req.body.categories,
        expenseDate :  req.body.expenseDate
    });
    ex.save(req.body, function(err,docs){
        if(err){
            throw err;
        }
        res.json(docs);
        console.log(cost);
    })
});

app.delete('/reguser/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    budgets.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
        res.json(doc);
    });
});

app.get('/reguser/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    budgets.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
            res.json(doc);
    });
});

app.put('/reguser/:id', function(req,res){
    var id = req.params.id;
    console.log(req.body.name);
    budgets.findAndModify({
        query : {_id : mongojs.ObjectId(id)},
        update : {$set : {category:req.body.category,name:req.body.name, description:req.body.description, price:req.body.price, stock:req.body.stock, packing:req.body.packing }},
        new : true }, function(err,doc){
                res.json(doc);
        });
});

//csurf should be below all the requests that are made to the db
//app.use(csurf());

app.get('/signup', function(req,res){
    res.sendFile(path.join(__dirname+'/public/partials/signup.html'));
    console.log("SignUP");
});

app.post('/signup', function(req,res){
         
    console.log(req.body);
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    var user = new User({
        firstName:req.body.firstName,
        lastName :req.body.lastName,
        email    :req.body.email,
        password :hash
    });



    user.save(function(err){
        if (err) {
            var err = 'This email is taken, try another!!';
            if(err.code === 11000){
                var   err = "This email is taken, try another!!";
                console.log(err);
            }
            res.sendFile(path.join(__dirname+'/public/partials/signup.html'), {err:err});
        }else{

            res.redirect('/dashboard');
            console.log("You are all set");
        }
    });

    console.log("this module is working");
});

app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname+'/public/partials/login.html'));
    console.log("Login page");
});

app.post('/login' , function(req,res){

        User.findOne({email:req.body.email}, function(err,user){
                if(!user){
                    res.sendFile(path.join(__dirname+'/public/partials/login.html'));
                    var error = 'Invalid email or password';
                    console.log(error);
                }else{
                    if(bcrypt.compareSync(req.body.password, user.password)){
                        req.session.user = user;
                        res.redirect('/dashboard');
                        console.log("this module is  working");
                    }else{
                        res.sendFile(path.join(__dirname+'/public/partials/login.html'), {err:'Invalid email or password'});
                    }
                }
        });
    console.log("this module is  also working");

});

app.get('/dashboard', function(req,res){

    if (req.session && req.session.user) {
          User.findOne({email:req.session.user.email}, function(err,user){
            if(!user){
                req.session.reset();
                res.redirect('/login');  
            }else{ 
                res.locals.user = user;
                res.sendFile(path.join(__dirname+'/public/partials/dashboard.html'));
                console.log("testing");
             }
        });

        }else{
              res.redirect('/login');
        }


});

app.get('/expenses', function(req,res){
    
    if (req.session && req.session.user) {
          User.findOne({email:req.session.user.email}, function(err,user){
            if(!user){
                req.session.reset();
                res.redirect('/login');  
            }else{ 
                res.locals.user = user;
                res.sendFile(path.join(__dirname+'/public/partials/expenses.html'));
                console.log("testing");
             }
        });

    }else{
          res.redirect('/login');
    }

 });

app.get('/budget', function(req,res){
    
    if (req.session && req.session.user) {
          User.findOne({email:req.session.user.email}, function(err,user){
            if(!user){
                req.session.reset();
                res.redirect('/login');  
            }else{ 
                res.locals.user = user;
                res.sendFile(path.join(__dirname+'/public/partials/budget.html'));
                console.log("testing");
             }
        });

    }else{
          res.redirect('/login');
    }

 });

app.get('/profile' ,function(req,res){
                res.sendFile(path.join(__dirname+'/public/partials/profile.html'));
});



app.get('/logout', function(req,res){
    req.session.reset();
    res.redirect('/login');
});

app.use(function(req,res){
                res.sendFile(path.join(__dirname+'/public/partials/404.html'));
});


app.listen(port);

console.log('APP running on localhost:' + port);

