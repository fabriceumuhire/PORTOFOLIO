import { Router } from 'express';
import {
  getAll,
  getOne,
  postOne,
  updateOne,
  deleteOne,
} from '../controllers/blog.controller';
import blogValidation from '../validators/blog.validator';
import {
  uploadImage,
  blogExists,
} from '../middlewares/image.middleware';
import { tokenAuth } from '../utils/auth.util';

const blogRouter = Router();

blogRouter.get('/', getAll);

blogRouter.post('/', tokenAuth, uploadImage, blogValidation, postOne);

blogRouter.get('/:id', getOne);

blogRouter.patch('/:id', tokenAuth, blogExists, updateOne);

blogRouter.delete('/:id', tokenAuth, blogExists, deleteOne);

export default blogRouter;
