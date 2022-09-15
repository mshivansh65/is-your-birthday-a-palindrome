const inputDateEl = document.querySelector("#input-date");
const btn = document.querySelector(".btn");
const messageEl = document.querySelector(".message");

btn.addEventListener("click", () => {
  const inpuDate = inputDateEl.value;
  if (inpuDate) {
    const date = new Date(inpuDate);
    // console.log(date);
    perfomeChecks(date);
  }
});
// const dummyDateString = `02/08/2080`;
// const date = new Date(dummyDateString);
// console.log(date);
// console.log(checkPalindromeDate(date));

function checkPalindromeDate(date) {
  const dateString = dateToSring(date);
  // console.log(dateString);
  const revDate = reverseDateSting(dateString);

  // console.log(revDate);
  if (revDate === dateString) {
    return true;
  } else return false;
}
function reverseDateSting(dateString) {
  let dateNumber = Number(dateString);
  let dateRevString = "";
  while (dateNumber > 0) {
    dateRevString += (dateNumber % 10) + "";
    dateNumber = Math.trunc(dateNumber / 10);
  }
  dateRevString = dateRevString.padEnd(8, "0");

  const revDate = stringToDate(dateRevString);
  if (revDate) {
    return dateRevString;
  } else return false;
}
function dateToSring(date) {
  return `${(date.getDate() + "").padStart(2, "0")}${(
    date.getMonth() +
    1 +
    ""
  ).padStart(2, "0")}${date.getFullYear()}`;
}
function stringToDate(string) {
  const invalidDateString = `Invalid Date`;
  const dateString = `${string.slice(2, 4)}/${string.slice(
    0,
    2
  )}/${string.slice(4)}`;
  const date = new Date(dateString);
  if (date.toString() === invalidDateString) {
    return undefined;
  } else {
    return date;
  }
}
// const dummyString = `04032022`;
// stringToDate(dummyString);
function getNextDate(date, days = 1) {
  const dateUpdate = new Date(date);
  dateUpdate.setDate(dateUpdate.getDate() + days);
  return dateUpdate;
}
function getPrevDate(date, days = 1) {
  const dateUpdate = new Date(date);
  dateUpdate.setDate(dateUpdate.getDate() - days);
  return dateUpdate;
}
function perfomeChecks(date) {
  const inputDate = date;
  if (checkPalindromeDate(inputDate)) {
    // console.log("your birtyday is palindrome");
    showMessage(true);
  } else {
    const leftDayMisssed = findLeftDayMissed(inputDate);
    const rightDayMissed = findRightDayMissed(inputDate);
    showMessage(false, date, leftDayMisssed, rightDayMissed);
    console.log(leftDayMisssed);
    console.log(rightDayMissed);
  }
}
function findLeftDayMissed(date) {
  let day = 0;
  // console.log(`checking on ${date}`);
  if (checkPalindromeDate(date)) {
    console.log(`found ${date}`);
    return 0;
  } else {
    const prevDate = getPrevDate(date);
    try {
      day = Number(findLeftDayMissed(prevDate)) + 1;
      return day;
    } catch (err) {
      return -10000;
      // return 0;
    }
  }
}
function findRightDayMissed(date) {
  console.log(`checking on ${date}`);
  if (checkPalindromeDate(date)) {
    console.log(`found ${date}`);
    return 0;
  } else {
    const nextDate = getNextDate(date);
    const day = Number(findRightDayMissed(nextDate)) + 1;
    return day;
  }
}
function showMessage(
  isBirtydayPalindrome = false,
  date,
  leftDayMisssed,
  rightDayMissed
) {
  let message = "";
  if (isBirtydayPalindrome) {
    // message for palindrome Birthday
  } else {
    if (leftDayMisssed < 0 || rightDayMissed < leftDayMisssed) {
      const palindromeDate = getNextDate(date, rightDayMissed);
      console.log(`Next day will be at ${palindromeDate}`);

      message = `Oops you missed by ${rightDayMissed} days next palindrom date after your birthday is ${palindromeDate.getDate()}/${
        palindromeDate.getMonth() + 1
      }${palindromeDate.getFullYear()}`;
    } else {
      const palindromeDate = getPrevDate(date, leftDayMisssed);
      console.log(`It was at ${palindromeDate}`);
      message = `Oops you missed by ${leftDayMisssed} days prev palindrom date before your birthday is ${palindromeDate.getDate()}/${
        palindromeDate.getMonth() + 1
      }/${palindromeDate.getFullYear()}`;
    }
  }
  messageEl.textContent = message;
}
