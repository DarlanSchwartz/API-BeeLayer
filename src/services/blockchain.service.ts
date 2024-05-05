
// Using the EAS SDK
import { EAS, Offchain, SchemaEncoder, SchemaRegistry, } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';

const EAS_ADDRESS = process.env.EAS_ADDRESS || "";
const SCHEMA_REGISTRY_ADDRESS = process.env.SCHEMA_REGISTRY_ADDRESS || "";
const SCHEMA_ADDRESS = process.env.SCHEMA_ADDRESS || "";
const ATTESTATION_ADDRESS = process.env.ATTESTATION_ADDRESS || "";
const SCHEMA = process.env.SCHEMA || "";
const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS || "";
const APP_ADDRESS = process.env.APP_ADDRESS || "";


// Initialize the sdk with the address of the EAS Schema contract address
const eas = new EAS(EAS_ADDRESS);
const schemaEncoder = new SchemaEncoder(SCHEMA);

// Gets a default provider (scroll sepolia or polygon)
const provider = ethers.getDefaultProvider(
    "https://sepolia-rpc.scroll.io/"
);
// Connects an ethers style provider/signingProvider to perform read/write functions.
// MUST be a signer to do write operations!
// eas.connect(provider);

// // Getting Schema Information
// const schemaRegistry = new SchemaRegistry(SCHEMA_REGISTRY_ADDRESS);
// schemaRegistry.connect(provider);


async function attestOnChain(recipient: string, data: string) {
    const encodedData = schemaEncoder.encodeData([
        { name: data, value: 1, type: "string" },
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
    console.log(await attestOnChain(CLIENT_ADDRESS, "hash"));
    return newAttestationUID;
}


const BlockchainService = {
    attestOnChain
};

export default BlockchainService;