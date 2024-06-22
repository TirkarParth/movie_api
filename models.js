const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Movie schema
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: String,
        Death: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

// User schema
let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('Password') || this.isNew) {
        this.Password = await bcrypt.hash(this.Password, 10);
    }
    next();
});

// Method to validate password
userSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.Password);
};

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
