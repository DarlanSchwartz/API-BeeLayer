// Importando o módulo http-status para lidar com códigos de status HTTP
import httpStatus from "http-status";

// Importando os tipos NextFunction, Request e Response do Express, e AxiosError do Axios
import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";

// Importando o tipo ErrorType do protocolo de erros
import { ErrorType } from "../common/protocols/error.types";

// Função middleware de tratamento de erros
export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    // Verificando se o erro é uma instância de AxiosError (erro de requisição HTTP)
    if (error instanceof AxiosError) {
        // Se for, retorna uma resposta com o status da resposta HTTP recebida e os dados da resposta
        return res.status(error?.status || 400).send(error?.response?.data);
    }

    // Caso contrário, trata o erro de acordo com seu tipo
    switch (error.type) {
        case ErrorType.CONFLICT:
            // Se for do tipo CONFLICT, retorna uma resposta com o status 409 (conflito) e a mensagem de erro
            return res.status(httpStatus.CONFLICT).send(error.message);
        case ErrorType.NOT_FOUND:
            // Se for do tipo NOT_FOUND, retorna uma resposta com o status 404 (não encontrado) e a mensagem de erro
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        case ErrorType.UNPROCESSABLE:
            // Se for do tipo UNPROCESSABLE, retorna uma resposta com o status 422 (entidade não processável) e a mensagem de erro
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Unprocessable entity: " + error.message);
        case ErrorType.BAD_REQUEST:
            // Se for do tipo BAD_REQUEST, retorna uma resposta com o status 400 (requisição inválida) e a mensagem de erro
            return res.status(httpStatus.BAD_REQUEST).send(error.message);
        case ErrorType.INTERNAL:
            // Se for do tipo INTERNAL, retorna uma resposta com o status 500 (erro interno do servidor) e uma mensagem genérica de erro
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
        case ErrorType.UNAUTHORIZED:
            // Se for do tipo UNAUTHORIZED, retorna uma resposta com o status 401 (não autorizado) e a mensagem de erro
            return res.status(httpStatus.UNAUTHORIZED).send("Unauthorized: " + error.message);
        default:
            // Se for de outro tipo desconhecido, retorna uma resposta com o status 500 (erro interno do servidor) e uma mensagem genérica de erro
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
    }
}
