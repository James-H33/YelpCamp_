const express = require('express');
const router  = express.Router();

router.get('/campgrounds', function(req, res, next) {
    res.render('campgrounds/campgrounds');
});

module.exports = router;
