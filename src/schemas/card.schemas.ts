import JoiBase, { Root } from "joi";
import JoiDate from "@joi/date";
import { CardCheckDTO, CardDTO } from "../common/protocols/card.types";

const Joi = JoiBase.extend(JoiDate) as Root;

export const RegisterCardSchema = Joi.object<CardDTO>({
    cardCPF: Joi.string().required(),
    userCPF: Joi.string().required(),
    cardNumber: Joi.string().required(),
    isValid: Joi.boolean().required()
});

export const CheckCardSchema = Joi.object<CardCheckDTO>({
    cardCPF: Joi.string().required(),
    userCPF: Joi.string().required(),
    cardNumber: Joi.string().required()
});