import { Router } from 'express';
import {
  Authenticate,
  emailExist,
} from '../middlewares/user.middleware';
import { registerValidation } from '../validators/user.validator';
import {
  getUser,
  registerUser,
  loginUser,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', getUser);

userRouter.post(
  '/register',
  registerValidation,
  emailExist,
  registerUser,
);

userRouter.post('/login', Authenticate, loginUser);

export default userRouter;
