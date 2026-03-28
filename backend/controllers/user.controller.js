import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotevn from 'dotenv'
import User from '../models/user.model.js'

dotevn.config()


export const signup = async (req, res) => {
    const {  email, password} = req.body
    if(!email || !password) return res.status(400).json({success: false, message:"Missing required fields"});
    const foundUser = await User.findOne({email: email})
    if(foundUser) return res.status(400).json({ success: false, message: "Email Already registered"});
    try {
        const hash = await bcrypt.hash(password, 10)
        const newUser = new User({email: email, password: hash})
        await newUser.save()
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, { expiresIn: "2d"})
        return res.status(201).json({ success: true, message: "signed up", token: token})
    } catch(e) {
        return res.status(500).json({ success: false, message:`Internal Server Error: ${e.message}`})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) return res.status(400).json({ success: false, message: "Missing required fields"});
    try {
        const foundUser = await User.findOne({email: email})
        if(!foundUser) return res.status(404).json({ success: false, message:"Email not registered"});
        const isMatch = await bcrypt.compare(password, foundUser.password)
        if(!isMatch) return res.status(401).json({ success: false, message: "Wrong Password or Email"});
        const token = jwt.sign({id: foundUser._id}, process.env.JWT_SECRET, {expiresIn: "2d"})
        return res.status(200).json({ success: true, message: "logged in", token: token, mathc: isMatch})
    }
    catch(e) {
        return res.status(500).json({ success: false, message: `Internal Server Error: ${e.message}`})
    }

}