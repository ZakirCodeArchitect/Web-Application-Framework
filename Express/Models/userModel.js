const mongoose = require('mongoose')

// defining the dataTypes of the variables
const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: String,
    gender: String,

},{
    timestamps: true
});

module.exports = mongoose.model("books", userSchema)