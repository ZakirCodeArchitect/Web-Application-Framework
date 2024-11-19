const fs = require("fs");
const path = require("path");
const users = require("../MOCK_DATA.json");

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
const getAllUsers = (req, res) => {
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
            ${users
                .filter((user) => user.email.endsWith('.com'))
                .map((user) => 
                    `<tr>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>${user.email}</td>
                    </tr>`
                ).join("")}
            </tbody>
        </table>
    `;

    res.setHeader("Content-Type", "text/html");
    res.send(html);
};

// Get a specific user by ID
const getUserById = (req, res) => {
    res.json(req.user); // Respond with the user from middleware
};

// Create a new user
const createUser = (req, res) => {
    const body = req.body;

    if (!body.first_name || !body.last_name || !body.email) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = { id: users.length + 1, ...body };
    users.push(newUser);

    fs.writeFile(path.join(__dirname, "../MOCK_DATA.json"), JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error writing to file" });
        }
        res.status(201).json({ message: "User added successfully", newUser });
    });
};

// Update a user by ID
const updateUser = (req, res) => {
    const updatedUser = { ...req.user, ...req.body };
    const index = users.findIndex(user => user.id === req.user.id);

    users[index] = updatedUser;

    fs.writeFile(path.join(__dirname, "../MOCK_DATA.json"), JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error writing to file" });
        }
        res.status(200).json({ message: "User updated successfully", updatedUser });
    });
};

// Delete a user by ID
const deleteUser = (req, res) => {
    const index = users.findIndex(user => user.id === req.user.id);

    users.splice(index, 1);

    fs.writeFile(path.join(__dirname, "../MOCK_DATA.json"), JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error writing to file" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    });
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
