import { ethers } from "ethers";
import { CardCheckDTO, CardDTO } from "../common/protocols/card.types";
import { AuthenticationRepository } from "../common/repositories/authentication.repository";
import { CardRepository } from "../common/repositories/card.repository";
import BlockchainService from "./blockchain.service";
import { CustomError, ErrorType } from "../common/protocols/error.types";

const RepositoryCards = new CardRepository();
const RepositoryUsers = new AuthenticationRepository();

async function registerCard(data: CardDTO, userId: number) {
  const hash = ethers.toUtf8Bytes(data.cardCPF + data.cardNumber + data.isValid + data.userCPF);
  const encryptedHash = ethers.sha256(hash);

  const user = await RepositoryUsers.getUserById(userId);

  if (!user) {
    throw new CustomError(ErrorType.NOT_FOUND, `Usuário não existe ${userId}`);
  }

  await BlockchainService.attestOnChain(user.walletAddress, encryptedHash);

  await RepositoryCards.registerCard(userId, encryptedHash);

  return "Sucesso!";
}

async function checkCard(data: CardCheckDTO, userId: number) {
  const user = await RepositoryUsers.getUserByCPF(data.userCPF);

  const invalidCardResponse = { ...data, isValid: false };
  if (!user) {
    return invalidCardResponse;
  }

  const concatenatedData = ethers.toUtf8Bytes(data.cardCPF + data.cardNumber + true + data.userCPF);
  const encryptedHash = ethers.sha256(concatenatedData);
  const card = await RepositoryCards.findUserCardByHash(userId, encryptedHash);


  if (card != null) {
    return { ...data, isValid: true };
  }

  return invalidCardResponse;
}



const CardService = {
  registerCard,
  checkCard,
};

export default CardService;
