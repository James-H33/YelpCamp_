const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const schema = new Schema({
    imagePath:   {type: String, required: true}, 
    name:        {type: String, required: true}, 
    location:    {type: String, required: true}, 
    description: {type: String, required: true},
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User", 
            required: true
        }, 
        username: {type: String, required: true}
    }
});


module.exports = mongoose.model('Campgrounds', schema);
