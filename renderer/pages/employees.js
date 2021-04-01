import Head from 'next/head';
import {getLayout} from '@/layouts/DashboardLayout';
import {Aside} from '@/dashboard/Sidebar';
import useSWR, {mutate} from 'swr';
import {axios} from '@/lib/axios-config';
import {Main} from '@/dashboard/Main';
import {Button} from '@/components/common/Buttons';
import {Title} from '@/components/common/Title';

import {useState, useEffect, useContext} from 'react';
import {DashboardContext} from '@/contexts/DashboardContext';

import {easter} from 'date-easter';
import addDays from 'date-fns/addDays';
import {format} from 'date-fns';
import {pl} from 'date-fns/locale';

import {useRouter} from 'next/router';
import {confirmAlert} from 'react-confirm-alert';
import {Alert} from '@/common/Alert';

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
  grid-gap: 2rem;
`;
const HolidaysContent = styled.section`
  color: var(--c-white);
  font-weight: var(--fw-light);
  font-size: var(--fs-text);
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
  padding: var(--xs) var(--normal);
  margin: var(--xxs) 0;

  & span {
    margin: 0;
    display: block;
    line-height: 0.9;
    text-align: right;
    text-shadow: -2px -2px 2px var(--c-blue-01);
    width: 100%;
  }

  .specialDate {
    font-size: 5rem;
  }

  .specialDayName {
    font-size: 3rem;
    display: inline-block;
    text-transform: capitalize;
  }

  .specialWeekNumber {
    font-size: 1.8rem;
    display: inline-block;
  }

  .specialTime {
    font-size: 3rem;
  }
`;

const getCurrentYearPublicHolidays = (currentYear) => {
  const fixedHolidays = [
    {year: currentYear, month: 1, day: 1, name: 'Nowy Rok'},
    {year: currentYear, month: 1, day: 6, name: 'Święto Trzech Króli'},
    {year: currentYear, month: 5, day: 1, name: 'Święto Pracy'},
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

const Employees = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  // eslint-disable-next-line no-unused-vars
  const [holidaysData, setHolidaysData] = useState({});
  const [publicHolidays, setPublicHolidays] = useContext(DashboardContext).publicHolidays;
  const {data, error} = useSWR(`/api/holidays/${currentYear}`);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const tick = () => setDate(new Date());
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  useEffect(() => {
    if (publicHolidays.length === 0 && data) {
      setPublicHolidays((publicHolidays) => {
        const holidaysArray = data.public_holidays;
        return holidaysArray?.sort((a, b) =>
          // eslint-disable-next-line no-nested-ternary
          a.month > b.month ? 1 : a.month === b.month ? (a.day > b.day ? 1 : -1) : -1
        );
      });
    }
  }, [data, publicHolidays, setPublicHolidays]);

  if (error) {
    return (
      <>
        {confirmAlert({
          customUI: ({onClose}) => (
            <Alert
              title="Błąd serwera"
              message="Nie udało pobrać się niezbędnych danych!"
              yesButtonLabel="Zaloguj"
              isNoButtonPresent={false}
              yesAction={() => {
                router.push('/employees');
                onClose();
              }}
            />
          ),
        })}
      </>
    );
  }

  const getCurrentYearPublicHolidaysHandler = () => {
    getCurrentYearPublicHolidays(currentYear);
    mutate('/api/holidays', async () => {
      const updatedHolidays = await axios.get(`/api/holidays/${currentYear}`);
      setHolidaysData((holidaysData) => updatedHolidays);
    });
  };

  return (
    <>
      <Head>
        <title>Pracownicy</title>
      </Head>
      <Aside />
      <Main>
        <HolidaysTitle>
          <Title>Dni ustawowo wolne od pracy Święta Państwowe</Title>
          {/* show only when no holidays data for the current year is present in DB */}
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
            <span className="specialDayName">{format(new Date(), 'cccc', {locale: pl})}</span>
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
