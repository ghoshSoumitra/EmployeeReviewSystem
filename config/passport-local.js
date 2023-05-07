const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email',
    },
    function(email, password, done) {
        // find the user and establish the identity
        User.findOne({ email: email })
            .then(function (user) {
                if (!user || user.password != password) {
                    console.log('Invalid username or password');
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch(function (err) {
                console.log('Error while finding user in passport');
                return done(err); 
            });
    }
));

// serializing user to decide what is in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key into the cookie
passport.deserializeUser(function(id, done){
    User.findById(id)
        .then(function(user) {
            return done(null, user);
        })
        .catch(function(err) {
            console.log("Error while finding user in deserializing");
            return done(err);
        });
});

// check if user authenticated 
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
  
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // user is authenticated then req.user is contains the curr login user from the session cookie
        // and we are just sending this to locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
