import express from "express"
const userRouter = express.Router()

import { register, login, getuserpurchase } from "../controller/user.controller.js"

userRouter.post("/register",register)
userRouter.post("/login", login)
userRouter.get("/purchase" ,getuserpurchase)

export default userRouter