// Importando os tipos LoginDTO e RegisterDTO do protocolo de autenticação e os tipos CustomError e ErrorType do protocolo de erros
import { LoginDTO, RegisterDTO } from "../common/protocols/authentication.types";
import { CustomError, ErrorType } from "../common/protocols/error.types";

// Importando o repositório AuthenticationRepository do banco de dados
import { AuthenticationRepository } from "../common/repositories/authentication.repository";

// Importando a biblioteca jwt para gerar tokens JWT
import jwt from 'jsonwebtoken';

// Importando a biblioteca ethers.js
import { ethers } from 'ethers';

// Criando uma instância do repositório AuthenticationRepository
const Repository = new AuthenticationRepository();

// Definindo a chave secreta para assinar tokens JWT
const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret';

// Função assíncrona para fazer login de usuário
async function signIn(data: LoginDTO) {
    // Buscando o usuário no banco de dados pelo CPF
    const result = await Repository.getUserByCPF(data.cpf);

    // Verificando se o usuário foi encontrado
    if (!result) {
        // Se não foi encontrado, lança um erro de usuário não encontrado
        throw new CustomError(ErrorType.NOT_FOUND, "Usuário não existe");
    }

    // Verificando se o CPF e a senha fornecidos correspondem ao usuário encontrado
    if (result.cpf == data.cpf && result.password == data.password) {
        // Se correspondem, gera um token JWT para o usuário
        const userToken = jwt.sign(data, secret);

        // Registra o token de sessão no banco de dados para o usuário
        const loginResult = await Repository.signIn(result.id, userToken);

        // Retorna o token gerado
        return { token: loginResult.token };
    }

    // Se o CPF ou a senha estiverem incorretos, lança um erro de não autorizado
    throw new CustomError(ErrorType.UNAUTHORIZED, "Senha ou Cpf incorretas");
};

// Função assíncrona para registrar um novo usuário
async function signUp(data: RegisterDTO) {
    // Verifica se já existe um usuário cadastrado com o CPF fornecido
    const userHasAccount = await Repository.getUserByCPF(data.cpf);

    // Se já existir, lança um erro de conflito
    if (userHasAccount) {
        throw new CustomError(ErrorType.CONFLICT, "Usuário já cadastrado");
    }

    // TODO: Criar carteira do usuário e definir novo endereço


    // Registra o novo usuário no banco de dados
    const result = await Repository.signUp(data);

    // Retorna o resultado do registro
    return result;
};

// TODO:
// Função para criar uma carteira Ethereum
async function createWallet() {
    // Criando uma nova carteira
    const wallet = ethers.Wallet.createRandom();

    // Obtendo o endereço da carteira
    const address = wallet.address;

    // Retornando o objeto da carteira contendo a chave privada e o endereço
    return {
        privateKey: wallet.privateKey,
        address: address
    };
}

// Objeto contendo as funções de autenticação (signIn e signUp)
const AuthenticationService = {
    signIn,
    signUp
};

// Exportando o objeto AuthenticationService como o padrão deste módulo
export default AuthenticationService;
