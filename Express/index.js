const express = require("express")
const app = express();
const dotenv = require('dotenv').config();
const users = require("./MOCK_DATA.json")
const fs = require('fs')

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


    --------------------------------------------------------------------------------------------
    Lecture+8 - Friday ( 1-Nov-2024 )

    Dynamic Path Parameter

    POSTMAN -> Use to Test API

    - browser performs get method by default.
    - 


*/

app.use(express.urlencoded({ extended: false }))

app.get("/users", (req, res) => {
    const html = `
        <table border="1" cellpadding="9" cellspacing="0">
            <thead>
                <tr>
                    <th><strong>First Name</strong></th>
                    <th><strong>Last Name</strong></th>
                    <th><strong>Email</strong></th>
                </tr>
            </thead>
            <tbody>
            ${users.filter((user) => user.email.endsWith('.com')).map((user) => 
                    `<tr>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>${user.email}</td>
                    </tr>`
                ).join("")}
            </tbody>
        </table>
    `;

    return res.send(html);
});


app.get("/contacts", (req,res) => {
    res.end("Contacts")
})

// Lecture # 8 

// app.route('/api/users/:id') -> Can merge the similar ones using this approach.

app.route('/api/users/:id')
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);

    res.json(user)
}).post((req, res) => {
    // Create a User
    const body = req.body;

    users.push({ id: users.length + 1, ...body }); // Spread operator to add new user

    // Write to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Error writing file" });
        } else {
            res.json({ message: "Success" });
        }
    });
})
.patch((req,res) => {
    // Update a User with ID
    res.json({message: "Update a User"})

}).delete((req,res) => {
    // Delete a User if exists
    res.json({message: "Delete a User"})

})


// const server = http.createServer(app);
// server.listen......

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`Express Server Started on PORT : ${PORT}`)
})