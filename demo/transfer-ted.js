/* to run: babel-node transfer.js */

global.fetch = require('node-fetch');
global.Headers = fetch.Headers;

import AilosWrapper from '../src/index';

const session = new AilosWrapper({
  contaCorrente: 8400000,
  senha: '00000000',
  fraseSecreta: 'aoinfinitoealem'
});

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

session.auth().then(token => {
    console.log(`Succesfully logged, token is ${token}`);
    session.setToken(token);

    session.transfer.doTransaction(10, tedRecipient, credentials)
      .then(response => console.log(JSON.stringify(response, null, 4)));
}).catch(error => console.error(error));
