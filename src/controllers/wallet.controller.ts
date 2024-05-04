// Importando as classes Request e Response do Express
import { Request, Response } from 'express';

// Importando o módulo http-status para lidar com códigos de status HTTP
import httpStatus from 'http-status';

// Importando o tipo WalletDTO do protocolo de carteira
import { WalletDTO } from '../common/protocols/wallet.types';

// Importando o serviço WalletService
import WalletService from '../services/wallet.service';

// Função assíncrona para lidar com a criação de uma nova carteira
async function createWallet(req: Request, res: Response) {
    // Chamando o método createWallet do WalletService, passando o corpo da requisição
    await WalletService.createWallet(req.body as WalletDTO);
    
    // Retornando uma resposta com o código de status OK (200)
    return res.send(httpStatus.OK);
}

// Objeto contendo o controlador de carteira (createWallet)
const WalletController = { createWallet };

// Exportando o objeto WalletController como o padrão deste módulo
export default WalletController;
