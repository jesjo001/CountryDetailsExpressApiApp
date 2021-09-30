import express from 'express';
import { userValidationRules, validate } from '../../middlewares/validation/validator'

import { userLogin } from "../../controllers/user/userLogin"
import { registerUser } from "../../controllers/user/useRegister"


const UserRouter = express.Router();

UserRouter.post('/login', userLogin)
UserRouter.post('/register', userValidationRules(), validate, registerUser)

export default UserRouter;