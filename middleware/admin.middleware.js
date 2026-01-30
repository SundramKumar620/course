import jwt from "jsonwebtoken";

export const adminmiddleware = async (req, res, next) => {
    const token = req.headers.token

    if (!token) {
        return res.json({ message: "Unauthorized Access" })
    }
    try {
        const decoded = jsonwebtoken.verify(token, process.env.ADMIN_JWT_SECRET)

        if (!decoded) {
            return res.json({ message: "Unauthorized Access" })
        }
        req.adminId = decoded.id
        next()

    } catch (error) {

    }

}