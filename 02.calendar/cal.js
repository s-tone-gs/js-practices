#! /usr/bin/env node

import dayjs from "dayjs";
import "dayjs/locale/en.js";
import localeData from "dayjs/plugin/localeData.js";
dayjs.extend(localeData);
import minimist from "minimist";

dayjs.locale("en");

var args = minimist(process.argv.slice(2));
var dayjs_object = dayjs();
if (Object.hasOwn(args, "y")) {
  dayjs_object = dayjs_object.year(args["y"]);
}
if (Object.hasOwn(args, "m")) {
  // monthはゼロインデックス(0~11)だが、引数は1~12を受け取るため-1している
  dayjs_object = dayjs_object.month(args["m"] - 1);
}
var start_day = dayjs_object.startOf("month");
var end_day = dayjs_object.endOf("month");

const MONTH_CELL_LENGTH = 12;
const YEAR_CELL_LENGTH = 8;
const WEEKDAY_CELL_LENGTH = 2;
const DAY_CELL_LENGTH = 2;

process.stdout.write(
  dayjs_object.format("MMMM").padStart(MONTH_CELL_LENGTH, " "),
);
console.log(dayjs_object.format(" YYYY").padEnd(YEAR_CELL_LENGTH, " "));

dayjs_object
  .localeData()
  .weekdaysMin()
  .forEach((weekday) => {
    process.stdout.write(weekday.padStart(WEEKDAY_CELL_LENGTH, " "));
    process.stdout.write(" ");
  });

console.log();

for (let i = 0; i < start_day.day(); i++) {
  process.stdout.write(" ".repeat(DAY_CELL_LENGTH));
  process.stdout.write(" ");
}

for (let i = start_day.format("D"); i <= end_day.format("D"); i++) {
  let targetDay = dayjs_object.date(i);
  if (targetDay.day() == 6) {
    process.stdout.write(targetDay.format("D").padStart(DAY_CELL_LENGTH, " "));
    console.log(" ");
  } else {
    process.stdout.write(targetDay.format("D").padStart(DAY_CELL_LENGTH, " "));
    process.stdout.write(" ");
  }
}

console.log();
