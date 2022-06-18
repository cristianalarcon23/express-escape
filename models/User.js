const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
    name: {
        type: String
    },
    age: {
        type: Number,
    },
    email: {
        type: String
    },
    hashedPassword: {
        type: String
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;