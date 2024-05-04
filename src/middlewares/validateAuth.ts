// Importando os tipos NextFunction, Request e Response do Express
import { NextFunction, Request, Response } from "express";

// Importando a instância do cliente Prisma
import prisma from "../common/database/databaseConfig";

// Importando o tipo CustomError e ErrorType do protocolo de erros
import { CustomError, ErrorType } from "../common/protocols/error.types";

// Middleware para validar a autenticação do usuário
export default async function validateAuth(req: Request, res: Response, next: NextFunction) {
    // Obtendo o cabeçalho de autorização da requisição
    const authorization = req.headers.authorization;

    // Extraindo o token do cabeçalho de autorização
    const token = authorization?.replace("Bearer ", "");

    // Verificando se o token está presente na requisição
    if (!token) {
        // Se não estiver presente, lança um erro de autenticação personalizado
        throw new CustomError(ErrorType.UNAUTHORIZED, "Token not found");
    }

    // Buscando a sessão associada ao token no banco de dados
    const session = await prisma.sessions.findFirst({ where: { token } });

    // Verificando se a sessão foi encontrada
    if (!session) {
        // Se a sessão não foi encontrada, lança um erro de autenticação personalizado
        throw new CustomError(ErrorType.UNAUTHORIZED, "Session not found");
    }

    // Se a sessão foi encontrada, define o ID do usuário associado à sessão nos dados locais da resposta
    res.locals.userId = session.user_id;

    // Chama o próximo middleware na cadeia de middleware
    next();
}
