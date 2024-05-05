
import { WalletDTO } from "../common/protocols/wallet.types";
import { WalletRepository } from "../common/repositories/wallet.repository";

const RepositoryWallet = new WalletRepository();

async function createWallet(data: WalletDTO) {
  // TODO: generate hash
  const result = await RepositoryWallet.createWallet(
    data,
  );
  return result;
}


const WalletService = {
  createWallet
};

export default WalletService;
