import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization) return res.status(400).json({ success: false, message: "authorization not provided"});
    try {
        const token = authorization.split(" ")[2]
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = { id }
        next()
    } catch(e) {
        return res.status(400).json({ success: false, message: `Internal Server Error: ${e.message}`})
    }
}

export default authMiddleware