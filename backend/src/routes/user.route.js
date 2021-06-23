import { Router } from 'express';
import { Authenticate } from '../middlewares/user.middleware';
import {
  getUser,
  registerUser,
  loginUser,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', getUser);

userRouter.post('/register', registerUser);

userRouter.post('/login', Authenticate, loginUser);

export default userRouter;
