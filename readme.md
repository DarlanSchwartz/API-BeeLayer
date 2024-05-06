- pedir Daniel para mostrar como gera o hash
- Criar a carteira do usuário
- Transformar os dadod em hash


- npx prisma db pull
- npx prisma generate


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

```bash
.env File

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