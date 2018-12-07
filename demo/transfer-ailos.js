/* to run: babel-node transfer-ailos.js */

global.fetch = require('node-fetch');
global.Headers = fetch.Headers;

import AilosWrapper from '../src/index';

const session = new AilosWrapper({
  contaCorrente: 8400000,
  senha: '00000000',
  fraseSecreta: 'aoinfinitoealem'
});

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

session.auth().then(token => {
    console.log(`Succesfully logged, token is ${token}`);
    session.setToken(token);

    session.transfer.doTransaction(10.50, ailosRecipient, credentials)
      .then(response => console.log(JSON.stringify(response, null, 4)));
}).catch(error => console.error(error));
