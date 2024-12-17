//const express = require('express')
// Lecture 14
/*
    param middleware:
        - a special paramter which runs on certain route paramter.
*/
const app = require('./Express/index.js');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;



mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


// Example Schema and Model (Optional)
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
  });
  
  const User = mongoose.model('User', UserSchema);
  
  // Example Usage
  async function addUser() {
    const user = new User({ name: 'shetty', age: 21, email: 'shetty@gmail.com' });
    await user.save();
    console.log('User added:', user);
  }
  // update

  async function retrive() {
    User.find({name: "Zakir"}).then(users => console.log("All Users", users))
    .catch(err => console.error("Error fetching users", err))
  }

  retrive();

//   addUser();

  // server
app.listen(PORT, ()=>{
    console.log(`Express Server Started on PORT : ${PORT}`)
})
