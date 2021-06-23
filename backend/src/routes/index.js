import { Router } from 'express';
import userRouter from './user.route';
import queryRouter from './query.route';

const indexRouter = Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/query', queryRouter);

export default indexRouter;
