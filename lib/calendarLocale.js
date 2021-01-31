export const plLocale = {
  // months list by order
  months: [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
  ],

  // week days by order
  weekDays: [
    {
      name: 'Poniedziałek',
      short: 'Pn',
    },
    {
      name: 'Wtorek',
      short: 'Wt',
    },
    {
      name: 'Środa',
      short: 'Śr',
    },
    {
      name: 'Czwartek',
      short: 'Cz',
    },
    {
      name: 'Piątek',
      short: 'Pt',
    },
    {
      name: 'Sobota',
      short: 'So',
      isWeekend: true,
    },
    {
      name: 'Niedziela', // used for accessibility
      short: 'Ni', // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 6,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit) {
    return digit;
  },

  // texts in the date picker
  nextMonth: 'Następny Miesiąc',
  previousMonth: 'Poprzedni Miesiąc',
  openMonthSelector: 'Otwórz wybór Miesiąca',
  openYearSelector: 'Otwórz wybór Roku',
  closeMonthSelector: 'Zamknij wybór Miesiąca',
  closeYearSelector: 'Zamknij wybór Roku',
  defaultPlaceholder: 'Wybierz...',

  // for input range value
  from: 'od',
  to: 'do',


  // used for input value when multi dates are selected
  digitSeparator: ',',

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
}