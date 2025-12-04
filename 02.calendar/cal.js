#! /usr/bin/env node

import dayjs from "dayjs";
import "dayjs/locale/en.js";
import localeData from "dayjs/plugin/localeData.js";
import minimist from "minimist";

dayjs.extend(localeData);
dayjs.locale("en");

const args = minimist(process.argv.slice(2));
let seedDate = dayjs();
if (args.y) {
  seedDate = seedDate.year(args.y);
}
if (args.m) {
  // monthはゼロインデックス(0~11)だが、引数は1~12を受け取るため-1している
  seedDate = seedDate.month(args.m - 1);
}

const FullMonthName = seedDate.format("MMMM");
const FourDigitYear = seedDate.format("YYYY");
const HEADER_LENGTH = 20;
const monthHeaderLength =
  (HEADER_LENGTH - (FullMonthName.length + FourDigitYear.length + 1)) / 2 +
  FullMonthName.length;
const YearHeaderLength =
  (HEADER_LENGTH - (FullMonthName.length + FourDigitYear.length + 1)) / 2 +
  FourDigitYear.length;
const DAY_CELL_LENGTH = 2;

// ここからHeaderの描画
const rightAlignedFullMonthName = FullMonthName.padStart(
  monthHeaderLength,
  " ",
);
process.stdout.write(rightAlignedFullMonthName);

process.stdout.write(" ");

const leftAlignedFourDigitYear = FourDigitYear.padEnd(YearHeaderLength, " ");
console.log(leftAlignedFourDigitYear);

// ここからBodyの描画
seedDate
  .localeData()
  .weekdaysMin()
  .forEach((TheMinNameOfweekday) => {
    process.stdout.write(TheMinNameOfweekday);
    if (TheMinNameOfweekday !== "Sa") {
      process.stdout.write(" ");
    }
  });

console.log();

const startDate = seedDate.startOf("month");

for (let i = 0; i < startDate.day(); i++) {
  let whiteSpace = " ".repeat(DAY_CELL_LENGTH);
  process.stdout.write(whiteSpace);
  process.stdout.write(" ");
}

const endDate = seedDate.endOf("month");

// ms単位で比較されるのでtargetDate.isBefore(endDate)は最終日もtrueを返し、必要な回数ループを行ってくれる
for (
  let targetDate = startDate;
  targetDate.isBefore(endDate);
  targetDate = targetDate.add(1, "d")
) {
  let rightAlignedDayOfTheMonth = targetDate
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
