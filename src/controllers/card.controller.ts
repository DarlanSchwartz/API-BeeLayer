// Importando os tipos CardCheckDTO e CardDTO dos protocolos de cartão
import { CardCheckDTO, CardDTO } from './../common/protocols/card.types';

// Importando as classes Request e Response do Express
import { Request, Response } from 'express';

// Importando o módulo http-status para lidar com códigos de status HTTP
import httpStatus from 'http-status';

// Importando o serviço CardService
import CardService from '../services/card.service';

// Função assíncrona para lidar com o registro de um novo cartão
async function registerCard(req: Request, res: Response) {
    // Chamando o método registerCard do CardService, passando o corpo da requisição e o ID do usuário extraído do middleware
    const result = await CardService.registerCard(req.body as CardDTO, res.locals.userId);

    // Retornando uma resposta com o código de status OK (200)
    return res.status(httpStatus.CREATED).send(result);
}

// Função assíncrona para lidar com a verificação de um cartão
async function checkCard(req: Request, res: Response) {
    // Chamando o método checkCard do CardService, passando o corpo da requisição e o ID do usuário extraído do middleware
    const checkCardData = await CardService.checkCard(req.body as CardCheckDTO, res.locals.userId);

    // Retornando uma resposta com o código de status OK (200) e os dados da verificação do cartão
    return res.status(httpStatus.OK).send(checkCardData);
}

// Objeto contendo os controladores de cartão (registerCard e checkCard)
const CardController = { registerCard, checkCard };

// Exportando o objeto CardController como o padrão deste módulo
export default CardController;
