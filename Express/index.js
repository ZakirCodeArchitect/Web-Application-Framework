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
    
    Lecture : 10

    REST Architecture

    REST - Representational State Transfer
    
        - an architectual style that provides standards to communicate b/w computer systems.

        1. Separate API's into logical resources (must be Noun)-> an object  or representation which has data associated with it.
        2. Expose structure resource-based URL
        3. http methods 
            -> GET/api/users/1 , GET/users , GET/api/users |-> Read in CRUD
            -> POST/api/users |-> Create in CRUD  ( POST = Verb, /api/users = Noun )
            -> PUT/api/users/id -> if we have to update everything |-> Update
            -> PATCH/api/users/id -> if we have to update only one thing of the data e.g just email. |-> Update
            -> DELELTE/api/users/id -> to delete any user |-> Delete in CRUD

            GraphQL API -> only one API endpoint
    
        4. JSON Data:
            [{id=1,hostname="",..... }, { }, ...]

        JSEND JSON Data:
            - Can pass object within an object. 
            - {
                "states": "success/Failure" //used here res.json({success})
                "data": {[{ },{ },{ }]}
                }

        5. API must be state-less:
            - All state is handled on the client side. e.g what is next page. 1,2,3,4, next page.
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
.patch((req, res) => {
    // Get the user ID from the request parameters
    const id = Number(req.params.id);

    // Find the user with the specified ID
    const user = users.find((user) => user.id === id);

    // Check if the user exists
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Get the index of the user in the users array
    const index = users.indexOf(user);

    // Update the user data
    const updatedUser = Object.assign(user, req.body);

    // Replace the user at the specified index with the updated data
    users[index] = updatedUser;

    // Write the updated users array to the file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(400).json({ message: "Failed to write in file" });
        }
        console.log(updatedUser)
        res.status(200).json({ message: "Successfully written in file", updatedUser });
    });

}).delete((req,res) => {
    // Delete a User if exists

    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if(!user)
    {
        res.status(404).json("User doesnot Exist")
    }
    const index = users.indexOf(user);

    users.splice(index, 1); // deleting only that id

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if(err)
        {
            res.status(400).json("Error writing in File")
        }

        res.status(200).json("File Deleted Successfully")
    })

})


// const server = http.createServer(app);
// server.listen......

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`Express Server Started on PORT : ${PORT}`)
})

