import { buildCalendar } from "./cal_method.js";
import { expect, test } from "vitest";

const LEADING_LINE_BREAK = /^[\n]+/;

test("calender 2025/1", () => {
  const expected = `
    January 2025
Su Mo Tu We Th Fr Sa
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30 31
  `
    .trimEnd()
    .replace(LEADING_LINE_BREAK, "");
  const options = { y: 2025, m: 1 };
  expect(buildCalendar(options)).toBe(expected);
});

test("calender 2025/7", () => {
  const expected = `
     July 2025
Su Mo Tu We Th Fr Sa
       1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 29 30 31
  `
    .trimEnd()
    .replace(LEADING_LINE_BREAK, "");
  const options = { y: 2025, m: 7 };
  expect(buildCalendar(options)).toBe(expected);
});

test("calender 2025/12", () => {
  const expected = `
   December 2025
Su Mo Tu We Th Fr Sa
    1  2  3  4  5  6
 7  8  9 10 11 12 13
14 15 16 17 18 19 20
21 22 23 24 25 26 27
28 29 30 31
  `
    .trimEnd()
    .replace(LEADING_LINE_BREAK, "");
  const options = { y: 2025, m: 12 };
  expect(buildCalendar(options)).toBe(expected);
});

test("calender 1970/1", () => {
  const expected = `
    January 1970
Su Mo Tu We Th Fr Sa
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31
  `
    .trimEnd()
    .replace(LEADING_LINE_BREAK, "");
  const options = { y: 1970, m: 1 };
  expect(buildCalendar(options)).toBe(expected);
});

test("calender 2035/1", () => {
  const expected = `
    January 2035
Su Mo Tu We Th Fr Sa
    1  2  3  4  5  6
 7  8  9 10 11 12 13
14 15 16 17 18 19 20
21 22 23 24 25 26 27
28 29 30 31
  `
    .trimEnd()
    .replace(LEADING_LINE_BREAK, "");
  const options = { y: 2035, m: 1 };
  expect(buildCalendar(options)).toBe(expected);
});

test("calender 2100/1", () => {
  const expected = `
    January 2100
Su Mo Tu We Th Fr Sa
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31
  `
    .trimEnd()
    .replace(LEADING_LINE_BREAK, "");
  const options = { y: 2100, m: 1 };
  expect(buildCalendar(options)).toBe(expected);
});
