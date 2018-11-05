export default function autha() {

    return this.request({ trn:390 }, {
        CONTA_CORRENTE: this.contaCorrente,
        COOPERATIVA: 1,
        TITULARIDADE: 1,
        FRASE_SECRETA: this.fraseSecreta,
        SENHA: this.senha.match(/.{1}/g).join('.')
      });
  }
  