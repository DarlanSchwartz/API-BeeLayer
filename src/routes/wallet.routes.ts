import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema';
import validateAuth from '../middlewares/validateAuth';
import WalletController from '../controllers/wallet.controller';
import { CreateWalletSchema } from '../schemas/wallet.schemas';

const walletRouter = Router();

walletRouter.post('/create-wallet', validateSchema(CreateWalletSchema), validateAuth, WalletController.createWallet);

export default walletRouter;