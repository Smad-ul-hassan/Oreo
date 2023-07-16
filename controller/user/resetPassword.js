import dotenv from "dotenv";
import prisma from "../../config/db.js";
import bcrypt from "bcrypt";
dotenv.config();
export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist.", success: false });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await prisma.user.update({
      where: { email},
      data: { password: hashedPassword },
    });
    return res
      .status(200)
      .json({
        message: "Password reset successfull",
        data: {
          id: user?.id,
          email: user?.email,
          firstName: user?.firstName,
          lastName: user?.lastName,
          createdAt: user?.createdAt,
        },
        success: true,
      });
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong",
      data: error.message,
      success: false,
    });
  }
};
