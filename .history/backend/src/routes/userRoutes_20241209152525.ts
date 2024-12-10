import { getUser, loginUser, postUser } from "../controllers/userControllers"
import { userAuthentication } from "../middleware/userAuthentication"
import { validationMiddleware } from "../middleware/validationMiddleware"
import { userSchema } from "../schemas/user.schema"


const express=require('express')

const userRoute =express.Router()

userRoute.get('/get',getUser)

userRoute.post('/post',validationMiddleware(userSchema),postUser)

userRoute.post('/login',userAuthentication loginUser)

export default userRoute;




