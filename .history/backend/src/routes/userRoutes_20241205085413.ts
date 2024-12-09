import { create, getUser, postUser } from "../controllers/userControllers"
import { validationMiddleware } from "../middleware/validationMiddleware"
import { userSchema } from "../schemas/user.schema"


const express=require('express')

const userRoute =express.Router()

userRoute.get('/create',create)

userRoute.get('/get',getUser)

userRoute.post('/post',validationMiddleware(userSchema),postUser)

export default userRoute;




Typing  : [39wpm][91%]
Focus   : [09hr 36min][1261hr 55min]
CT      : [09hr 32min][1132hr 52min]
ACT     : [06hr 23min][1049hr 0min]
HTML    : [0][15420]
CSS     : [0][24620]
JSON    : [0][14731]
JS      : [344][30028]
Total   : [344][84869]
days    : #28