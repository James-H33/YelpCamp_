const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {type: String},
    date: {type: String},
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model('Comment', commentSchema);
