import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
});


const courseSchema = new Schema({
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true }
});

const adminSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
});

const purchaseSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    purchasedAt: { type: Date, default: Date.now }
});


export const userModel = mongoose.model("User", userSchema);
export const courseModel = mongoose.model("Course", courseSchema);
export const adminModel = mongoose.model("Admin", adminSchema);
export const purchaseModel = mongoose.model("Purchase", purchaseSchema);
