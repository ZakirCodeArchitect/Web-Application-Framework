//const express = require('express')
// Lecture 14
/*
    param middleware:
        - a special paramter which runs on certain route paramter.
*/
const app = require('./Express/index.js');

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`Express Server Started on PORT : ${PORT}`)
})
