import { convertToJsDate } from ".";

function checkCurrentContest(timeRegister, timeEnd) {
  const registerTime = convertToJsDate(timeRegister).getTime();
  const endTime = convertToJsDate(timeEnd).getTime();
  const currentDay = new Date().getTime();
  return currentDay - registerTime > 0 && endTime - currentDay > 0;
}

export default checkCurrentContest;
