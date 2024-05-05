// Importando a instância do cliente Prisma e o tipo CardDTO
import prisma from '../database/databaseConfig';

// Definindo a classe CardRepository
export class CardRepository {
    async registerCard(userId: number, hash: string) {
        const result = await prisma.user_cards.create({
            data: {
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
