const validateAilosResponse = data => {
  return new Promise((resolve, reject) => {
    if (!data || data == '') 
      reject(new Error('Empty response, is request valid?'));

      try {
        resolve(JSON.parse(data));
    } catch (err) {
      reject(new Error(data));
    }
  })
};

export default validateAilosResponse;
