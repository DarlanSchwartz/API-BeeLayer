import prisma from '../database/databaseConfig';
import { CardDTO } from '../protocols/card.types';

export class CardRepository {
    async registerCard(data: CardDTO, userId: number, hash: string) {
        const result = await prisma.user_cards.create({
            data: {
                type: data.type,
                validUntil: new Date(data.validUntil),
                userId: userId,
                hash: hash
            }
        });

        return result;
    }


}