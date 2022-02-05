const validateInputs = (inputs, requiredFields) => {
   const keyInputs = Object.keys(inputs);
   const errors = {};

   keyInputs.forEach((input) => {
      if (!inputs[input] && requiredFields.includes(input)) {
         errors[input] = `${input}__error`;
      }
   });

   return errors;
};

module.exports = { validateInputs };