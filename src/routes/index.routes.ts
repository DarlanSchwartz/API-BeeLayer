
import { Router } from 'express';
import authenticationRouter from './authentication.routes';
import cardRouter from './card.routes';

const indexRouter = Router();

indexRouter.use(authenticationRouter);
indexRouter.use(cardRouter);

export default indexRouter;