export default class Utils {

  static validateAilosResponse = (response) => {
    return new Promise((resolve, reject) => {
      if (!response) {
        reject(new Error('Empty response, is request valid?'));
      }

      let responseJSON;

      try {
        responseJSON = JSON.parse(response);
      } catch (err) {
        reject(new Error(`${response}\n${err}`));
      }

      if (typeof responseJSON.data === 'undefined') {
        reject(new Error(JSON.stringify(responseJSON)));
      }

      if (typeof responseJSON.data.OUTPUT_DATA.TOKEN !== 'undefined') {
        resolve(responseJSON.data.OUTPUT_DATA.TOKEN);
      }

      if (typeof responseJSON.data.OUTPUT_DATA.WS_RESULT !== 'undefined') {
        resolve(responseJSON.data.OUTPUT_DATA.WS_RESULT);
      }

      resolve({});
    });
  }

  static isToday = (date) => {
    let today = new Date();
    let compareDate = new Date(date);

    return today.getUTCFullYear() === compareDate.getUTCFullYear() &&
            today.getUTCMonth() === compareDate.getUTCMonth() &&
            today.getUTCDate() === compareDate.getUTCDate();
  }
}
