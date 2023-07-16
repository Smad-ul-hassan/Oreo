import dotenv from "dotenv"
import prisma from "../../config/db.js";
dotenv.config()
export const getAllUsers= async (req,res)=>{
    try{
    const users= await prisma.user.findMany();
    return res.status(200).json({users,success:true})
    }
    catch(error)
    {
        return res.status(500).send({
            message: "Something went wrong",
            data: error.message,
            success: false,
          });
    }
}