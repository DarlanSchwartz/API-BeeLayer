import prisma from '../database/databaseConfig';
import { RegisterDTO } from '../protocols/authentication.types';

export class AuthenticationRepository {
    async signIn(userId: number, token: string) {
        const result = await prisma.sessions.create({
            data: {
                token: token,
                user_id: userId
            }
        });
        return result;
    }

    async signUp(data: RegisterDTO) {
        const result = await prisma.users.create({
            data: {
                cpf: data.cpf,
                password: data.password,
                walleAddress: "invalid",
            }
        });

        return result;
    }

    async getUserByCPF(cpf: string) {
        const result = await prisma.users.findUnique({
            where: {
                cpf: cpf
            }
        });

        return result;
    }
}