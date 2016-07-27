const express            = require('express');
const favicon            = require('serve-favicon');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const mongoose           = require('mongoose');
const session            = require('express-session');
const passport           = require('passport');
const methodOverride     = require('method-override');
const flash              = require('connect-flash');
const validator          = require('express-validator');
const User               = require('./models/user');

// Routes
const IndexRoutes       = require('./routes/index');
const CampgroundsRoutes = require('./routes/campgrounds');
const UserRoutes        = require('./routes/user');

const app = express();

// Connect Database
mongoose.connect('mongodb://localhost/yelpcamp_');
// mongoose.connect('mongodb://retsbud:String33@ds031915.mlab.com:31915/yelpcamp_');
require('./config/passport');


const port = process.env.PORT || 3000;
const portIP = process.env.IP;

// View Engine Pug
app.set('view engine', 'pug');

// Settings
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'practicalsteelchicken',
    resave: false,
    saveUninitialized: false
 }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    next();
});


app.use('/', IndexRoutes);
app.use('/', CampgroundsRoutes);
app.use('/', UserRoutes);


app.listen(port, portIP, function() {
    console.log('Server has started on port ' + port);
});
