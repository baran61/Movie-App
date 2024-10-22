const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    title: {type:String, required:true},
    overview: { type: String },
    release_date: { type: String },
    poster_path: { type: String },
})

const Movie =mongoose.model('Movie', MovieSchema);

module.exports = Movie;