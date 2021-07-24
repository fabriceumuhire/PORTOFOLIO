import { Router } from 'express';
import postOne from '../controllers/comment.controller';
import commentValidation from '../validators/comment.validator';

const commentRouter = Router();

commentRouter.post('/:id', commentValidation, postOne);

export default commentRouter;
