import express from "express"
const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.post("/login", login)
userRouter.get("/purchase" ,getuserpurchase)

export default userRouter