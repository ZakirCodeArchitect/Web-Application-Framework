const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../Controllers/userController.js");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);        // No need for `:id` in POST, as it’s a new user
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
