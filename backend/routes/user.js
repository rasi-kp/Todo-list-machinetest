const express = require("express");
const router = express.Router();
const isAuthUser=require('../midleware/isAuthUser')
const{ loginUser,signUp, getAllAssignedTasks, updateTaskStatus }=require("../controller/user")

router.post("/login",loginUser),
router.post("/signup",signUp),
router.get('/tasks', isAuthUser, getAllAssignedTasks);
router.put('/tasks/:id/status', isAuthUser, updateTaskStatus);


module.exports=router;