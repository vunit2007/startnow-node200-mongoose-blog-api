// Imports mongoose and extracts Schema into it's own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a new Mongoose Schema with two properties
const BlogSchema = new Schema({
    title: { type: String, required: true},
    article: {type: String, required: true},
    published: {type: Date, required: true}, 
    featured: { type: Boolean, required: true},
    // authorld: {type: ObjectId, required: true},
    // New property
    author: { type: Schema.Types.ObjectId, ref: 'User' }
}, { usePushEach: true });

module.exports = mongoose.model('Blog', BlogSchema);


