import { CardCheckDTO, CardDTO } from './../common/protocols/card.types';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import CardService from '../services/card.service';

async function registerCard(req: Request, res: Response) {
    await CardService.registerCard(req.body as CardDTO, res.locals.userId);
    return res.send(httpStatus.OK);
}

async function checkCard(req: Request, res: Response) {
    await CardService.checkCard(req.body as CardCheckDTO);
    return res.send(httpStatus.OK);
}



const CardController = { registerCard, checkCard };

export default CardController;
