import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { RegisterCardSchema } from '../schemas/card.schemas';
import CardController from '../controllers/card.controller';
import validateAuth from '../middlewares/validateAuth';

const cardRouter = Router();

cardRouter.post('/register-card', validateSchema(RegisterCardSchema), validateAuth, CardController.registerCard);

export default cardRouter;