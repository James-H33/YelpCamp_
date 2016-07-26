const express     = require('express');
const router      = express.Router();
const Campground  = require('../models/campgrounds');
const Comment     = require('../models/comments');

// Campground Home
router.get('/campgrounds', function(req, res, next) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        }
        res.render('campgrounds/campgrounds', { camp: campgrounds });
    })
});

// Got to specific Campground
router.get('/campgrounds/:id', function(req, res, next) {
    let campgroundId = req.params.id;

    Campground.findById(campgroundId).populate('comments').exec(function(err, campground) {
        if (err) {
            console.log(err);
        }
        console.log(campground);

        res.render('campgrounds/campsite', { camp: campground });

    });
});


// New Campground
router.get('/new', isLoggedIn, function(req, res, next) {
    res.render('campgrounds/new');
});

// Add New Campground
router.post('/campgrounds', isLoggedIn, function(req, res, next) {
    let data = new Campground ({
        name:         req.body.name,
        imagePath:    req.body.imagePath,
        location:     req.body.location,
        description:  req.body.description,
        author: {
            id: req.user._id,
            username: req.user.name
        }
    });

    data.save(function(err, result) {
        if (err) {
            return console.log(err);
        }

        return res.redirect('/campgrounds');
    });
});


// Edit Campground
router.get('/campgrounds/:id/edit', checkCampgroundOwnership, function(req, res, next){
    Campground.findById(req.params.id, function(err, campground) {
        return res.render('campgrounds/edit', { campground: campground });
    });
});


// Update Campground
router.put('/campgrounds/:id', checkCampgroundOwnership, function(req, res, next) {
    let campgroundId = req.params.id;

    let data = {
        name:         req.body.name,
        imagePath:    req.body.imagePath,
        description:  req.body.description
    }

    Campground.findByIdAndUpdate(campgroundId, data, function(err, campground) {
        if (err) {
            console.log(err);
        }
        res.redirect('/campgrounds/' + req.params.id);
    });
});


// Destroy Campground
router.delete('/campgrounds/:id', checkCampgroundOwnership, function(req, res, next) {
    let campgroundId = req.params.id;
    Campground.findByIdAndRemove(campgroundId, function(err, campground) {
        if (err) {
            return res.redirect('/campgrounds/' + campgroundId, {errorMessage: "Cannot Delete"});
        }
        return res.redirect('/campgrounds');
    });
});


// Adding Campground Comments
router.post('/campgrounds/:id', isLoggedIn, function(req, res, next) {
    var data = req.body;

    var newComment = new Comment({
        text: data.comment,
        author: {
            id: req.user.id,
            username: req.user.name
        }
    });


    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        }

        newComment.save(function(err, result) {
            if (err) {
                console.log(err);
            }
            campground.comments.push(newComment);
            campground.save();
            console.log('Success: comment saved.');
            res.send(data);
        });

    });

});



module.exports = router;






//////////////////////// Beware the Middleware ////////////////////////////////


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
       return next();
    }
    res.redirect('/login');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkCampgroundOwnership(req, res, next) {
     let campgroundId = req.params.id;

     if (req.isAuthenticated()) {
        Campground.findById(campgroundId, function(err, campground) {
            var cUserId = campground.author.id;

            if (campground.author.id.equals(req.user._id)) {
                next();
            } else {
                return res.redirect('back');
            }
        });

     } else {
         return res.redirect('/login');
     }
}
