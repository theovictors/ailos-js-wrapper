const validateAilosResponse = response => {
  return new Promise((resolve, reject) => {
    if (!response)
      reject(new Error('Empty response, is request valid?'));

    let responseJSON;
    try {
      responseJSON = JSON.parse(response);
    } catch (err) {
      reject(new Error(`${response}\n${err}`));
    }
    
    if(typeof responseJSON.data.OUTPUT_DATA.TOKEN !== 'undefined')
      resolve(responseJSON.data.OUTPUT_DATA.TOKEN);

    if(typeof responseJSON.data.OUTPUT_DATA.WS_RESULT !== 'undefined')
      resolve(responseJSON.data.OUTPUT_DATA.WS_RESULT);

    resolve({});
  })
};

export default validateAilosResponse;
