import { ethers } from "ethers";
import { CardCheckDTO, CardDTO } from "../common/protocols/card.types";
import { AuthenticationRepository } from "../common/repositories/bankAccount.repository";
import { CardRepository } from "../common/repositories/card.repository";
import { ethers } from 'ethers';

const RepositoryCards = new CardRepository();
const RepositoryUsers = new AuthenticationRepository();

async function registerCard(data: CardDTO, userId: number) {
  const hash = ethers.toUtf8Bytes(data.cardCPF + data.cardNumber + data.isValid + data.userCPF);
  const encryptedHash = ethers.sha256(hash);

  const result = await RepositoryCards.registerCard(
    userId,
    encryptedHash
  );
  return result;
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
  // se não existir devolver

  return invalidCardResponse;
}



const CardService = {
  registerCard,
  checkCard,
};

export default CardService;
