import dayjs from "dayjs";
import "dayjs/locale/en.js";
import localeData from "dayjs/plugin/localeData.js";
import objectSupport from "dayjs/plugin/objectSupport.js";

dayjs.extend(localeData);
dayjs.extend(objectSupport);
dayjs.locale("en");

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

function buildHeader(seedDate) {
  const calendarWidth = 20;
  const monthName = seedDate.format("MMMM");
  const year = seedDate.format("YYYY");
  const headerWidth = monthName.length + year.length + 1;
  const whiteSpaces = " ".repeat((calendarWidth - headerWidth) / 2);

  const centeredHeader = `${whiteSpaces}${monthName} ${year}`;
  return centeredHeader;
}

function buildBody(seedDate) {
  const minNameOfWeekday = seedDate.localeData().weekdaysMin().join(" ");
  const dayCellLength = 2;

  let calendarGridValues = [];
  const startDate = seedDate.startOf("month");
  for (let i = 0; i < startDate.day(); i++) {
    const whiteSpaces = " ".repeat(dayCellLength);
    calendarGridValues.push(whiteSpaces);
  }

  const endDate = seedDate.endOf("month");
  for (
    let dayOfMonth = startDate.date();
    dayOfMonth <= endDate.date();
    dayOfMonth++
  ) {
    const rightAlignedDay = dayOfMonth.toString().padStart(dayCellLength, " ");
    calendarGridValues.push(rightAlignedDay);
  }

  const columnCount = 7;
  let body = [minNameOfWeekday];
  for (let i = 0; i < calendarGridValues.length; i += columnCount) {
    body.push(calendarGridValues.slice(i, i + columnCount).join(" "));
  }
  return body;
}
