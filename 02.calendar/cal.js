#! /usr/bin/env node

import dayjs from "dayjs";
import "dayjs/locale/en.js";
import localeData from "dayjs/plugin/localeData.js";
import minimist from "minimist";

dayjs.extend(localeData);
dayjs.locale("en");

let args = minimist(process.argv.slice(2));
let dateTime = dayjs();
if (args.y) {
  dateTime = dateTime.year(args.y);
}
if (args.m) {
  // monthはゼロインデックス(0~11)だが、引数は1~12を受け取るため-1している
  dateTime = dateTime.month(args.m - 1);
}

const MONTH_CELL_LENGTH = 12;
const YEAR_CELL_LENGTH = 8;
const WEEKDAY_CELL_LENGTH = 2;
const DAY_CELL_LENGTH = 2;

process.stdout.write(dateTime.format("MMMM").padStart(MONTH_CELL_LENGTH, " "));
console.log(dateTime.format(" YYYY").padEnd(YEAR_CELL_LENGTH, " "));

dateTime
  .localeData()
  .weekdaysMin()
  .forEach((weekday) => {
    process.stdout.write(weekday.padStart(WEEKDAY_CELL_LENGTH, " "));
    process.stdout.write(" ");
  });

console.log();

let startDay = dateTime.startOf("month");

for (let i = 0; i < startDay.day(); i++) {
  process.stdout.write(" ".repeat(DAY_CELL_LENGTH));
  process.stdout.write(" ");
}

let endDay = dateTime.endOf("month");

for (let i = startDay.format("D"); i <= endDay.format("D"); i++) {
  let targetDay = dateTime.date(i);
  if (targetDay.day() == 6) {
    process.stdout.write(targetDay.format("D").padStart(DAY_CELL_LENGTH, " "));
    console.log(" ");
  } else {
    process.stdout.write(targetDay.format("D").padStart(DAY_CELL_LENGTH, " "));
    process.stdout.write(" ");
  }
}

console.log();
