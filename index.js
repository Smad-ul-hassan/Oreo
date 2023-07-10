import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { Signup } from './controller/user/signUp.js';
import router from './routes/register.js';
dotenv.config();
const app=express()
app.use(express.json())
const port =process.env.PORT;

app.use("/user", router);

app.listen(port,()=>console.log(`Project running on port ${port}`))