
import { userModel, courseModel, adminModel, purchaseModel } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    // register logic

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.json({ message: "All Fields Required" });
    }
    const user = await adminModel.findOne({ email });

    if (user) {
        return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await adminModel.create({
        email,
        password: hashedPassword,
        name,
    });

    return res.json({
        message: "User registered successfully",
        userId: newUser._id,
    });

}
export const login = async (req, res) => {
    // login logic
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "Email and Password Required" });
    }

    const adminExist = await adminModel.findOne({ email });

    if (!adminExist) {
        return res.json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, adminExist.password);

    if (!passwordMatch) {
        return res.json({ message: "Password is incorrect" });
    }
    const token = jwt.sign(
        { id: adminExist._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    return res.json({
        message: "Login successful",
        token,
    });
}
export const getallcourse = async (req, res) => {
    // get all course logic
}
export const getcourse = async (req, res) => {
    // get course logic
}
export const updatecourse = async (req, res) => {
    // update course logic
}
export const deletecourse = async (req, res) => {
    // delete course logic
}
export const createcourse = async (req, res) => {
    // create course logic
}
