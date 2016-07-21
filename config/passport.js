const passport      = require('passport');
const User          = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

// Tells Passport how to store user
passport.serializeUser(function(user, done) {
    done(null, user.id); // Whenever you want to store the user, do so by id.
});

passport.deserializeUser(function(id, done){
    // User mongoose to find the user
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


// Create Local strategy that sends an error or creates a new user
passport.use('local.register', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password', 
    passReqToCallback: true
}, function(req, email, password, done) {

    // Before checking to see if the email address is already in use. Check to see if the given email address is valid
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty().isLength({min: 4});
    // validationErrors is a built in function of express-validator
    var errors = req.validationErrors();
    var messages = []; // Empyty array to push all messages to be looped through on the view
    if (errors) {
      errors.forEach(function(err) {
            messages.push(err.msg);
      });

      // null = err; false = not successful; Send error messages to the view
      return done(null, false, req.flash('error', messages));
    }

    User.findOne({'email': email}, function(err, user) {
        if (err) {
            return done(err);
        }

        if (user) {
            // null = no error || false = not successful || Error Message through flash
            return done(null, false, {message: 'Email is already in use.'});
        }

        // newUser.encryptPassword is a method that is add to the user model || See user model
        newUser             = new User(); 
        newUser.name        = req.body.name;
        newUser.email       = email;
        newUser.password    = newUser.encryptPassword(password);
        newUser.save(function(err, result){
            if (err) {
                done(err);
            }
            return done(null, newUser);
        });
    });
}));


// Login Local Strategy
passport.use('local.login', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password', 
    passReqToCallback: true

}, function(req, email, password, done) {

    // Before checking to see if the email address is already in use. Check to see if the given email address is valid
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty();
    // validationErrors is a built in function of express-validator
    var errors = req.validationErrors();
    var messages = []; // Empty array to push all messages to be looped through on the view
    if (errors) {
      errors.forEach(function(err) {
            messages.push(err.msg);
      });

      // null = err; false = not successful; Send error messages to the view
      return done(null, false, req.flash('error', messages));
    }

    
    User.findOne({ 'email' : email }, function(err, user) {
        if (err) {
            return done(err);
        } 
        if (!user) {
            return done(null, false, { message: "Incorrect Email" });
        }

        if (!user.validPassword(password)) {
            return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, user);
    });
}));