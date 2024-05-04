// Importando as classes Request e Response do Express
import { Request, Response } from 'express';

// Importando o módulo http-status para lidar com códigos de status HTTP
import httpStatus from 'http-status';

// Importando o serviço AuthenticationService
import AuthenticationService from '../services/account-participants.service';

// Importando os tipos LoginDTO e RegisterDTO dos protocolos de autenticação
import { LoginDTO, RegisterDTO } from '../common/protocols/authentication.types';

// Função assíncrona para lidar com o login do usuário
async function signIn(req: Request, res: Response) {
    // Chamando o método signIn do AuthenticationService e aguardando o resultado
    const result = await AuthenticationService.signIn(req.body as LoginDTO);
    
    // Retornando uma resposta com o código de status OK (200) e o resultado do login
    return res.status(httpStatus.OK).send(result);
}

// Função assíncrona para lidar com o registro de um novo usuário
async function signUp(req: Request, res: Response) {
    // Chamando o método signUp do AuthenticationService e aguardando a conclusão
    await AuthenticationService.signUp(req.body as RegisterDTO);
    
    // Retornando uma resposta com o código de status CREATED (201)
    // e uma mensagem indicando que o registro foi criado com sucesso
    return res.status(httpStatus.CREATED).send("Criado");
}

// Objeto contendo os controladores de autenticação (signIn e signUp)
const AuthenticationController = { signIn, signUp };

// Exportando o objeto AuthenticationController como o padrão deste módulo
export default AuthenticationController;
