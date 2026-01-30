import { userModel, courseModel, adminModel, purchaseModel } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.json({ message: "All Fields Required" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
        return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        email,
        password: hashedPassword,
        name,
    });

    return res.json({
        message: "User registered successfully",
        userId: newUser._id,
    });
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "Email and Password Required" });
    }

    const userExist = await userModel.findOne({ email });

    if (!userExist) {
        return res.json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (!passwordMatch) {
        return res.json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
        { id: userExist._id },
        process.env.USER_JWT_SECRET,
        { expiresIn: "7d" }
    );

    return res.json({
        message: "Login successful",
        token,
    });
};


export const getUserPurchase = async (req, res) => {
  const userid = req.userId;

  const purchases = await purchaseModel
    .find({ user: userid })
    .populate("course");

  return res.json({
    message: "Purchases fetched successfully",
    purchases
  });
};
