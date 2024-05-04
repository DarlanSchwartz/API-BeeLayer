import prisma from '../database/databaseConfig';
import { LoginDTO, RegisterDTO } from '../protocols/authentication.types';

export class AuthenticationRepository {
    async signIn(data: LoginDTO) {

    }

    async signUp(data: RegisterDTO) {
        const result = await prisma.users.create({
            data: {
                cpf: data.cpf,
                password: data.password,
                walleAddress: "32894237948xx1289123j49894h124",
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