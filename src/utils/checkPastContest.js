import { convertToJsDate } from ".";

function checkPastContest(dateToCheck) {
  return new Date().getTime() - convertToJsDate(dateToCheck).getTime() > 0;
}

export default checkPastContest;
