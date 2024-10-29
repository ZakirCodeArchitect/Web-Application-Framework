const express = require("express")
const app = express();
const dotenv = require('dotenv').config();

// HTTP Method 
/*
    1. Get ( Retrieve )
    2. Post ( Store )
    3. Patch
    4. Put ( Update )
    5. Delete ( Remove )

    - URL Sends request to the server and server sends back response.
    - 
*/

// Routing 
app.get("/", (req,res) => {
    res.end("Home Page")
})

app.get("/about", (req,res) => {
    res.end(`About Page : \nName: ${req.query.name} and id = ${req.query.id}`)
})

app.get("/contacts", (req,res) => {
    res.end("Contacts")
})


// const server = http.createServer(app);
// server.listen......

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`Express Server Started on PORT : ${PORT}`)
})