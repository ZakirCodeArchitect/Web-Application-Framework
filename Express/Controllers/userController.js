const fs = require("fs");
const path = require("path");
// const users = require("../MOCK_DATA.json");
const user = require("../Models/userModel") 

const pathFile = path.join(__dirname, '../public/home.html');


// Middleware to fetch user by ID

const hello = (req, res, next, value) => {
    const userId = Number(value); // Ensure ID is a number
    console.log(`UserId value: ${userId}`);

    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach the user object to the request
    next();
};

// Get all users and display them in an HTML table
const getAllUsers = async (req, res) => {
    // try{
    //     const users = await user.find();
    //     return res.status(200).json({
    //         message: "Retrieved Data",
    //         // numOfUsers: users.length,
    //         data: {users}
    //     })
    // }catch(err)
    // {
    //     return res.status(204).json({
    //         status: 'failure',
    //         msg: err.message
    //     })
    // }

    // res.send("Srever side rendering")
    // res.sendFile(pathFile)

    // const products = product.find();

    // User object with name
//   const user = { name: "zakir" };
try {
    // Fetch all users from the database
    const data = await user.find();

    // Render the "home.ejs" template with the fetched user data
    res.render("home", { users: data });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
    try
    {
        const result = await user.findByID(req.params.id)    // searching from the database that object.
        res.status(200).json({
            status: '200',
            msg: "Specific ID User successfully retrived",
            data: {result}
        })
    }catch(err)
    {
        res.status(204).json({
            status: 'failure',
            msg: err.message
        })
    }
};

// Create a new user
const createUser = async (req, res) => {
    // const newUser = new user({
    //     first_name: "Zakir",
    //     last_name: "Matloob",
    //     email: "zakir@gmail.com",
    //     gender: "male"
    // });

    // newUser.save()
    //     .then((doc) => {
    //         console.log(doc);
    //         return res.status(200).json({
    //             message: "Successfully written",
    //             data: doc // Return the saved document, not the `newUser` instance
    //         });
    //     })
    //     .catch((err) => {
    //         console.error(err); // Log the error for debugging
    //         return res.status(500).json({
    //             message: "Error occurred while saving user",
    //             error: err.message // Return the error message
    //         });
    //     });

    // because of this, data is automatically getting inserted

       
    const { first_name, last_name, email, gender } = req.body;

    // Validate the required field
    if (!first_name) {
      return res.status(400).json({
        message: "First name is required",
      });
    }

    // Create a new user in the database
    user.create({
      first_name,
      last_name,
      email,
      gender,
    }).then((doc) => {
          console.log("Inserted Document:", doc);
          res.status(201).json({
            message: "Your data has been inserted successfully",
            user: doc, // Optionally return the created user object
          });
        }).catch((err) => {
          console.error("Error inserting data:", err);
          res.status(500).json({
            message: "An error occurred while inserting data",
            error: err.message,
          });
        });
    
};


// Update a user by ID
const updateUser = (req, res) => {
    
};

// Delete a user by ID
const deleteUser = (req, res) => {
    
};

// Export all functions
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    hello    
};
