import JoiBase, { Root } from "joi";
import JoiDate from "@joi/date";
import { CardDTO } from "../common/protocols/card.types";

const Joi = JoiBase.extend(JoiDate) as Root;

export const RegisterCardSchema = Joi.object<CardDTO>({
    type: Joi.string().required(),
    validUntil: Joi.date().format('DD-MM-YYYY').required()
});