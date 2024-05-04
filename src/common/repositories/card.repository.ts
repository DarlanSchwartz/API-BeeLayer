// Importando a instância do cliente Prisma e o tipo CardDTO
import prisma from '../database/databaseConfig';
import { CardDTO } from '../protocols/card.types';

// Definindo a classe CardRepository
export class CardRepository {

    // Método para registrar um novo cartão para um usuário
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

    // Método para encontrar um cartão de usuário com base no hash
    async findUserCardByHash(userId: number, hash: string) {
        const result = await prisma.user_cards.findFirst({
            where: {
                userId: userId,
                hash: hash
            }
        });

        return result;
    }

}
