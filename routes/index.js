const express = require('express');
const router = express.Router();
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const months = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

function constructMonth(selectedMonth, selectedYear) {
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
  const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
  const monthInfo = {
    selectedMonthName: months[selectedMonth],
    daysOfTheWeek: {
      0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
    }
  };
  const startingDay = firstDayOfMonth.getDay();
  if (startingDay !== 1) {
    // backfill blank days of week
    for (let j=0; j<startingDay; j++) {
      monthInfo.daysOfTheWeek[j].push('');
    }
  }
  for (let i=1; i<lastDayOfMonth.getDate()+1; i++) {
    const dayOfMonth = new Date(selectedYear, selectedMonth, i).getDay();
    monthInfo.daysOfTheWeek[dayOfMonth].push(i);
  }
  return monthInfo;
}

function constructNav(selectedMonth, selectedYear) {
  return {
    next: {
      month: selectedMonth === 11 ? 0 : selectedMonth + 1,
      year: selectedMonth === 11 ? selectedYear + 1 : selectedYear
    },
    prev: {
      month: selectedMonth === 0 ? 11 : selectedMonth - 1,
      year: selectedMonth === 0 ? selectedYear - 1 : selectedYear
    }
  };
}

/* GET home page. */
router.get('/:year?/:month?', function(req, res, next) {
  const selectedYear = req.params.year ? parseInt(req.params.year) : currentYear;
  const selectedMonth = req.params.month ? parseInt(req.params.month) : currentMonth;
  const monthInfo = constructMonth(selectedMonth, selectedYear);
  const nav = constructNav(selectedMonth, selectedYear);
  res.render('index', { calendarDays: monthInfo.daysOfTheWeek, monthName: monthInfo.selectedMonthName, year: selectedYear, nav: nav});
});

module.exports = router;




