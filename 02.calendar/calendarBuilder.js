import dayjs from "dayjs";
import "dayjs/locale/en.js";
import localeData from "dayjs/plugin/localeData.js";
import objectSupport from "dayjs/plugin/objectSupport.js";

dayjs.extend(localeData);
dayjs.extend(objectSupport);
dayjs.locale("en");

const CELL_WIDTH = 2;
const WORD_SPACING = 1;
const COLUMN_COUNT = 7;

function buildHeader(seedDate) {
  const monthName = seedDate.format("MMMM");
  const year = seedDate.format("YYYY");
  const headerWidth = monthName.length + year.length + WORD_SPACING;
  const calendarWidth =
    CELL_WIDTH * COLUMN_COUNT + WORD_SPACING * (COLUMN_COUNT - 1);
  const indentations = " ".repeat((calendarWidth - headerWidth) / 2);
  const spaceDelimiter = " ".repeat(WORD_SPACING);

  const centeredHeader = `${indentations}${monthName}${spaceDelimiter}${year}`;
  return centeredHeader;
}

function buildBody(seedDate) {
  const calendarGridValues = [];
  const startDate = seedDate.startOf("month");
  for (let i = 0; i < startDate.day(); i++) {
    const indentations = " ".repeat(CELL_WIDTH);
    calendarGridValues.push(indentations);
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

  const spaceDelimiter = " ".repeat(WORD_SPACING);
  const minNameOfWeekday = seedDate
    .localeData()
    .weekdaysMin()
    .join(spaceDelimiter);
  const body = [minNameOfWeekday];
  for (let i = 0; i < calendarGridValues.length; i += COLUMN_COUNT) {
    body.push(
      calendarGridValues.slice(i, i + COLUMN_COUNT).join(spaceDelimiter),
    );
  }
  return body;
}

export function buildCalendar({ year, month }) {
  const seedDate = dayjs({ year, month: month - 1 });
  return [buildHeader(seedDate), ...buildBody(seedDate)].join("\n");
}
