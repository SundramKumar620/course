import express from 'express';
import userRouter from './routes/user.routes.js';
import courseRouter from './routes/course.routes.js';
import adminRouter from './routes/admin.routes.js';


const app = express()
const port = 3000

app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)


app.listen(port, () => {
    console.log(`backend is running port${port}`)
})