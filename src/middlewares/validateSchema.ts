import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { CustomError, ErrorType } from "../common/protocols/error.types";

export default function validateSchema(schema: Schema, parse?: boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    let body = null;
    if (parse) {
      try {
        body = JSON.parse(req.body.data);
      }
      catch (err) {
        throw new CustomError(ErrorType.BAD_REQUEST, "Invalid request body");
      }
    } else {
      body = req.body;
    }

    const validation = schema.validate(body, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw new CustomError(ErrorType.UNPROCESSABLE, errors.join(', '));
    }
    next();
  };
}
