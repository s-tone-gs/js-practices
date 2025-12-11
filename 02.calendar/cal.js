#! /usr/bin/env node

import minimist from "minimist";
import { buildCalendar } from "./buildCalendar.js";

const options = minimist(process.argv.slice(2));
console.log(buildCalendar({ year: options.y, month: options.m }));
