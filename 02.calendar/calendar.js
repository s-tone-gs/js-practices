import dayjs from "dayjs";
import "dayjs/locale/en.js";
import localeData from "dayjs/plugin/localeData.js";
import minimist from "minimist";

dayjs.locale("en");

const ARGS = minimist(process.argv.slice(2));
const YEAR = Object.hasOwn(ARGS, "y") ? ARGS["y"] : dayjs().format("YYYY");
const TARGET_MONTH = Object.hasOwn(ARGS, "m")
  ? dayjs(`${YEAR}/${ARGS["m"]}`)
  : dayjs();
const START_DAY = TARGET_MONTH.startOf("month");
const END_DAY = TARGET_MONTH.endOf("month");
const MONTH_CELL_LENGTH = 12;
const YEAR_CELL_LENGTH = 8;
const WEEKDAY_CELL_LENGTH = 3;
const DAY_CELL_LENGTH = 3;

process.stdout.write(
  TARGET_MONTH.format("MMMM").padStart(MONTH_CELL_LENGTH, " "),
);
console.log(TARGET_MONTH.format(" YYYY").padEnd(YEAR_CELL_LENGTH, " "));

dayjs.extend(localeData);
dayjs()
  .localeData()
  .weekdaysMin()
  .forEach((weekday) =>
    process.stdout.write(weekday.padStart(WEEKDAY_CELL_LENGTH, " ")),
  );

console.log("");

for (let i = 0; i < START_DAY.day(); i++) {
  process.stdout.write(" ".repeat(DAY_CELL_LENGTH));
}

for (let i = START_DAY.format("D"); i <= END_DAY.format("D"); i++) {
  let targetDay = dayjs(`${YEAR}/${TARGET_MONTH.format("M")}/${i}`);
  if (targetDay.day() == 6) {
    console.log(targetDay.format("D").padStart(DAY_CELL_LENGTH, " "));
  } else {
    process.stdout.write(targetDay.format("D").padStart(DAY_CELL_LENGTH, " "));
  }
}

console.log("");
