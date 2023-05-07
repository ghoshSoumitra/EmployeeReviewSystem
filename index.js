const express=require('express');
const App=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose')
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo');


// for getting form data
App.use(express.urlencoded({ extended: true }))

// for static files
App.use(express.static('./assets'));
App.use(expressLayouts);


// to render css file link in header
App.set('layout extractStyles', true);
App.set('layout extractScripts', true);

// view engine
App.set('view engine', 'ejs');
App.set('views', './views');



//cookie session
App.use(session({
   name : 'review-tracker',
   secret : 'nothing',
   saveUninitialized : false,
   resave : false,
   cookie : {
       maxAge : (1000 * 60 * 100)
   },
   store:MongoStore.create({
       mongoUrl: 'mongodb://127.0.0.1:27017/review-db',
       autoRemove : 'disabled',
   }, function(err){
       console.log(err || 'connect-mongodb setup');
   }),
}));


//authentication
App.use(passport.initialize());
App.use(passport.session());
App.use(passport.setAuthenticatedUser);


//routes
App.use('/', require('./routes/home'));


//listening to the port
App.listen(port,()=>{
   console.log("Server Running on 8000")
})