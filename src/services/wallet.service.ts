
import { WalletDTO } from "../common/protocols/wallet.types";
import { WalletRepository } from "../common/repositories/wallet.repository";

const RepositoryWallet = new WalletRepository();

async function createWallet(data: WalletDTO, userId: number) {
  // TODO: generate hash
  const generatedHash = "sadjhasdasjdh";
  const result = await RepositoryWallet.createWallet(
    data,
  );
  return result;
}


const WalletService = {
  createWallet
};

export default WalletService;
