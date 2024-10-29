const express = require("express")
const app = express();
const dotenv = require('dotenv').config();
const users = require("./MOCK_DATA.json")

/*  Information: 

    1. Get ( Retrieve )
    2. Post ( Store )
    3. Patch
    4. Put ( Update )
    5. Delete ( Remove )

    - URL Sends request to the server and server sends back response.
    
    Versions : 4.21.1

    First Part - 4  Major Updates / Breaking update
    Second Part - 21    Feature change, Bug Fixes (Recommended) such as new route added
    Third Part - 1  Minor Fixes (Optional) such as (request,res) =>{}

    1.0.1 -> 1.0.2 ( Minor changes )
    1.0.1 -> 1.1.0 ( Feature Added )

    Major Releases : 1st Part
        - (^4.21.1) carrot symbol denotes if i run 'npm update' do not update major change or like not change the version so that my code doesn't get stucked, can update minor changes, bug fixes but no major change.
        
    ~ only minor update ( 4.21.1 -> 4.21.2 )    in the package.json

    "express":"latest" in the package.json

    ----------------------------------------------------------------------------
    REST API - Representational State Transfer Application Programming Interface.
    ----------------------------------------------------------------------------

    GET / users - means html response
    GET / api / users - API tells we have to send json data.
    
    GET / getUser -> not a good practice to write this way.

    Server Side Rendering - SSR ()
        - Fast as compared to CSR.

    Client Side Rendering - CSR ( React.js )
*/

// Routing 
app.get("/", (req,res) => {
    res.end("Home Page")
})

app.get("/users", (req,res) => {

    const html = `<ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>`
    return res.send(html) // sending json data
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