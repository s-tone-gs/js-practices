#! /usr/bin/env node

import minimist from "minimist";
import { buildCalendar } from "./cal_method.js";

const options = minimist(process.argv.slice(2));
const yearAndMonth = {};
if (options.m) {
  // monthはゼロインデックス(0~11)だが、引数は1~12を受け取るため-1している
  yearAndMonth.month = options.m - 1;
}
if (options.y) {
  yearAndMonth.year = options.y;
}
// {}の場合は今日の年、月のカレンダーが生成される
console.log(buildCalendar(yearAndMonth));
