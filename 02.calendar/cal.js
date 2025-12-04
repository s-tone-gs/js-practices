#! /usr/bin/env node

import dayjs from "dayjs";
import "dayjs/locale/en.js";
import localeData from "dayjs/plugin/localeData.js";
import objectSupport from "dayjs/plugin/objectSupport.js";
import minimist from "minimist";

dayjs.extend(localeData);
dayjs.extend(objectSupport);
dayjs.locale("en");

function buildArgs() {
  const options = minimist(process.argv.slice(2));
  let args = {};
  if (options.m) {
    // monthはゼロインデックス(0~11)だが、引数は1~12を受け取るため-1している
    args.month = options.m - 1;
  }
  if (options.y) {
    args.year = options.y;
  }
  return args;
}

// 引数が{}の場合は現在の日時のオブジェクトが生成される
const seedDate = dayjs(buildArgs());
const monthName = seedDate.format("MMMM");
const year = seedDate.format("YYYY");
const HEADER_LENGTH = 20;
const monthHeaderLength =
  (HEADER_LENGTH - (monthName.length + year.length + 1)) / 2 + monthName.length;
const yearHeaderLength =
  (HEADER_LENGTH - (monthName.length + year.length + 1)) / 2 + year.length;
const DAY_CELL_LENGTH = 2;

// ここからHeaderの描画
const rightAlignedMonthName = monthName.padStart(monthHeaderLength, " ");
process.stdout.write(rightAlignedMonthName);

process.stdout.write(" ");

const leftAlignedYear = year.padEnd(yearHeaderLength, " ");
console.log(leftAlignedYear);

// ここからBodyの描画
seedDate
  .localeData()
  .weekdaysMin()
  .forEach((minNameOfWeekday) => {
    process.stdout.write(minNameOfWeekday);
    if (minNameOfWeekday !== "Sa") {
      process.stdout.write(" ");
    }
  });

console.log();

const startDate = seedDate.startOf("month");

for (let i = 0; i < startDate.day(); i++) {
  const whiteSpaces = " ".repeat(DAY_CELL_LENGTH);
  process.stdout.write(whiteSpaces);
  process.stdout.write(" ");
}

const endDate = seedDate.endOf("month");

// ms単位で比較されるのでtargetDate.isBefore(endDate)は最終日もtrueを返し、必要な回数ループを行ってくれる
for (
  let targetDate = startDate;
  targetDate.isBefore(endDate);
  targetDate = targetDate.add(1, "d")
) {
  const rightAlignedDayOfTheMonth = targetDate
    .format("D")
    .padStart(DAY_CELL_LENGTH, " ");
  process.stdout.write(rightAlignedDayOfTheMonth);
  if (targetDate.day() == 6) {
    console.log();
  } else if (targetDate.date() !== endDate.date()) {
    process.stdout.write(" ");
  }
}

console.log();
