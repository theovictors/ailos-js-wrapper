import validateAilosResponse from './utils';

export default function account() {

  return {
    getBalance: () => this.request(457, {
      DATA_ACAO_USUARIO: new Date()
    }).then(response => {
      if(typeof response.data.OUTPUT_DATA.WS_RESULT !== 'undefined') {
        return Promise.resolve(response.data.OUTPUT_DATA.WS_RESULT);
      }
  
      return Promise.reject(new Error('Empty balance')); 
    }),
    getStatement: (startDate, endDate) => this.request(327, {
      DATA_INICIAL: startDate,
      DATA_FINAL: endDate,
      REGISTROS_POR_PAGINA: 50,     // TODO: pagination
      POSICAO_PRIMEIRO_REGISTRO: 1
    }).then(response => {
      if(typeof response.data.OUTPUT_DATA.WS_RESULT !== 'undefined') {
        return Promise.resolve(response.data.OUTPUT_DATA.WS_RESULT);
      }
  
      return Promise.reject(new Error('Empty statement')); 
    })
  }

}
