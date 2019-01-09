# Ailos JS Wrapper

Wrapper JS para trabalhar com a API do [Sistema Ailos](https://www.ailos.coop.br/).


## Instalação

```sh
$ npm install ailos-js-wrapper --save
```


## Como usar
> Veja os exemplos na pasta **demo**

### ES6

```js
import AilosWrapper from 'ailos-js-wrapper';

const session = new AilosWrapper({
    contaCorrente: 8400000,
    senha: '00000000',
    fraseSecreta: 'aoinfinitoealem'
});

// usando método
session.account.getStatement('2018-10-03', '2018-11-06')
    .then(response => console.log(JSON.stringify(response)));
```

### CommonJS

```js
const AilosWrapper = require('ailos-js-wrapper').default;

const session = new AilosWrapper({
    contaCorrente: 8400000,
    senha: '00000000',
    fraseSecreta: 'aoinfinitoealem'
});
```

### UMD in Browser

```html
<!-- to import non-minified version -->
<script src="ailos-js-wrapper.umd.js"></script>

<!-- to import minified version -->
<script src="ailos-js-wrapper.umd.min.js"></script>
```


## Métodos

### auth()

> Autentica com as credenciais da sessão e retorna o token JWT.

**Argumentos**

| Argumento | Tipo   | Descrição         |
|-----------|--------|-------------------|
|           |        |                   |

**Exemplo**

```js
const session = new AilosWrapper({
    contaCorrente: 8400000,
    senha: '00000000',
    fraseSecreta: 'aoinfinitoealem'
});

session.auth()
  .then(token => {
    session.setToken(token);
  })
  .catch(error => console.error(error));
```


### setToken(token)

> Define o token JWT que será usado nas requisições.

**Argumentos**

| Argumento | Tipo     | Descrição |
|-----------|----------|-----------|
| token     | *string* | Token JWT |

**Exemplo**

```js
session.auth()
  .then(token => {
    session.setToken(token);
  })
```

### account.getBalance()

> Retorna o saldo da conta.

**Argumentos**

| Argumento | Tipo   | Descrição         |
|-----------|--------|-------------------|
|           |        |                   |

**Exemplo**

```js
session.account.getBalance()
  .then(data => {
    // ...
  })
```


### account.getStatement(startDate, endDate)

> Retorna o extrato da conta do período informado.

**Argumentos**

| Argumento | Tipo     | Descrição                 |
|-----------|----------|---------------------------|
| startDate | *string* | Data de início do extrato |
| endDate   | *string* | Data final do extrato     |

**Exemplo**

```js
session.account.getStatement('2018-11-25', '2019-01-06')
  .then(data => {
    // ...
  })
```


### transfer.doTransaction(value, recipient, credentials)

> Efetua uma transação bancária Sistema Ailos e TED.

**Argumentos**

| Argumento   | Tipo     | Descrição                |
|-------------|----------|--------------------------|
| value       | *number* | Valor a ser transferido  |
| recipient   | *Object* | Dados do favorecido      |
| credentials | *Object* | Credenciais de segurança |

**recipient *(Favorecido Sistema Ailos)***

| Argumento     | Tipo     | Descrição                                                 |
|---------------|----------|-----------------------------------------------------------|
| bankCode      | *string* | Código do banco (85)                                      |
| agencyCode    | *string* | Código cooperativa                                        |
| accountNumber | *string* | Número da conta                                           |
| date          | *string* | Data a ser efetuada a transação                           |
| typeAccount   | *number* | Tipo de conta (1 - Corrente, 2 - Poupança, 3 - Pagamento) |
| typePerson    | *number* | Tipo de pessoa (1 - Física, 2 - Jurídica)                 |

**recipient *(Favorecido Outros Bancos)***

| Argumento       | Tipo     | Descrição                                                 |
|-----------------|----------|-----------------------------------------------------------|
| bankCode        | *string* | Código do banco                                           |
| agencyCode      | *string* | Agência do banco                                          |
| accountNumber   | *string* | Número da conta                                           |
| name            | *string* | Nome Completo                                             |
| cpfCnpj         | *string* | CPF ou CNPJ                                               |
| date            | *string* | Data a ser efetuada a transação                           |
| typeAccount     | *number* | Tipo de conta (1 - Corrente, 2 - Poupança, 3 - Pagamento) |
| typePerson      | *number* | Tipo de pessoa (1 - Física, 2 - Jurídica)                 |
| finality        | *string* | *(Opcional)* Finalidade                                   |
| comment         | *string* | *(Opcional)* Comentário                                   |
| commentCreditor | *string* | *(Opcional)* Comentário credor                            |

**credentials**

| Argumento       | Tipo     | Descrição                        |
|-----------------|----------|----------------------------------|
| securityLetters | *string* | Letras de segurança de 3 dígitos |
| password | *string* | Senha de 8 dígitos |

**Exemplo *(Sistema Ailos)***

```js
const ailosRecipient = {
  bankCode: '85',
  agencyCode: '0101',
  accountNumber: '8400000',
  date: '2018-12-07',
  typeAccount: 1,
  typePerson: 1
};

const credentials = {
  securityLetters: 'ASD',
  password: '00000000'
};

session.transfer.doTransaction(10.50, ailosRecipient, credentials)
  .then(data => {
    // ...
  })
```

**Exemplo *(Outros Bancos)***

```js
const tedRecipient = {
  bankCode: '104',
  agencyCode: '0852',
  accountNumber: '412678',
  cpfCnpj: '98992252900',
  name: 'WOODY PRIDE',
  date: '2018-12-15',
  typeAccount: 1,
  typePerson: 1
};

const credentials = {
  securityLetters: 'ASD',
  password: '00000000'
};

session.transfer.doTransaction(10.50, tedRecipient, credentials)
  .then(data => {
    // ...
  })
```


### transfer.getListBanks()

> Retorna a lista de bancos com o código, nome e código ISPB.

**Argumentos**

| Argumento | Tipo   | Descrição         |
|-----------|--------|-------------------|
|           |        |                   |

**Exemplo**

```js
session.transfer.getListBanks()
  .then(data => {
    // ...
  })
```


### transfer.getListCooperatives()

> Retorna a lista de cooperativas com o código e nome.

**Argumentos**

| Argumento | Tipo   | Descrição         |
|-----------|--------|-------------------|
|           |        |                   |

**Exemplo**

```js
session.transfer.getListCooperatives()
  .then(data => {
    // ...
  })
```


### transfer.getListAilosRecipients()

> Retorna lista de favorecidos do Sistema Ailos cadastrados.

**Argumentos**

| Argumento | Tipo   | Descrição         |
|-----------|--------|-------------------|
|           |        |                   |

**Exemplo**

```js
session.transfer.getListAilosRecipients()
  .then(data => {
    // ...
  })
```


### transfer.getListTedRecipients()

> Retorna lista de favorecidos de outros bancos cadastrados.

**Argumentos**

| Argumento | Tipo   | Descrição         |
|-----------|--------|-------------------|
|           |        |                   |

**Exemplo**

```js
session.transfer.getListTedRecipients()
  .then(data => {
    // ...
  })
```


### transfer.getAgencyName(agencyCode, bankCode)

> Retorna nome da agência bancária.

**Argumentos**

| Argumento  | Tipo     | Descrição         |
|------------|----------|-------------------|
| agencyCode | *string* | Código da agência |
| bankCode   | *string* | Código do banco   |

**Exemplo**

```js
session.transfer.getAgencyName('0852', '104')
  .then(data => {
    // ...
  })
```


## ATENÇÃO!

**NÃO** utilize essa biblioteca no back-end caso utilize credenciais de outros usuários! Implemente no front-end e transfira apenas os dados necessários para o seu servidor. 
**NÃO** envie dados sensíveis de terceiros ao seu servidor sem o devido consentimento!
