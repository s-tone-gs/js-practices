import { expect, test } from "vitest";
import MockDate from "mockdate";
import { outdent } from "outdent";
import { buildCalendar } from "./buildCalendar.js";

test("no option", () => {
  MockDate.set("2025-12-1");
  const expected = outdent`
    ${outdent}
       December 2025
    Su Mo Tu We Th Fr Sa
        1  2  3  4  5  6
     7  8  9 10 11 12 13
    14 15 16 17 18 19 20
    21 22 23 24 25 26 27
    28 29 30 31`;
  expect(buildCalendar({})).toBe(expected);
});

test("month-only option using the monthly median", () => {
  MockDate.set("2025-7-1");
  const expected = outdent`
    ${outdent}
         July 2025
    Su Mo Tu We Th Fr Sa
           1  2  3  4  5
     6  7  8  9 10 11 12
    13 14 15 16 17 18 19
    20 21 22 23 24 25 26
    27 28 29 30 31`;
  expect(buildCalendar({ month: 7 })).toBe(expected);
});

test("year and month options using the median value", () => {
  const expected = outdent`
    ${outdent}
         July 2035
    Su Mo Tu We Th Fr Sa
     1  2  3  4  5  6  7
     8  9 10 11 12 13 14
    15 16 17 18 19 20 21
    22 23 24 25 26 27 28
    29 30 31`;
  expect(buildCalendar({ year: 2035, month: 7 })).toBe(expected);
});

test("minimum value of month", () => {
  MockDate.set("2025");
  const expected = outdent`
    ${outdent}
        January 2025
    Su Mo Tu We Th Fr Sa
              1  2  3  4
     5  6  7  8  9 10 11
    12 13 14 15 16 17 18
    19 20 21 22 23 24 25
    26 27 28 29 30 31`;
  expect(buildCalendar({ month: 1 })).toBe(expected);
});

test("maximum value of month", () => {
  MockDate.set("2025");
  const expected = outdent`
    ${outdent}
       December 2025
    Su Mo Tu We Th Fr Sa
        1  2  3  4  5  6
     7  8  9 10 11 12 13
    14 15 16 17 18 19 20
    21 22 23 24 25 26 27
    28 29 30 31`;
  expect(buildCalendar({ month: 12 })).toBe(expected);
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
  expect(buildCalendar({ year: 1970, month: 1 })).toBe(expected);
});

test("maximum value of year", () => {
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
  expect(buildCalendar({ year: 2100, month: 1 })).toBe(expected);
});
