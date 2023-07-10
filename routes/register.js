import express, { Router } from "express"
import { Signup } from "../controller/user/signUp.js";
import { signIn } from "../controller/user/signIn.js";
 
 const router=express.Router();
router.post('/register',Signup)
router.post('/signin',signIn)
export default router



