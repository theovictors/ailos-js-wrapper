export default function auth() {

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
