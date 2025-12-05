import dayjs from "dayjs";
import "dayjs/locale/en.js";
import localeData from "dayjs/plugin/localeData.js";
import objectSupport from "dayjs/plugin/objectSupport.js";

dayjs.extend(localeData);
dayjs.extend(objectSupport);
dayjs.locale("en");

const CELL_WIDTH = 2;
const GAP_WIDTH = 1;
const COLUMN_COUNT = 7;

export function buildCalendar(options) {
  const seedDate = dayjs(buildArgs(options));
  return [buildHeader(seedDate), ...buildBody(seedDate)].join("\n");
}

function buildArgs(options) {
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

const gap = " ".repeat(GAP_WIDTH);

function buildHeader(seedDate) {
  const monthName = seedDate.format("MMMM");
  const year = seedDate.format("YYYY");
  const headerWidth = monthName.length + year.length + gap.length;
  const calendarWidth =
    CELL_WIDTH * COLUMN_COUNT + GAP_WIDTH * (COLUMN_COUNT - 1);
  const whiteSpaces = " ".repeat((calendarWidth - headerWidth) / 2);

  const centeredHeader = `${whiteSpaces}${monthName}${gap}${year}`;
  return centeredHeader;
}

function buildBody(seedDate) {
  let calendarGridValues = [];
  const startDate = seedDate.startOf("month");
  for (let i = 0; i < startDate.day(); i++) {
    const whiteSpaces = " ".repeat(CELL_WIDTH);
    calendarGridValues.push(whiteSpaces);
  }

  const endDate = seedDate.endOf("month");
  for (
    let dayOfMonth = startDate.date();
    dayOfMonth <= endDate.date();
    dayOfMonth++
  ) {
    const rightAlignedDayOfMonth = dayOfMonth
      .toString()
      .padStart(CELL_WIDTH, " ");
    calendarGridValues.push(rightAlignedDayOfMonth);
  }

  const minNameOfWeekday = seedDate.localeData().weekdaysMin().join(gap);
  let body = [minNameOfWeekday];
  for (let i = 0; i < calendarGridValues.length; i += COLUMN_COUNT) {
    body.push(calendarGridValues.slice(i, i + COLUMN_COUNT).join(gap));
  }
  return body;
}
