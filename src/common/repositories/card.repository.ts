import prisma from '../database/databaseConfig';

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