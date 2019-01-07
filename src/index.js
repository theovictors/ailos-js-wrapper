import auth from './auth';
import account from './account';
import transfer from './transfer';

import API_URL from './config';
import { validateAilosResponse } from './utils';

export default class AilosWrapper {
  constructor(options) {
    this.contaCorrente = options.contaCorrente;
    this.fraseSecreta = options.fraseSecreta;
    this.senha = options.senha;
    this.token = '';

    this.auth = auth.bind(this);
    this.account = account.bind(this)();
    this.transfer = transfer.bind(this)();
  }

  setToken(token) {
    this.token = token;
  }

  request(type, data, additionalBody = undefined) {
    // Removes undefined keys
    Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

    let headers = {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${this.token}`
      }),
      body: JSON.stringify({
        chn: '3',
        data: data,
        trn: type,
        ...additionalBody
      })
    };

    return fetch(API_URL, headers)
      .then(resp => resp.text())
      .then(validateAilosResponse);
  }

}
