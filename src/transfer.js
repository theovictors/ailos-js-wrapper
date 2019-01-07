
import { isToday } from './utils';

export default function transfer() {

  return {
    doTransaction: (value, recipient, credentials) => this.request(555, {
      LETRAS_SEGURANCA: credentials.securityLetters.toUpperCase().match(/.{1}/g).join('--.') + '--',
      SENHA: credentials.password.match(/.{1}/g).join('.'),
      BANCO_CREDOR: recipient.bankCode,
      AGENCIA_CREDOR: recipient.agencyCode,
      CONTA_CREDOR: recipient.accountNumber,
      CPF_CNPJ_CREDOR: recipient.cpfCnpj,
      NOME_CREDOR: recipient.name,
      TIPO_CONTA_CREDOR: recipient.typeAccount, // 1 corrente 2 poupança 3 pagamento
      TIPO_PESSOA_CREDOR: recipient.typePerson, // 1 fisica 2 juridica
      DATA_EFETIVACAO_PAGTO: isToday(recipient.date) ? recipient.date : undefined,
      DATA_INICIAL_PERIODICO: isToday(recipient.date) ? undefined : recipient.date,
      CODIGO_TIPO_EFETIVACAO_TRANSFERENCIA: isToday(recipient.date) ? 1 : 2, // transaction is for today or scheduled
      MEIO_PAGAMENTO: recipient.bankCode === '85' ? '5' : '4', // Checks if Ailos or other banks
      VALOR_PAGTO: value,
      DESCONTO_PAGTO: 0,
      FINALIDADE: recipient.finality,
      COMENTARIO: recipient.comment ? recipient.comment : '',
      COMENTARIO_CREDOR: recipient.commentCreditor ? recipient.commentCreditor : '',
      INDICA_CADASTRO_FAVORITO: false
    }, {
      valueTO: {
        valueCurrent: value
      },
      seqFlow: 4
    }),

    getListBanks: () => this.request(318, {}, {seqFlow: 1})
      .then((response => response.listaBancos)),
    getListCooperatives: () => this.request(318, {}, {seqFlow: 1})
      .then((response => response.listaAgencias)),
    getListAilosRecipients: () => this.request(318, {}, {seqFlow: 2})
      .then((response => response.listaFavorecidos)),
    getListTedRecipients: () => this.request(323, {}, {seqFlow: 2})
      .then((response => response.listaFavorecidos)),
    getAgencyName: (agencyCode, bankCode) => this.request(406, {
      CODIGO_AGENCIA: agencyCode,
      CODIGO_BANCO: bankCode
    })
  };

}
