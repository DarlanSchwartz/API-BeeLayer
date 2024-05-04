import JoiBase, { Root } from "joi";
import JoiDate from "@joi/date";
import { WalletDTO } from "../common/protocols/wallet.types";

const Joi = JoiBase.extend(JoiDate) as Root;

export const CreateWalletSchema = Joi.object<WalletDTO>({
    type: Joi.string().required(),
    validUntil: Joi.date().format('DD-MM-YYYY').required()
});