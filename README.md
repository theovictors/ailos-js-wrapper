# Ailos JS Wrapper

Wrapper para trabalhar com a API do [Sistema Ailos](https://www.ailos.coop.br/).

## Instalação

```sh
$ npm install ailos-js-wrapper --save
```

## Como usar

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

## //TODO: Métodos

> Veja os exemplos na pasta **demo**

## ATENÇÃO!

**NÃO** utilize essa biblioteca no back-end caso utilize credenciais de outros usuários! Implemente no front-end e transfira apenas os dados necessários para o seu servidor. 
**NÃO** envie dados sensíveis de terceiros ao seu servidor sem o devido consentimento!