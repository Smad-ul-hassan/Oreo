import dotenv from "dotenv";
import prisma from "../../config/db.js";
import bcrypt from "bcrypt";
dotenv.config();
export const signIn = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req?.body;
        const user = await prisma?.user?.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.', success: false });
        }
        const MatchPassword = await bcrypt.compare(password, user?.password);
        MatchPassword && res.status(200).json({ message: 'User logged in successfully.', data: { id: user?.id, email: user?.email, firstName: user?.firstName, lastName: user?.lastName, createdAt: user?.createdAt,  },success: true });
    }
    catch (error) {
        return res.status(500).json({
            message: "An error occur while singIn",
            data: error.message,
            success: false,
        })
    }
}