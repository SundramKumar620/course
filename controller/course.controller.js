import { userModel, purchaseModel } from "../db";

export const getallcourse = async (req, res) => {

    const courses = await courseModel.find({}).lean();

    return res.json({
        message: "All courses fetched successfully",
        courses
    });

}

export const perviewcourse = async (req, res) => {
    const courseid = req.params.courseid
    const userid = req.userId

    const course = await courseModel.findOne({ _id: courseid }).lean()

    if (!course) {
        return res.json({ message: "Course not found" })
    }
    return res.json({
        message: "Course fetched successfully",
        course
    })

}
export const buycourse = async (req, res) => {

    const courseid = req.params.courseid
    const userid = req.userId

    const user = await userModel.findOne({ _id: userid }).lean()

    if (!user) {
        return res.json({ message: "User not found" })
    }

    const course = await courseModel.findOne({ _id: courseid }).lean()

    if (!course) {
        return res.json({ message: "Course not found" })
    }

    const alreadyPurchased = await purchaseModel.findOne({ userid, courseid }).lean()

    if (alreadyPurchased) {
        return res.json({ message: "Course already purchased" })
    }

    const purchase = await purchaseModel.create({
        userid,
        courseid
    })
    return res.json({
        message: "Course purchased successfully",
        purchaseId: purchase._id
    })



}