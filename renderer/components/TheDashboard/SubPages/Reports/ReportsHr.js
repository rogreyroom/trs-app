import styled from 'styled-components';
import {useState} from 'react';
import {Title} from '@/common/Title';
import {TextButton} from '@/common/Buttons';
import {Select} from '@/common/Inputs';
import {getEmployeeYears} from '@/lib/utils';
import useSWR from 'swr';
import HrEmployeesBonuses from './HrEmployeesBonuses';
import HrEmployeesRts from './HrEmployeesRts';

const StyledHrReportsPages = styled.section`
  grid-area: content;
  margin: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas: 'aside' 'content';
  grid-template-columns: max-content auto;
  grid-template-rows: 1fr;
`;

const StyledReportLinks = styled.section`
  border-right: 1px solid var(--c-blue-03);
  padding-top: var(--l);
  padding-right: var(--l);
  min-height: 100%;
  padding: var(--xl) var(--normal) var(--normal) var(--xl);

  display: grid;
  grid-template-areas: 'select1' 'select2' '.' 'button1' 'button2';
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 50px) var(--l) repeat(2, min-content);
  grid-gap: var(--l);

  & div:first-of-type {
    grid-area: select1;
  }

  & div:last-of-type {
    grid-area: select2;
  }

  & button:first-of-type {
    grid-area: button1;
  }

  & button:last-of-type {
    grid-area: button2;
  }
`;
const StyledReportPrintArea = styled.section`
  margin: 0;
  width: 100%;
`;

const getEmployeesYearsArray = (employees) => {
  console.log('getEmployeesYearsArray employees', employees);
  const employeesYears = employees.reduce((resArr, currEmployee) => {
    const {calendar} = currEmployee;
    const years = getEmployeeYears(calendar);
    // eslint-disable-next-line array-callback-return
    years.map((year) => {
      !resArr.includes(year) && resArr.push(year);
    });
    return resArr;
  }, []);

  return employeesYears.map((year) => ({label: year, value: year}));
};

const getEmployeeMonthsArray = () => [
  {label: 'Styczeń', value: 1},
  {label: 'Luty', value: 2},
  {label: 'Marzec', value: 3},
  {label: 'Kwiecień', value: 4},
  {label: 'Maj', value: 5},
  {label: 'Czerwiec', value: 6},
  {label: 'Lipiec', value: 7},
  {label: 'Sierpień', value: 8},
  {label: 'Wrzesień', value: 9},
  {label: 'Październik', value: 10},
  {label: 'Listopad', value: 11},
  {label: 'Grudzień', value: 12},
];

export const ReportsHr = () => {
  const [reportPage, setReportPage] = useState(null);
  const defaultYear = new Date().getFullYear();
  const defaultMonth = new Date().getMonth() + 1;
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);
  const [yearsOptions, setYearsOptions] = useState(null);
  const [monthsOptions, setMonthsOptions] = useState(null);
  const {data, error} = useSWR('/api/employees');

  if (error) return <h1>Something went wrong on the server!</h1>;
  if (!data) return <h1>Loading data from server...</h1>;

  const employees = data;

  if (employees !== null) {
    yearsOptions === null && setYearsOptions((yearsOptions) => getEmployeesYearsArray(employees));
    monthsOptions === null && setMonthsOptions((monthsOptions) => getEmployeeMonthsArray());

    const handleYearChange = (e) => {
      const {value} = e.target;
      setYear((year) => parseInt(value, 10));
    };

    const handleMonthChange = (e) => {
      const {value} = e.target;
      setMonth((month) => parseInt(value, 10));
    };

    const handleReportPageClick = (pageName) => {
      setReportPage((reportPage) => pageName);
    };

    return (
      <>
        <Title isWhite>Raporty dla HR</Title>
        <StyledHrReportsPages>
          <StyledReportLinks>
            <Select
              name="year"
              label="Rok"
              optionsArray={yearsOptions}
              onChange={handleYearChange}
              selected={year}
            />
            <Select
              name="month"
              label="Miesiąc"
              optionsArray={monthsOptions}
              onChange={handleMonthChange}
              selected={month}
            />
            <TextButton
              isActive={reportPage === 'hrEmployeesRts'}
              onClickAction={() => handleReportPageClick('hrEmployeesRts')}
            >
              Raport RCP
            </TextButton>
            <TextButton
              isActive={reportPage === 'hrEmployeesBonuses'}
              onClickAction={() => handleReportPageClick('hrEmployeesBonuses')}
            >
              Raport premii
            </TextButton>
          </StyledReportLinks>
          <StyledReportPrintArea>
            {reportPage === 'hrEmployeesBonuses' ? (
              <HrEmployeesBonuses year={year} month={month} employees={employees} />
            ) : null}
            {reportPage === 'hrEmployeesRts' ? (
              <HrEmployeesRts year={year} month={month} employees={employees} />
            ) : null}
          </StyledReportPrintArea>
        </StyledHrReportsPages>
      </>
    );
  }
};
