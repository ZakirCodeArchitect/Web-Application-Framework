const fs = require("fs");
const path = require("path");
const users = require("../MOCK_DATA.json");

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

    res.setHeader("Content-Type", "text/html");
    res.send(html);
};

// Get a specific user by ID
const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
};

// Create a new user
const createUser = (req, res) => {
    const body = req.body;
    const newUser = { id: users.length + 1, ...body };

    users.push(newUser);

    fs.writeFile(path.join(__dirname, "../MOCK_DATA.json"), JSON.stringify(users), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error writing file" });
        }
        res.status(201).json({ message: "User added successfully", newUser });
    });
};

// Update a user by ID
const updateUser = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = Object.assign(user, req.body);
    const index = users.indexOf(user);
    users[index] = updatedUser;

    fs.writeFile(path.join(__dirname, "../MOCK_DATA.json"), JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to write in file" });
        }
        res.status(200).json({ message: "User updated successfully", updatedUser });
    });
};

// Delete a user by ID
const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ message: "User does not exist" });
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    fs.writeFile(path.join(__dirname, "../MOCK_DATA.json"), JSON.stringify(users), (err) => {
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
    deleteUser
};
