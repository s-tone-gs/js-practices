#! /usr/bin/env node

import minimist from "minimist";
import { buildCalendar } from "./cal_method.js";

const options = minimist(process.argv.slice(2));
console.log(buildCalendar(options));
