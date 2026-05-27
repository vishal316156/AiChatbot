
import express from "express";
import { getPublishedImages, getuser, loginuser, registeruser } from "../controllers/userController.js"
import { protect } from "../middlewares/auth.js";
import { getDashboardData } from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.post('/register', registeruser)
userRouter.post('/login', loginuser)
userRouter.get('/data',protect, getuser)
userRouter.get('/published-images',getPublishedImages)
userRouter.get( "/dashboard", protect, getDashboardData)

export default userRouter
