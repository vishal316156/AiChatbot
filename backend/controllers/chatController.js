import Chat from "../models/chat.js"
import openai from "../configs/openai.js"

export const createChat = async (req, res) => {
    try {
        const userId = req.user._id.toString()
        const newChat = await Chat.create({
            userId,
            userName: req.user.name,
            name: "New Chat",
            messages: []
        })
        res.json({
            success: true,
            chat: newChat
        })
    } catch (error) {

        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getChats = async (req, res) => {
    try {
        const userId = req.user._id
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 })
        res.json({
            success: true,
            chats
        })
    } catch (error) {

        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteChats = async (req, res) => {
    try {
        const userId = req.user._id
        const { chatId } = req.body
        await Chat.deleteOne({ _id: chatId, userId })
        res.json({
            success: true,
            message: "Chat Deleted"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const generateResponse = async (req, res) => {
    try {
        const { chatId, prompt } = req.body
        const chat = await Chat.findById(chatId)
        if (!chat) {
            return res.json({
                success: false,
                message: "Chat not found"
            })
        }
        const userMessage = {
            role: "user",
            content: prompt,
            isImage: false,
            timestamp: Date.now()
        }
        chat.messages.push(userMessage)
        const completion = await openai.chat.completions.create({
            model: "openai/gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
        const text = completion.choices[0].message.content

        const aiMessage = {
            role: "assistant",
            content: text,
            isImage: false,
            timestamp: Date.now()
        }
        chat.messages.push(aiMessage)

        req.user.credits -= 1

        await req.user.save()

        await chat.save()

        res.json({
            success: true,
            message: aiMessage
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}