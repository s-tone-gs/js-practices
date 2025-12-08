import { expect, test } from "vitest";
import { outdent } from "outdent";
import { buildCalendar } from "./cal_method.js";

test("minimum value of month", () => {
  const expected = outdent`
    ${outdent}
        January 2025
    Su Mo Tu We Th Fr Sa
              1  2  3  4
     5  6  7  8  9 10 11
    12 13 14 15 16 17 18
    19 20 21 22 23 24 25
    26 27 28 29 30 31`;
  expect(buildCalendar(2025, 1)).toBe(expected);
});

test("median of month", () => {
  const expected = outdent`
    ${outdent}
         July 2025
    Su Mo Tu We Th Fr Sa
           1  2  3  4  5
     6  7  8  9 10 11 12
    13 14 15 16 17 18 19
    20 21 22 23 24 25 26
    27 28 29 30 31`;
  expect(buildCalendar(2025, 7)).toBe(expected);
});

test("maximum value of month", () => {
  const expected = outdent`
    ${outdent}
       December 2025
    Su Mo Tu We Th Fr Sa
        1  2  3  4  5  6
     7  8  9 10 11 12 13
    14 15 16 17 18 19 20
    21 22 23 24 25 26 27
    28 29 30 31`;
  expect(buildCalendar(2025, 12)).toBe(expected);
});

test("minimum value of year", () => {
  const expected = outdent`
  ${outdent}
      January 1970
  Su Mo Tu We Th Fr Sa
               1  2  3
   4  5  6  7  8  9 10
  11 12 13 14 15 16 17
  18 19 20 21 22 23 24
  25 26 27 28 29 30 31`;
  expect(buildCalendar(1970, 1)).toBe(expected);
});

test("median of year", () => {
  const expected = outdent`
  ${outdent}
      January 2035
  Su Mo Tu We Th Fr Sa
      1  2  3  4  5  6
   7  8  9 10 11 12 13
  14 15 16 17 18 19 20
  21 22 23 24 25 26 27
  28 29 30 31`;
  expect(buildCalendar(2035, 1)).toBe(expected);
});

test("maximum value of yaer", () => {
  const expected = outdent`
  ${outdent}
      January 2100
  Su Mo Tu We Th Fr Sa
                  1  2
   3  4  5  6  7  8  9
  10 11 12 13 14 15 16
  17 18 19 20 21 22 23
  24 25 26 27 28 29 30
  31`;
  expect(buildCalendar(2100, 1)).toBe(expected);
});
