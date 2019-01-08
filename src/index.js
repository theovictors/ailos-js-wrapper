import auth from './auth';
import account from './account';
import transfer from './transfer';

import axios from 'axios';

import API_URL from './config';
import utils from './utils';

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

    let body = {
      chn: '3',
      data: data,
      trn: type,
      ...additionalBody
    };

    let config = {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    };

    return axios.post(API_URL, body, config)
      .then(resp => utils.validateAilosResponse(resp.data))
      .catch(error => {
        throw new Error(error.response.data);
      });
  }

}
