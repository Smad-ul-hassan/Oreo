import express, { Router } from "express"
import { Signup } from "../controller/user/signUp.js";
import { signIn } from "../controller/user/signIn.js";
import { resetPassword } from "../controller/user/resetPassword.js";
import { getAllUsers } from "../controller/user/allUsers.js";
import { sendOtp } from "../controller/user/sendOtp.js";
 
 const router=express.Router();
router.post('/register',Signup)
router.post('/signin',signIn)
router.patch('/reset',resetPassword)
router.get('/allUsers',getAllUsers)
router.patch('/sendOtp',sendOtp)
export default router



