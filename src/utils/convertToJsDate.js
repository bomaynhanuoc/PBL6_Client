export const convertToJsDate = (strToConvert) => {
  const parts = strToConvert.split(" ");
  const dmy = parts[0].split("-");
  const hms = parts[1].split(":");

  return new Date(dmy[2], dmy[1] - 1, dmy[0], hms[0], hms[1], hms[2]);
};
