export enum ErrorType {
    CONFLICT,
    NOT_FOUND,
    UNAUTHORIZED,
    UNPROCESSABLE,
    BAD_REQUEST,
    INTERNAL
}

export class CustomError extends Error {
    constructor(public type: ErrorType, message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}