import express from "express"
const courseRouter = express.Router()

import { getallcourse, perviewcourse, buycourse } from "../controller/course.controller.js"

courseRouter.get("/", getallcourse)
courseRouter.get("/perview", perviewcourse)
courseRouter.post("/buy", buycourse)

export default courseRouter