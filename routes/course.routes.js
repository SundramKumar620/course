import express from "express"
const courseRouter = express.Router()

courseRouter.get("/", getallcourse)
courseRouter.get("/perview", perviewcourse)
courseRouter.post("/buy", buycourse)

export default courseRouter