import prisma from '../database/databaseConfig';
import { CardDTO } from '../protocols/card.types';

export class CardRepository {
    async registerCard(data: CardDTO) {
        const result = await prisma.user_cards.create({
            data: {
                type: data.type,
                validUntil: data.validUntil,
                userId: 1,
                hash : "jdf"
            }
        });

        return result;
    }

    
}