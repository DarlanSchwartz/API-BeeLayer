import { CardCheckDTO, CardDTO } from "../common/protocols/card.types";
import { AuthenticationRepository } from "../common/repositories/bankAccount.repository";
import { CardRepository } from "../common/repositories/card.repository";

const RepositoryCards = new CardRepository();
const RepositoryUsers = new AuthenticationRepository();

async function registerCard(data: CardDTO, userId: number) {
  // TODO: generate hash
  const generatedHash = "sadjhasdasjdh";
  const result = await RepositoryCards.registerCard(
    data,
    userId,
    generatedHash
  );
  return result;
}

async function checkCard(data: CardCheckDTO, userId: number) {
  const user = await RepositoryUsers.getUserByCPF(data.userCPF);

  const invalidCardResponse = { ...data, isValid: false };
  if (!user) {
    return invalidCardResponse;
  }

  // tranformar data em hash (Daniel)
  const hash = "Daniel";

  // Criando um objeto do tipo ArrayBuffer para armazenar os bytes da string
  const buffer = new TextEncoder().encode(hash);

  // Calculando o hash usando o algoritmo SHA-256
  window.crypto.subtle
    .digest("SHA-256", buffer)
    .then((hash) => {
      // Convertendo o ArrayBuffer para uma string hexadecimal
      const hashString = Array.from(new Uint8Array(hash))
        .map((byte) => {
          return byte.toString(16).padStart(2, "0");
        })
        .join("");

      console.log("Hash SHA-256 da string:", hashString);
    })
    .catch((error) => {
      console.error("Erro ao calcular o hash:", error);
    });

  // procurar no banco um cartão desse usuario que sejam igual o hash
  const card = await RepositoryCards.findUserCardByHash(userId, hash);

  // se exisitir cartão devolver o estado dele
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
