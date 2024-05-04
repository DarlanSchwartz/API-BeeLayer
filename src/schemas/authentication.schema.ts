import JoiBase, { Root } from "joi";
import JoiDate from "@joi/date";
import { LoginDTO, RegisterDTO } from "../common/protocols/authentication.types";

const Joi = JoiBase.extend(JoiDate) as Root;

export const LoginSchema = Joi.object<LoginDTO>({
    cpf: Joi.string().required(),
    password: Joi.string().required()
});


export const RegisterSchema = Joi.object<RegisterDTO>({
    cpf: Joi.string().required(),
    password: Joi.string().required()
});