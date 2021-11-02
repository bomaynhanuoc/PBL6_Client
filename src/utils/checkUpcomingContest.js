import { convertToJsDate } from ".";

function checkUpcomingContest(dateToCheck) {
  return convertToJsDate(dateToCheck).getTime() - new Date().getTime() > 0;
}

export default checkUpcomingContest;
