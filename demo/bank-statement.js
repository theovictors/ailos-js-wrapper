/* to run: babel-node bank-statement.js */

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
    session.account.getStatement('2018-10-03', '2018-11-06').then(response => console.log(JSON.stringify(response, null, 4)));
}).catch(error => console.error(error));
