import { NextFunction, Request, Response } from "express";
import prisma from "../common/database/databaseConfig";
import { CustomError, ErrorType } from "../common/protocols/error.types";

export default async function validateAuth(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    if (!token) throw new CustomError(ErrorType.UNAUTHORIZED, "Token not found");
    const session = await prisma.sessions.findFirst({ where: { token } });
    if (!session) throw new CustomError(ErrorType.UNAUTHORIZED, "Session not found");
    res.locals.userId = session.user_id;
    next();
}