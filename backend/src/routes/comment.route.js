import { Router } from 'express';
import { getAll, postOne } from '../controllers/comment.controller';
import commentValidation from '../validators/comment.validator';

const commentRouter = Router();

commentRouter.post('/:id', commentValidation, postOne);
commentRouter.get('/:id', getAll);

export default commentRouter;
