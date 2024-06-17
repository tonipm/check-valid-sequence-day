const fs = require('fs');

const FILENAME = 'days.csv';
const DAY_POSITION = 0;
const READ_FIRST_LINE = false;

const main = () => {
  console.log('Starting ...');

  const rows = readFile();
  const days = getDays(rows);
  const missingDays = getMissingDays(days);
  printSummary(missingDays);
};

const readFile = () => {
  const data = fs.readFileSync(FILENAME, 'utf8');
  return data.split('\n');
};

const getDays = (rows) => {
  const firstLine = READ_FIRST_LINE ? 0 : 1;
  const days = [];
  for (let i = firstLine; i < rows.length; i++) {
    const columns = rows[i].split(',');
    const day = Date.parse(columns[DAY_POSITION]);
    if (isValidDate(day)) {
      days.push(day);
    }
  }
  return days;
};

const getMissingDays = (days) => {
  const missingDays = [];
  for (let i = 0; i < days.length - 1; i++) {
    const currentDay = days[i];
    const nextDay = days[i + 1];

    const isValid = isValidNextDay(currentDay, nextDay);
    if (!isValid) {
      const difference = getDifferenceInDays(currentDay, nextDay);
      const currentDate = new Date(currentDay);
      for (let n = 0; n < difference - 1; n++) {
        const missingDay = new Date(currentDate);
        missingDay.setDate(missingDay.getDate() - n - 1);
        missingDays.push(missingDay);
      }
    }
  }
  return missingDays;
};

const printSummary = (missingDays) => {
  if (missingDays.length === 0) {
    console.log('Success!');
  } else {
    console.log('Failed! Invalid days:');
    missingDays.forEach((day) => {
      console.log(new Date(day).toISOString().split('T')[0]);
    });
  }
};

const isValidDate = (stringDate) => {
  return !isNaN(stringDate);
};

const isValidNextDay = (currentDay, nextDay) => {
  return getDifferenceInDays(currentDay, nextDay) === 1;
};

const getDifferenceInDays = (currentDay, nextDay) => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return (currentDay - nextDay) / MS_PER_DAY;
};

main();
