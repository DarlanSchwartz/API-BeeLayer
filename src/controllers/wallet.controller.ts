import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { WalletDTO } from '../common/protocols/wallet.types';
import WalletService from '../services/wallet.service';

async function createWallet(req: Request, res: Response) {
    await WalletService.createWallet(req.body as WalletDTO);
    return res.send(httpStatus.OK);
}

const WalletController = { createWallet };

export default WalletController;
