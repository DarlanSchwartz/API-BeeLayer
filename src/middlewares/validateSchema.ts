// Importando os tipos Request, Response e NextFunction do Express e Schema do Joi
import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

// Importando o tipo CustomError e ErrorType do protocolo de erros
import { CustomError, ErrorType } from "../common/protocols/error.types";

// Middleware para validar o corpo da requisição com base em um schema Joi
export default function validateSchema(schema: Schema, parse?: boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    let body = req.body;
    // Validando o corpo da requisição com base no schema Joi
    const validation = schema.validate(body, { abortEarly: false });

    // Verificando se ocorreram erros de validação
    if (validation.error) {
      // Se ocorreram erros, mapeia os detalhes dos erros e lança um erro de entidade não processável
      const errors = validation.error.details.map((detail) => detail.message);
      throw new CustomError(ErrorType.UNPROCESSABLE, errors.join(', '));
    }

    // Se a validação passou, chama o próximo middleware na cadeia
    next();
  };
}
