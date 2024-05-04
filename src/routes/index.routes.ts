
import { Router } from 'express';
import authenticationRouter from './authentication.routes';

const indexRouter = Router();

indexRouter.use(authenticationRouter);

export default indexRouter;