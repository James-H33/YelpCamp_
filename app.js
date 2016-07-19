const express            = require('express');
const favicon            = require('serve-favicon');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const mongoose           = require('mongoose');
const methodOverride     = require('method-override');

// Routes
const IndexRoutes       = require('./routes/index');
const CampgroundsRoutes = require('./routes/campgrounds');
const UserRoutes        = require('./routes/user');

const app = express();

// Connect Database
mongoose.connect('mongodb://localhost/yelpcamp_');


const port = process.env.PORT || 3000;
const portIP = process.env.IP;

// View Engine Pug
app.set('view engine', 'pug');

// Settings
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(methodOverride('_method'));


app.use('/', IndexRoutes);
app.use('/', CampgroundsRoutes);
app.use('/', UserRoutes); 

app.listen(port, portIP, function() {
    console.log('Server has started on port ' + port);
})
