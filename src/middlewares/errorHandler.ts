import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";
import { ErrorType } from "../common/protocols/error.types";

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof AxiosError) {
        return res.status(error?.status || 400).send(error?.response?.data);
    }
    console.log(error);
    switch (error.type) {
        case ErrorType.CONFLICT:
            return res.status(httpStatus.CONFLICT).send(error.message);
        case ErrorType.NOT_FOUND:
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        case ErrorType.UNPROCESSABLE:
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Unprocessable entity: " + error.message);
        case ErrorType.BAD_REQUEST:
            return res.status(httpStatus.BAD_REQUEST).send(error.message);
        case ErrorType.INTERNAL:
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
        case ErrorType.UNAUTHORIZED:
            return res.status(httpStatus.UNAUTHORIZED).send("Unauthorized: " + error.message);
        default:
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
    }
}