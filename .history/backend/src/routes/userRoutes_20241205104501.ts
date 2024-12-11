import { create, getUser, postUser } from "../controllers/userControllers"
import { validationMiddleware } from "../middleware/validationMiddleware"
import { userSchema } from "../schemas/user.schema"


const express=require('express')

const userRoute =express.Router()

userRoute.get('/create',create)

userRoute.get('/get',getUser)

userRoute.post('/post',validationMiddleware(userSchema),postUser)

userRoute.post('/login',loginUser)

export default userRoute;




