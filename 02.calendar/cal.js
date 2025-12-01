#! /usr/bin/env node

import dayjs from "dayjs";
import "dayjs/locale/en.js";
import localeData from "dayjs/plugin/localeData.js";
import minimist from "minimist";

dayjs.extend(localeData);
dayjs.locale("en");

const args = minimist(process.argv.slice(2));
let dateTime = dayjs();
if (args.y) {
  dateTime = dateTime.year(args.y);
}
if (args.m) {
  // monthはゼロインデックス(0~11)だが、引数は1~12を受け取るため-1している
  dateTime = dateTime.month(args.m - 1);
}

const MONTH_HEADER_LENGTH = 12;
const YEAR_HEADER_LENGTH = 8;
const DAY_CELL_LENGTH = 2;

const rightAlignedFullMonthName = dateTime
  .format("MMMM")
  .padStart(MONTH_HEADER_LENGTH, " ");
process.stdout.write(rightAlignedFullMonthName);

process.stdout.write(" ");

const leftAlignedFourDigitYear = dateTime
  .format("YYYY")
  .padEnd(YEAR_HEADER_LENGTH, " ");
console.log(leftAlignedFourDigitYear);

dateTime
  .localeData()
  .weekdaysMin()
  .forEach((TheMinNameOfweekday) => {
    process.stdout.write(TheMinNameOfweekday);
    if (TheMinNameOfweekday !== "Sa") {
      process.stdout.write(" ");
    }
  });

console.log();

const startDay = dateTime.startOf("month");

for (let i = 0; i < startDay.day(); i++) {
  let whiteSpace = " ".repeat(DAY_CELL_LENGTH);
  process.stdout.write(whiteSpace);
  process.stdout.write(" ");
}

const endDay = dateTime.endOf("month");

// ms単位で比較されるのでtargetDay.isBefore(endDay)は最終日もtrueを返し、必要な回数ループを行ってくれる
for (
  let targetDay = startDay;
  targetDay.isBefore(endDay);
  targetDay = targetDay.add(1, "d")
) {
  let rightAlignedDayOfTheMonth = targetDay
    .format("D")
    .padStart(DAY_CELL_LENGTH, " ");
  if (targetDay.day() == 6) {
    process.stdout.write(rightAlignedDayOfTheMonth);
    console.log();
  } else if (targetDay.date() === endDay.date()) {
    process.stdout.write(rightAlignedDayOfTheMonth);
  } else {
    process.stdout.write(rightAlignedDayOfTheMonth);
    process.stdout.write(" ");
  }
}

console.log();
