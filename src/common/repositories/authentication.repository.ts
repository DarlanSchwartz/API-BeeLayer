// Importando a instância do cliente Prisma e o tipo RegisterDTO
import prisma from '../database/databaseConfig';
import { RegisterDTO } from '../protocols/authentication.types';

// Definindo a classe AuthenticationRepository
export class AuthenticationRepository {

    // Método para registrar uma sessão de login
    async signIn(userId: number, token: string) {
        const result = await prisma.sessions.create({
            data: {
                token: token,
                user_id: userId
            }
        });
        return result;
    }

    // Método para registrar um novo usuário
    async signUp(data: RegisterDTO, walletAddress: string, walletId: string) {
        const result = await prisma.users.create({
            data: {
                cpf: data.cpf,
                password: data.password,
                email: data.email,
                walletAddress: walletAddress,
                walletId: walletId
            }
        });

        return result;
    }

    // Método para obter um usuário com base no CPF
    async getUserByCPF(cpf: string) {
        const result = await prisma.users.findUnique({
            where: {
                cpf: cpf
            }
        });

        return result;
    }

    async getUserById(id: number) {
        const result = await prisma.users.findUnique({
            where: {
                id: id
            }
        });

        return result;

    }


}
