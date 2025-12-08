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

function buildHeader(seedDate) {
  const monthName = seedDate.format("MMMM");
  const year = seedDate.format("YYYY");
  const headerWidth = monthName.length + year.length + GAP_WIDTH;
  const calendarWidth =
    CELL_WIDTH * COLUMN_COUNT + GAP_WIDTH * (COLUMN_COUNT - 1);
  const whiteSpaces = " ".repeat((calendarWidth - headerWidth) / 2);
  const gap = " ".repeat(GAP_WIDTH);

  const centeredHeader = `${whiteSpaces}${monthName}${gap}${year}`;
  return centeredHeader;
}

function buildBody(seedDate) {
  const calendarGridValues = [];
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

  const gap = " ".repeat(GAP_WIDTH);
  const minNameOfWeekday = seedDate.localeData().weekdaysMin().join(gap);
  const body = [minNameOfWeekday];
  for (let i = 0; i < calendarGridValues.length; i += COLUMN_COUNT) {
    body.push(calendarGridValues.slice(i, i + COLUMN_COUNT).join(gap));
  }
  return body;
}

export function buildCalendar(yearAndMonth) {
  const seedDate = dayjs(yearAndMonth);
  return [buildHeader(seedDate), ...buildBody(seedDate)].join("\n");
}
