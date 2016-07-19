const Campgrounds = require('../models/campgrounds');
const mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/yelpcamp_');

const campgrounds = [
   new Campgrounds({
       imagePath: 'https://images.unsplash.com/photo-1437382944886-45a9f73d4158?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=733f1b1d8238de29d9fa41d841e96d0d', 
       name: 'Bear Cove', 
       location: 'Mt. Fuji', 
       description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    }), 
   new Campgrounds({
       imagePath: 'https://images.unsplash.com/photo-1439123414876-0717652a92a9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=28535399ddd90b3c1d13c9da63c4da0b', 
       name: 'Mountain View', 
       location: 'Mt. Conseder', 
       description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    }), 
   new Campgrounds({
       imagePath: 'https://images.unsplash.com/photo-1460899162311-d63278c9cf9d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=145812355e97106838bb7dcb114bfd63', 
       name: 'Cities Edge', 
       location: 'Wyoming', 
       description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    }), 
   new Campgrounds({
       imagePath: 'https://images.unsplash.com/photo-1437382944886-45a9f73d4158?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=733f1b1d8238de29d9fa41d841e96d0d', 
       name: 'Bear Cove', 
       location: 'Mt. Fuji', 
       description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    }), 
   new Campgrounds({
       imagePath: 'https://images.unsplash.com/photo-1439123414876-0717652a92a9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=28535399ddd90b3c1d13c9da63c4da0b', 
       name: 'Mountain View', 
       location: 'Mt. Conseder', 
       description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    }), 
   new Campgrounds({
       imagePath: 'https://images.unsplash.com/photo-1460899162311-d63278c9cf9d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=145812355e97106838bb7dcb114bfd63', 
       name: 'Cities Edge', 
       location: 'Wyoming', 
       description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    })
];

let done = 0;
for (var i = 0; i < campgrounds.length; i++) {
    campgrounds[i].save(function() {
        done++;
        if (done === campgrounds.length) {
            exit();
        }
    })
}

function exit() {
    mongoose.disconnect();
}