import { Router } from 'express';
import {
  getAll,
  getOne,
  postOne,
} from '../controllers/query.controller';
import articleValidation from '../validators/query.validator';

const queryRouter = Router();

queryRouter.post('/', articleValidation, postOne);
queryRouter.get('/', getAll);
queryRouter.get('/:id', getOne);

export default queryRouter;
