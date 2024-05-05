
// Using the EAS SDK
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import axios from "axios";
import { ethers } from 'ethers';
import { Blockchain } from "../common/protocols/default.types";

const SCHEMA = process.env.SCHEMA || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const SCHEMA_ADDRESS = process.env.SCHEMA_ADDRESS || "";

async function attestOnChain(recipient: string, data: string, blockchain: Blockchain) {

    let EAS_ADDRESS = "";
    let RPC_ADDRESS = "";

    switch (blockchain) {
        case Blockchain.SCROLL:
            EAS_ADDRESS = process.env.EAS_ADDRESS_SCROLL || "";
            RPC_ADDRESS = process.env.RPC_ADDRES_SCROLL || "";
            break;
        case Blockchain.SEPOLIA:
            EAS_ADDRESS = process.env.EAS_ADDRESS_SEPOLIA || "";
            RPC_ADDRESS = process.env.RPC_ADDRES_SEPOLIA || "";
            break;
    }


    // Initialize the sdk with the address of the EAS Schema contract address
    const eas = new EAS(EAS_ADDRESS);

    // Gets a default provider (scroll sepolia or polygon)
    const provider = ethers.getDefaultProvider(RPC_ADDRESS);

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
    const result = await axios.post(`${process.env.LUMX_ENDPOINT}/wallets`, null, {
        headers: {
            Authorization: "Bearer " + (process.env.API_KEY || "")
        }
    });

    const address = result.data.address;
    const walletId = result.data.id;
    return { address, walletId };
}

async function createReward(recipient: string, quantity: number) {
    const result = await axios.post(`${process.env.LUMX_ENDPOINT}/transactions/transfers`, 
    {
        "contractId": (process.env.TOKEN_ID_POLYGON || ""),
        "from": (process.env.WALLET_ID || ""),
        "to": recipient,
        "tokenId": "BeLyr",
        "quantity": (process.env.DEFAULT_QTY_REWARD || 1)
    }, 
    {
        headers: {
            Authorization: "Bearer " + (process.env.API_KEY || "")
        }
    });

    const status = result.data.status;
    const transactionId = result.data.id;
    return { transactionId, status };
}

async function findTransaction(transactionID: string) {
    const result = await axios.post(`${process.env.LUMX_ENDPOINT}/transactions/${transactionID}`, null, 
    {
        headers: {
            Authorization: "Bearer " + (process.env.API_KEY || "")
        }
    });

    const status = result.data.status;
    const transactionId = result.data.id;
    const request = result.data.request;
    const completedAt = result.data.completedAt;
    return { transactionId, status, request, completedAt };
}

async function findWalletByID(walletID: string) {
    const result = await axios.post(`${process.env.LUMX_ENDPOINT}/wallets/${walletID}`, null,
    {
        headers: {
            Authorization: "Bearer " + (process.env.API_KEY || "")
        }
    });

    const id = result.data.id;
    const address = result.data.address;
    const tokens = result.data.tokens;
    return { id, address, tokens };
}

const BlockchainService = {
    attestOnChain,
    createWallet,
    createReward,
    findTransaction,
    findWalletByID
};

export default BlockchainService;