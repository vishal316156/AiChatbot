import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import paymentRouter from "./routes/paymentRoutes.js"

const app = express()

await connectDB()




app.use(cors())
app.use(express.json())


app.get('/' , (req, res)=> (res.send('server is Live!')))
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)
app.use("/api/payment", paymentRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


