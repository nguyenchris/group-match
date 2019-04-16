export const updateObject = (oldObject, updatedProps) => {
  return {
    ...oldObject,
    ...updatedProps
  };
};

export const checkIfValid = (value, rules) => {
  let isValid = true;
  if (!rules) return true;
  if (rules && rules.required) {
    isValid = value.trim() !== '' && value.length >= 2 && isValid;
  }
  if (rules && rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules && rules.isEmail) {
    isValid = value.includes('@') && value.includes('.') && isValid;
  }
  return isValid;
};
