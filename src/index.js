import API_URL from './config';
import validateAilosResponse from './utils';
import config from './config';

export default class AilosWrapper {
  constructor(options) {
    this.contaCorrente = options.contaCorrente;
    this.fraseSecreta = options.fraseSecreta;
    this.senha = options.senha;
    this.token = '';
  }

  auth() {
    return this.request(390, {
      CONTA_CORRENTE: this.contaCorrente,
      COOPERATIVA: 1,
      TITULARIDADE: 1,
      FRASE_SECRETA: this.fraseSecreta,
      SENHA: this.senha.match(/.{1}/g).join('.')
    }).then(response => {
      if(typeof response.data.OUTPUT_DATA.TOKEN !== 'undefined') {
        return Promise.resolve(response.data.OUTPUT_DATA.TOKEN);
      }

      return Promise.reject(new Error('Invalid token'));
    });
  }

  setToken(token) {
    this.token = token;
  }

  request(type, data) {
    const headers = {
      headers: {
        Authorization: `'Bearer ${this.token}'`
      },
      method: 'POST',
      body: JSON.stringify({
        chn: "3",
        data: data,
        trn: type
      })
    };

    return fetch(API_URL, headers)
        .then(resp => resp.text())
        .then(validateAilosResponse);
  }

}
