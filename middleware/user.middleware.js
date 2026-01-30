import jwt from "jsonwebtoken";
export const usermiddleware = async (req, res, next) => {

    const token = req.headers.token
    
    try {

        const decoded = jwt.verify(token, process.env.USER_JWT_SECRET)

        if (!decoded) {
            return res.json({ message: "Unauthorized Access" })
        }
        req.userId = decoded.id
        next()

    } catch (error) {

    }


}
