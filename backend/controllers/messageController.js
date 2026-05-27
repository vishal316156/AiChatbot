
import Chat from "../models/chat.js"
import User from "../models/User.js"
import Imagekit from "../configs/imageKit.js"
import openai from "../configs/openai.js"


export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id

        if (req.user.credits < 1) {
            return res.json({
                success: false,
                message: "you dont have enough credit to use this feature"
            })
        }
        const { chatId, prompt } = req.body

        const chat = await Chat.findOne({
            userId,
            _id: chatId
        })

        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        })

        const response = await gemini.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        })
        const reply = {
            role: "assistant",
            content: response.text,
            timestamp: Date.now(),
            isImage: false
        }

        if (chat.name === "New Chat") {
        const titleResponse =
            await gemini.models.generateContent({
                model: "gemini-2.5-flash",
                contents:
                    `Generate a short 3 to 5 word chat title for: ${prompt}`
            })
        chat.name = titleResponse.text.trim()
    }
   
        res.json({
            success: true,
            reply
        })
  
        chat.messages.push(reply)
        await chat.save()
      
        await User.updateOne(
            { _id: userId },
            { $inc: { credits: -1 } }
        )
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id
  
        if (req.user.credits < 2) {
            return res.json({
                success: false,
                message: "you dont have enough credit to use this feature"
            })
        }
        const { prompt, chatId, isPublished } = req.body

        const chat = await Chat.findOne({
            userId,
            _id: chatId
        })
    
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        })
     
        const encodedPrompt = encodeURIComponent(prompt)
   
        const generatedImageUrl =
            `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/AiChatbot/${Date.now()}.png?tr=w-800,h-800`

        console.log(generatedImageUrl)
   
        const aiImageResponse = await fetch(generatedImageUrl)
        if (!aiImageResponse.ok) {

            return res.json({
                success: false,
                message: `ImageKit Error ${aiImageResponse.status}`
            })
        }
       
        const arrayBuffer = await aiImageResponse.arrayBuffer()
        
        const base64Image =
            `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`

    
        const uploadResponse = await Imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "AiChatbot"
        })
        const reply = {
            role: "assistant",
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished
        }
  
        res.json({
            success: true,
            reply
        })

        chat.messages.push(reply)
        await chat.save()

        await User.updateOne(
            { _id: userId },
            { $inc: { credits: -2 } }
        )
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}