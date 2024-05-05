
// Using the EAS SDK
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import axios from "axios";
import { ethers } from 'ethers';

const EAS_ADDRESS = process.env.EAS_ADDRESS || "";
// const SCHEMA_REGISTRY_ADDRESS = process.env.SCHEMA_REGISTRY_ADDRESS || "";
const SCHEMA_ADDRESS = process.env.SCHEMA_ADDRESS || "";
// const ATTESTATION_ADDRESS = process.env.ATTESTATION_ADDRESS || "";
const SCHEMA = process.env.SCHEMA || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
// const APP_ADDRESS = process.env.APP_ADDRESS || "";

//

async function attestOnChain(recipient: string, data: string) {
    // Initialize the sdk with the address of the EAS Schema contract address
    const eas = new EAS(EAS_ADDRESS);

    // Gets a default provider (scroll sepolia or polygon)
    const provider = ethers.getDefaultProvider(
        "sepolia"
    );

    const key = PRIVATE_KEY; // process.env.PRIVATE_KEY
    const signer = new ethers.Wallet(key, provider);

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    // MUST be a signer to do write operations!
    eas.connect(signer);
    const schemaEncoder = new SchemaEncoder(SCHEMA);
    const encodedData = schemaEncoder.encodeData([
        { name: "hash", value: data, type: "string" },
    ]);


    const tx = await eas.attest({
        schema: SCHEMA_ADDRESS,
        data: {
            recipient: recipient,
            expirationTime: BigInt(0),
            revocable: true, // Be aware that if your schema is not revocable, this MUST be false
            data: encodedData,
        },
    });

    const newAttestationUID = await tx.wait();
    return newAttestationUID;
}

async function createWallet() {
    const result = await axios.post("https://protocol-sandbox.lumx.io/v2/wallets", null, {
        headers: {
            Authorization: "Bearer " + (process.env.API_KEY || "")
        }
    });

    const address = result.data.address;
    const walletId = result.data.id;
    return { address, walletId };
}



const BlockchainService = {
    attestOnChain,
    createWallet
};

export default BlockchainService;