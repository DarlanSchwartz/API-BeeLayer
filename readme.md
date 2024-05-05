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