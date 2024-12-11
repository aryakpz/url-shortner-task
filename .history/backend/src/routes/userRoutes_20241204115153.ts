
import { create, getUser, postUser } from "../controllers/userControllers"
import { validationMiddleware } from "../middleware/validationMiddleware"
import { userSchema } from "../schemas/user.schema"


const express=require('express')

const userRoute =express.Router()
console.log("asdmcvsidbcj")

userRoute.get('/create',create)

userRoute.get('/get',getUser)

userRoute.post('/post',validationMiddleware(userSchema),postUser)

export default userRoute;