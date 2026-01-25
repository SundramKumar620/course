import express from "express"
const adminRouter = express.Router()

adminRouter.post("/register", register)
adminRouter.post("/login", login)
adminRouter.post("/create-course", createcourse)
adminRouter.get("/all-courses", getallcourses)
adminRouter.get("/course/:id", getcourse)
adminRouter.put("/update-course/:id", updatecourse)
adminRouter.delete("/delete-course/:id", deletecourse)

export default adminRouter