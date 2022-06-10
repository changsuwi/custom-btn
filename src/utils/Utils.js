export const IsNumber = (str) => {
  // if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
};

export const Min = (value1, value2) => {
  return value1 < value2 ? value1 : value2;
};
