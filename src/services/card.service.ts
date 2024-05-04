import { LoginDTO, RegisterDTO } from "../common/protocols/authentication.types";
import { CardDTO } from "../common/protocols/card.types";
import { CustomError, ErrorType } from "../common/protocols/error.types";
import { CardRepository } from "../common/repositories/card.repository";


const Repository = new CardRepository();

async function registerCard(data: CardDTO, userId : number) {
    // TODO: Implementar
};

const CardService = {
    registerCard
};

export default CardService;