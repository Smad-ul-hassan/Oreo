import dotenv from "dotenv";
import nodemailer from "nodemailer"
import otpGenerator from "otp-generator";
import prisma from "../../config/db.js";
import moment from "moment"
dotenv.config()
export const sendOtp = async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email)
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
      if (!user) {
        return res.status(400).json({ message: "User does not exist.", success: false });
      }
    //   console.log(user)
    // if(!user){
    //     return res.status(500).json(({message:"User does not exist.",success:false}))
    // }
    // const generateOtp=otpGenerator.generate(6,{digits:true,alphabets:false,upperCase:false,specialChars:false});
    // const otpExpiration= moment().add(1,"minute")
    // await prisma.user.update({
    //     where:{email},
    //     data:{
    //         otp:generateOtp,
    //         otpExpiration:otpExpiration
    //     }
    // })
    // const transporter = nodemailer.createTransport({
    //     service: 'Gmail', // Specify the email service provider (e.g., Gmail, Outlook, etc.)
    //     auth: {
    //       user: process.env.GMAIL, // Your email address
    //       pass: process.env.PASSWORD, // Your email password or an app-specific password
    //     },
    //   });

    // await transporter.sendMail({
    //     from: process.env.GMAIL,
    //     to: email,
    //     subject: 'OTP Verification',
    //     text: `Your OTP: ${generateOtp}`,
    //   });
      return res.status(200).json({message:"Otp sent to user.",success:true})
    }
    catch(error)
    {
        return res.status(500).json({message:"Something went wrong.",success:false})
    }

}