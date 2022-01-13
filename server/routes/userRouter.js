import { Router } from 'express'
import { register, signIn } from '../controllers/userControllers.js'



const userRouter = Router()


userRouter.post("/register", register)

userRouter.post("/signIn", signIn)



export default userRouter