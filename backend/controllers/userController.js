import User from "../models/User.js"
import JWT from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import Chat from "../models/chat.js"


 const generateToken = (id)=>{
    return JWT.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
 }

export const registeruser = async (req, res)=>{
    const {name, email, password} = req.body;
    try {
        const userExist = await User.findOne({email})
        if(userExist){
            return res.json({success: false, message: "User already exists"})
        }
        const user = await User.create({name, email, password})

        const token = generateToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}

export const loginuser = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if(user){
            const isMatch = await bcrypt.compare(password,user.password)
            if(isMatch){
                const token = generateToken(user._id)
                return res.json({success:true, token})

            }
        }
        return res.json({success:false, message: "Invalid email or password"})
    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}

export const getuser = async (req, res)=>{
    try {
        const user = req.user;
        return res.json({success:true, user})
    } catch (error) {
         return res.json({success:false, message: error.message})
    }
}

export const getPublishedImages = async(req, res)=>{
    try {
        const publishedImageMessages = await Chat.aggregate([
            {$unwind: "$messages"},
            {
                $match: {
                    "messages.isImage": true,
                    "messages.isPublished": true
                    
                }
            }, 
            {
                $project: {
                    _id: 0,
                    imageUrl : "$messages.content",
                    userName: "$userName"
                }
            }
        ])
        res.json({
            success: true, images: publishedImageMessages.reverse()
        })
    } catch (error) {
        return res.json({success:false , message: error.message});
    }
} 

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id
        const chats = await Chat.find({ userId })
        const totalChats = chats.length
        let totalMessages = 0
        let totalImages = 0
        chats.forEach(chat => {
            totalMessages += chat.messages.length
            chat.messages.forEach(message => {
                if (message.isImage) {
                    totalImages++
                }
            })
        })
        res.json({
            success: true,
            dashboardData: {
                totalChats,
                totalMessages,
                totalImages,
                credits: req.user.credits
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


