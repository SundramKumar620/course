import { userModel, courseModel, adminModel, purchaseModel } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

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
        process.env.ADMIN_JWT_SECRET,
        { expiresIn: "7d" }
    );
    return res.json({
        message: "Login successful",
        token,
    });
}
export const getallcourse = async (req, res) => {
    const creatorid = req.body.adminid

    const courses = await courseModel.find({ creatorid })

    return res.json({
        message: "Courses fetched successfully",
        courses
    })
}

export const getcourse = async (req, res) => {

    const courseid = req.params.courseid
    const creatorid = req.body.adminid

    const course = await courseModel.findOne({ _id: courseid, creatorid })

    return res.json({
        message: "Course fetched successfully",
        course
    })
}

export const updatecourse = async (req, res) => {
    // update course logic
    const { title, description, price, thumbnail } = req.body
    const courseid = req.params.courseid
    const creatorid = req.body.adminid

    if (!title || !description || !price || !thumbnail || !courseid) {
        return res.json({ message: "All fields required" })
    }

    const course = await courseModel.updateOne({ _id: courseid, creatorid }, {
        title,
        description,
        price,
        thumbnail
    })

    return res.json({
        message: "Course updated successfully",
        courseId: courseid
    })

}
export const deletecourse = async (req, res) => {

    const courseid = req.params.courseid
    const creatorid = req.body.adminid

    const course = await courseModel.deleteOne({ _id: courseid, creatorid })

    return res.json({
        message: "Course deleted successfully",
        courseId: courseid
    })
}
export const createcourse = async (req, res) => {

    const { title, description, price, thumbnail } = req.body
    const creatorid = req.body.adminid

    if (!title || !description || !price || !thumbnail || !creatorid) {
        return res.json({ message: "All fields required" })
    }
    const courseExist = await courseModel.findOne({ title })

    if (courseExist) {
        return res.json({ message: "Course already exists" })
    }

    const newCourse = await courseModel.create({
        title,
        description,
        price,
        thumbnail,
        creatorid
    })

    return res.json({
        message: "Course created successfully",
        courseId: newCourse._id
    })


}
