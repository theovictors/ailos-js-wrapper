export default function auth() {

  return this.request(390, {
    CONTA_CORRENTE: this.contaCorrente,
    COOPERATIVA: 1, // TODO
    TITULARIDADE: 1,
    FRASE_SECRETA: this.fraseSecreta,
    SENHA: this.senha.match(/.{1}/g).join('.')
  });

}
