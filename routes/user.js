const express       = require('express');
const router        = express.Router();
const csrf          = require('csurf');
const passport      = require('passport');
const User          = require('../models/user');
const Campground    = require('../models/campgrounds');

const csrfProtection = csrf();
router.use(csrfProtection);


router.get('/profile', isLoggedIn, function(req, res, next) {
    var userId = req.user.id;

    User.findById(userId, function(err, foundUser) {
        if (err) {
            console.log(err);
        }

        Campground.find({ 'author.id' : userId }, function(error, foundCampgrounds) {
            if (error) {
                 console.log(error);
                 return res.render('user/profile', { user: foundUser, camps: null, error: "No Campgrounds Yet!" });
            }
            console.log(foundCampgrounds);
            return res.render('user/profile', { user: foundUser, camps: foundCampgrounds });
        });
    });
});

router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/campgrounds');
});

router.use('/', notLoggedIn);


router.get('/register', function(req, res, next) {
    var errorMessage = req.flash('error');
    res.render('user/register', { csrfToken: req.csrfToken(), errorMessage: errorMessage, hasErrors: errorMessage.length > 0 });
});

router.post('/register', passport.authenticate('local.register', {
    successRedirect: '/campgrounds',
    failureRedirect: '/register',
    failureFlash: true
}));

router.get('/login', function(req, res, next) {
    var errorMessage = req.flash('error');
    res.render('user/login', { csrfToken: req.csrfToken(), errorMessage: errorMessage, hasErrors: errorMessage.length > 0 });
});

router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
    failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/campgrounds');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
