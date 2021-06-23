import { Router } from 'express';
import articleValidation from '../validators/query.validator';

const queryRouter = Router();

// router.get('/', getUser);

queryRouter.post('/', articleValidation);

// router.post('/login', Authenticate, loginUser);

export default queryRouter;
