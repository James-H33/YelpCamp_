const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const csrfProtection = csrf(); 
router.use(csrfProtection);


router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
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
    res.render('user/login', { csrfToken: req.csrfToken(), errorMessage: errorMessage, hasErrors: errorMessage });
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
    res.redirect('/campgrounds');
}
