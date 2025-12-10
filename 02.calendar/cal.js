#! /usr/bin/env node

import minimist from "minimist";
import { buildCalendar } from "./buildCalendar.js";

const options = minimist(process.argv.slice(2));
const yearAndMonth = {};
if (options.m) {
  yearAndMonth.month = options.m;
}
if (options.y) {
  yearAndMonth.year = options.y;
}
// {}の場合は今日の年、月のカレンダーが生成される
console.log(buildCalendar(yearAndMonth));
