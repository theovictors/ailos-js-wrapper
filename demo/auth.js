/* to run: babel-node auth.js */

global.fetch = require('node-fetch');

import AilosWrapper from '../src/index';

const session = new AilosWrapper({
  contaCorrente: 8400000,
  senha: '00000000',
  fraseSecreta: 'aoinfinitoealem'
});

session.auth().then(token => {
    console.log(`Succesfully logged, token is ${token}`);
    session.setToken(token);
}).catch(error => console.error(error));