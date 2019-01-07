export default function account() {

  return {
    getBalance: () => this.request(457, {
      DATA_ACAO_USUARIO: new Date()
    }),
    getStatement: (startDate, endDate) => this.request(327, {
      DATA_INICIAL: startDate,
      DATA_FINAL: endDate,
      REGISTROS_POR_PAGINA: 50, // TODO: pagination
      POSICAO_PRIMEIRO_REGISTRO: 1
    })
  };

}
