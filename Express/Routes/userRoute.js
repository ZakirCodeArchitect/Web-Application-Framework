const express = require("express");
const router = express.Router();
// const {
//     chkID,
//     getAllUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser,
// } = require("../Controllers/userController.js");
const userController=require("./../Controllers/userController.js")

router.param('id', userController.hello);
console.log(userController.hello);


router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);        
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
