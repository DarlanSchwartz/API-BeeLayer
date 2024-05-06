# API Bee Layer


Utilizamos o EAS para salvar na blockchain L2 da SCROLL,
certificando que dados do usuários são válidos.

Ethereum Attestation Service -> (Contrato: 0xaEF4103A04090071165F78D45D83A0C0782c2B2a)

Pode ser verificado nesse link -> https://scroll-sepolia.easscan.org/schema/view/0x037d867e5ca02ff7b9069d22faa959137cdc9e3de47a3eb9f5598325b28dec4c

Os dados do usuário e cartão são encriptados utilizando SHA-256
e o hash é salvo como certificado de autenticidade válido, chamamos de OnChain Attestation.

Cada novo certificado de autenticidade (Attestation) criado pela nossa API,
gera uma transação na blockchain da SCROLL Sepolia e pode ser visualizada
em qualquer serviço de explorador de blocos.

Exemplo de Attestation -> https://scroll-sepolia.easscan.org/attestation/view/0x701dbef8d07abb25c80b63f8959b3a0631973a71e38abf6faaf5e6d1ef310940

Exemplo de Transação da Rede -> https://sepolia.scrollscan.com//tx/0x02e81fec64111be3f6dafcfcb77c0523c45b81e372d379c87d1caba40bbb8a49

Crie um arquivo .env então 
After run
```
npx prisma db pull
```
```
npx prisma generate
```

 # Routes

/register-card 

REQUEST 

Headers Authorization "Bearer " + token recebido no login
```typescript
    {
        cardCPF: string.
        userCPF: string;
        cardNumber: string;
        isValid: boolean;
    }
```

RESPONSE


```typescript
"Sucesso"
```

/check-card
 
Headers Authorization "Bearer " + token recebido no login

REQUEST
```typescript
{
    cardCPF: string;
    userCPF: string;
    cardNumber: string;
}
```
    

RESPONSE
```typescript
{
    cardCPF: string;
    userCPF: string;
    cardNumber: string;
    isValid: boolean;
}
```

/sign-in 

REQUEST
```typescript
{
    cpf: string;
    password: string;
}
```


RESPONSE

```typescript
{
   token: string;
}
```
/sign-up

REQUEST


```typescript
{
    cpf: string;
    password: string;
    email:string;
}
```
RESPONSE

```typescript
"Criado"
```

# .env File

```bash


DATABASE_URL="postgres://"
PORT=3001

# Wallet Metamask
APP_ADDRESS =
PRIVATE_KEY=

// eas-sdk config
#; // Sepolia v0.26
EAS_ADDRESS_SCROLL = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a"
EAS_ADDRESS_SEPOLIA = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"
RPC_ADDRES_SEPOLIA =  "sepolia"
RPC_ADDRES_SCROLL =  "https://sepolia-rpc.scroll.io/"


SCHEMA_ADDRESS = "0x037d867e5ca02ff7b9069d22faa959137cdc9e3de47a3eb9f5598325b28dec4c"
SCHEMA = "string hash"

API_KEY = 
LUMX_ENDPOINT=
```