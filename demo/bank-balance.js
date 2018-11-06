/* to run: babel-node bank-balance.js */

global.fetch = require('node-fetch');
global.Headers = fetch.Headers;

import AilosWrapper from '../src/index';

const session = new AilosWrapper({
  contaCorrente: 8400000,
  senha: '00000000',
  fraseSecreta: 'aoinfinitoealem'
});

session.auth().then(token => {
    console.log(`Succesfully logged, token is ${token}`);
    session.setToken(token);
    session.account.getBalance().then(response => console.log(response));
}).catch(error => console.error(error));
