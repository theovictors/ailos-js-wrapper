export default {

  validateAilosResponse(response) {
    return new Promise((resolve, reject) => {
      if (!response) {
        reject(new Error('Empty response, is request valid?'));
      }

      if (typeof response.data === 'undefined') {
        reject(new Error(JSON.stringify(response)));
      }

      if (typeof response.data.OUTPUT_DATA.TOKEN !== 'undefined') {
        resolve(response.data.OUTPUT_DATA.TOKEN);
      }

      if (typeof response.data.OUTPUT_DATA.WS_RESULT !== 'undefined') {
        resolve(response.data.OUTPUT_DATA.WS_RESULT);
      }

      resolve({});
    });
  },

  isToday(date) {
    let today = new Date();
    let compareDate = new Date(date);

    return today.getUTCFullYear() === compareDate.getUTCFullYear() &&
            today.getUTCMonth() === compareDate.getUTCMonth() &&
            today.getUTCDate() === compareDate.getUTCDate();
  }

};
