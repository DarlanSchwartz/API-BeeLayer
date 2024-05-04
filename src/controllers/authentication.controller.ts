import { Request, Response } from 'express';
import httpStatus from 'http-status';
import AuthenticationService from '../services/account-participants.service';
import { LoginDTO, RegisterDTO } from '../common/protocols/authentication.types';

async function signIn(req: Request, res: Response) {
    const result = await AuthenticationService.signIn(req.body as LoginDTO);
    return res.status(httpStatus.OK).send(result);
}

async function signUp(req: Request, res: Response) {
    await AuthenticationService.signUp(req.body as RegisterDTO);
    return res.status(httpStatus.CREATED).send("Criado");
}

const AuthenticationController = { signIn, signUp };

export default AuthenticationController;
