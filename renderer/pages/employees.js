import {getLayout} from '@/layouts/DashboardLayout';
import {Aside} from '@/dashboard/Sidebar';
import useSWR, {mutate} from 'swr';
import {axios} from '@/lib/axios-config';
import {Main} from '@/dashboard/Main';
import {Button} from '@/components/common/Buttons';
import {Title} from '@/components/common/Title';

import {useState, useEffect} from 'react';

import {easter} from 'date-easter';
import addDays from 'date-fns/addDays';
import {format} from 'date-fns';
// import parseISO from 'date-fns/parseISO';

import styled from 'styled-components';

const HolidaysTitle = styled.section`
  grid-area: title;
  display: flex;
  align-items: center;
  gap: var(--l);
`;
const HolidaysWrapper = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: 1fr 500px;
`;
const HolidaysContent = styled.section`
  color: var(--c-white);
  font-weight: var(--fw-light);
  font-size: var(--fs-text);
  /* text-align: center; */
  padding: var(--xs) var(--normal);
  margin: var(--xxs) 0;

  & span {
    font-weight: var(--fw-normal);
  }
`;
const SpecialDateTimeDecorator = styled.div`
  color: var(--c-blue-03);
  font-weight: var(--fw-black);
  font-size: var(--fs-h1);
  /* text-align: center; */
  padding: var(--xs) var(--normal);
  margin: var(--xxs) 0;

  & span {
    margin: 0;
    display: block;
    line-height: 0.8;
    text-align: right;
    width: 100%;
  }

  .specialDate {
    font-size: 5rem;
  }

  .specialDayName {
    font-size: 3rem;
    display: inline-block;
  }

  .specialWeekNumber {
    font-size: 1.8rem;
    display: inline-block;
  }

  .specialTime {
    font-size: 3rem;
  }
`;

const getEmployees = () => axios.get('/api/employees');
const createCalendarForCurrentYear = async (currentYear, yearData) => {
  const monthsArray = [];
  const {
    hourly_rate,
    overtime_rate,
    holiday_rate,
    sick_leave_rate,
    other_leave_rate,
    insurance_rate,
    retainment_rate,
    bonus_rate,
    to_account_rate,
    overtime_rate_multiplier,
    overtime_hours_multiplier,
  } = yearData;

  for (let idx = 1; idx <= 12; idx += 1) {
    monthsArray.push({
      month: idx,
      holiday_leave: [],
      sick_leave: [],
      other_leave: [],
      rts: [],
      hourly_rate,
      overtime_rate,
      holiday_rate,
      sick_leave_rate,
      other_leave_rate,
      insurance_rate,
      retainment_rate,
      bonus_rate,
      to_account_rate,
      overtime_rate_multiplier,
      overtime_hours_multiplier,
    });
  }

  return {
    year: currentYear,
    months: monthsArray,
  };
};

const getCurrentYearPublicHolidays = (currentYear) => {
  // 18-03-2021
  // easter = require('date-easter')
  // addDays = require('date-fns/addDays')

  const fixedHolidays = [
    {year: currentYear, month: 1, day: 1, name: 'Nowy Rok'},
    {year: currentYear, month: 1, day: 6, name: 'Święto Trzech Króli'},
    {year: currentYear, month: 5, day: 1, name: 'Świętem Pracy'},
    {year: currentYear, month: 5, day: 3, name: 'Święto Narodowe Trzeciego Maja'},
    {year: currentYear, month: 8, day: 15, name: 'Wniebowzięcie Najświętszej Marii Panny'},
    {year: currentYear, month: 11, day: 1, name: 'Wszystkich Świętych'},
    {year: currentYear, month: 11, day: 11, name: 'Narodowe Święto Niepodległości'},
    {year: currentYear, month: 12, day: 25, name: 'Pierwszy dzień Bożego Narodzenia'},
    {year: currentYear, month: 12, day: 26, name: 'Drugi dzień Bożego Narodzenia'},
  ];

  // Ester - Wielkanoc
  const esterDay = easter(currentYear);

  // Ester Monday - Poniedziałek Wielkanocny
  const esterMondayDay = addDays(new Date(esterDay.toString()), 1);

  // Pentecost - Zesłanie Ducha Świętego
  const pentecostDay = addDays(new Date(esterDay.toString()), 49);

  // Feast of Corpus Christi -  Boże Ciało
  const corpusChristiDay = addDays(new Date(esterDay.toString()), 60);

  const movableHolidays = [
    {
      ...esterDay,
      name: 'Wielkanoc',
    },
    {
      year: esterMondayDay.getFullYear(),
      month: esterMondayDay.getMonth() + 1,
      day: esterMondayDay.getDate(),
      name: 'Poniedziałek Wielkanocny',
    },
    {
      year: pentecostDay.getFullYear(),
      month: pentecostDay.getMonth() + 1,
      day: pentecostDay.getDate(),
      name: 'Zesłanie Ducha Świętego',
    },
    {
      year: corpusChristiDay.getFullYear(),
      month: corpusChristiDay.getMonth() + 1,
      day: corpusChristiDay.getDate(),
      name: 'Boże Ciało',
    },
  ];

  const publicHolidaysArray = {
    doc: 'holidays',
    year: currentYear,
    public_holidays: [...fixedHolidays, ...movableHolidays],
  };
  axios.post(`/api/holidays/`, publicHolidaysArray);
};

// ===================================================================================

const Employees = () => {
  const employees = getEmployees();
  const currentYear = new Date().getFullYear();
  const [holidaysData, setHolidaysData] = useState({});
  const [publicHolidays, setPublicHolidays] = useState([]);
  const {data, error} = useSWR(`/api/holidays/${currentYear}`);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const tick = () => setDate(new Date());
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  // useEffect(() => {
  //   setHolidaysData((holidaysData) => data);
  // }, [data, holidaysData]);

  // if (error) return <h1>Something went wrong on the server!</h1>;
  error && console.log('ERROR', error);

  // console.log(getHolidays, publicHolidays);

  data && console.log('DATA', data, holidaysData);

  if (publicHolidays.length === 0 && data) {
    console.log('HMMMMMM', publicHolidays, holidaysData);

    setPublicHolidays((publicHolidays) => {
      const holidaysArray = data.public_holidays;
      return holidaysArray?.sort((a, b) =>
        // eslint-disable-next-line no-nested-ternary
        a.month > b.month ? 1 : a.month === b.month ? (a.day > b.day ? 1 : -1) : -1
      );
    });
  }

  // TODO: refactor to get rid of callbacks
  employees
    .then((res) => {
      // eslint-disable-next-line array-callback-return
      res.data.map((employee) => {
        const employeeCalendar = employee.calendar;
        const hasCurrentYear = employeeCalendar.find(({year}) => year === currentYear);
        if (!hasCurrentYear) {
          const previousYearMonthsData = employeeCalendar.filter(
            ({year}) => year === currentYear - 1
          )[0].months;
          const previousYearLastMonthData =
            previousYearMonthsData[previousYearMonthsData.length - 1];
          const newData = createCalendarForCurrentYear(currentYear, previousYearLastMonthData);
          newData
            .then((monthsData) => {
              axios.put(`/api/employees/${employee._id}`, {
                field: 'newYear',
                value: {...monthsData},
              });
            })
            .catch((monthsErr) => console.error(monthsErr));
        }
      });
    })
    .catch((err) => console.error(err));

  mutate('employees');

  const getCurrentYearPublicHolidaysHandler = () => {
    getCurrentYearPublicHolidays(currentYear);
    // const updatedData = getPublicHolidays(currentYear);
    mutate('/api/holidays', async () => {
      const updatedHolidays = await axios.get(`/api/holidays/${currentYear}`);
      setHolidaysData((holidaysData) => updatedHolidays);
    });
    // setGetHolidays((getHolidays) => true);

    // console.log('holidaysData', holidaysData);
  };

  return (
    <>
      <Aside />
      <Main>
        <HolidaysTitle>
          <Title>Dni ustawowo wolne od pracy Święta Państwowe</Title>
          {/* show only when no holidays data for current year */}
          {publicHolidays.length === 0 && (
            <Button type="button" onClickAction={getCurrentYearPublicHolidaysHandler}>
              Pobierz święta dla obecnego roku
            </Button>
          )}
        </HolidaysTitle>
        <HolidaysWrapper>
          <HolidaysContent>
            {publicHolidays &&
              publicHolidays.map((holiday, idx) => {
                const theDay = format(
                  new Date(holiday.year, holiday.month - 1, holiday.day),
                  'yyyy.MM.dd'
                );
                return (
                  <p key={idx}>
                    <span>{theDay}</span> - {holiday.name}
                  </p>
                );
              })}
          </HolidaysContent>
          <SpecialDateTimeDecorator>
            <span className="specialDate">{format(new Date(), 'yyyy.MM.dd')}</span>
            <span className="specialDayName">{format(new Date(), 'cccc')}</span>
            <span className="specialTime">{format(date, 'kk:mm:ss')}</span>
            <span className="specialWeekNumber">TK {format(new Date(), 'II')}</span>
          </SpecialDateTimeDecorator>
        </HolidaysWrapper>
      </Main>
    </>
  );
};

Employees.getLayout = getLayout;
export default Employees;
