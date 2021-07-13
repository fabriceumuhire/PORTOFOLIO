import { Router } from 'express';
import userRouter from './user.route';
import queryRouter from './query.route';
import blogRouter from './blog.route';
import commentRouter from './comment.route';

const indexRouter = Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/query', queryRouter);
indexRouter.use('/blogs', blogRouter);
indexRouter.use('/comments', commentRouter);

export default indexRouter;
