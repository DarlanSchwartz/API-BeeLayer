import prisma from '../database/databaseConfig';
import { WalletDTO } from '../protocols/wallet.types';

export class WalletRepository {
    async createWallet(data: WalletDTO) {
       /* const result = await prisma.user_cards.create({
          data: {
               type: data.type,
            validUntil: new Date(data.validUntil),
            }
        });*/

        return "teste";
    }

}