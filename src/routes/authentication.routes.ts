import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema';
import AuthenticationController from '../controllers/authentication.controller';
import { LoginSchema, RegisterSchema } from '../schemas/authentication.schema';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateSchema(LoginSchema), AuthenticationController.signIn);
authenticationRouter.post('/sign-up', validateSchema(RegisterSchema), AuthenticationController.signUp);

export default authenticationRouter;