const express = require('express');
const router = express.Router();

router.get('/register', function(req, res, next) {
    res.render('user/register');
});

module.exports = router;