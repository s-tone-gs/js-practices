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
  const calenderWidth = 20;
  const monthName = seedDate.format("MMMM");
  const year = seedDate.format("YYYY");
  const headerWidth = monthName.length + year.length + 1;
  const whiteSpaces = " ".repeat((calenderWidth - headerWidth) / 2);

  const canteredHeader = `${whiteSpaces}${monthName} ${year}`;
  return canteredHeader;
}

function buildBody(seedDate) {
  const minNameOfWeekday = seedDate.localeData().weekdaysMin().join(" ");
  const dayCellLength = 2;

  let calenderGridValues = [];
  const startDate = seedDate.startOf("month");
  for (let i = 0; i < startDate.day(); i++) {
    const whiteSpaces = " ".repeat(dayCellLength);
    calenderGridValues.push(whiteSpaces);
  }

  const endDate = seedDate.endOf("month");
  for (let day = startDate.date(); day <= endDate.date(); day++) {
    const rightAlignedDay = day.toString().padStart(dayCellLength, " ");
    calenderGridValues.push(rightAlignedDay);
  }

  const columnCount = 7;
  let body = [minNameOfWeekday];
  for (let i = 0; i < calenderGridValues.length; i += columnCount) {
    body.push(calenderGridValues.slice(i, i + columnCount).join(" "));
  }
  return body;
}
