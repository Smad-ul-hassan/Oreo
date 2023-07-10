import dotenv from "dotenv";
import prisma from "../../config/db.js";
import bcrypt from "bcrypt";
dotenv.config();

export const Signup = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
      return res
        .status(400)
        .send({ message: "Incomplete user information", success: false });
    }
    const userExist= await prisma.User.findUnique({
        where:{
            email:email,
        }
    })
    if(userExist)
    {
        return res.status(409).json({ error: 'Email is already taken.',success:false });
    }
    const hashedPassword= await bcrypt.hash(password, 10, );
    const register = await prisma.User.create({
      data: {
        email,
        firstName,
        lastName,
        password:hashedPassword,
      },
    });
    res.json({
      id: register.id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      createdAt: register?.createdAt,
      success:true
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
      data: error.message,
      success: false,
    });
  }
};
