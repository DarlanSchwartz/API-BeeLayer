import { LoginDTO, RegisterDTO } from "../common/protocols/authentication.types";
import { CustomError, ErrorType } from "../common/protocols/error.types";
import { AuthenticationRepository } from "../common/repositories/bankAccount.repository";
import jwt from 'jsonwebtoken';


const Repository = new AuthenticationRepository();
const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret';
async function signIn(data: LoginDTO) {
    const result = await Repository.getUserByCPF(data.cpf);
    if (!result) {
        throw new CustomError(ErrorType.NOT_FOUND, "Usuário não existe");
    }

    if (result.cpf == data.cpf && result.password == data.password) {
        const userToken = jwt.sign(data, secret);
        const loginResult = await Repository.signIn(result.id, userToken);
        return { token: loginResult.token };
    }

    throw new CustomError(ErrorType.UNAUTHORIZED, "Senha ou Cpf incorretas");
};

async function signUp(data: RegisterDTO) {
    const userHasAccount = await Repository.getUserByCPF(data.cpf);
    if (userHasAccount) {
        throw new CustomError(ErrorType.CONFLICT, "Usuário ja cadastrado");
    }
    // TODO: create user wallet and set new address

    const result = await Repository.signUp(data);
    return result;

};

const AuthenticationService = {
    signIn,
    signUp
};

export default AuthenticationService;