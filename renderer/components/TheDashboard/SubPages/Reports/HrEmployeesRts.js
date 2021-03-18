import {useRef, useState, useEffect} from 'react';
import format from 'date-fns/format';
import {
  getMonthName,
  getGivenMonthData,
  getCurrentMonthWorkedHours,
  getCurrentMonthOvertimeHours,
  getCurrentMonthWeekendsHours,
  getHolidayLeaveDaysForCurrentMonth,
  getSickLeaveDaysForCurrentMonth,
  getOtherLeaveDaysForCurrentMonth,
} from '@/lib/utils';
import {useReactToPrint} from 'react-to-print';
import {IconButton} from '@/common/Buttons';
import {SvgPrint, SvgRemove} from '@/icons';
import styled from 'styled-components';

const StyledHrRtsReport = styled.section`
  & button {
    margin-left: var(--xxl);
  }
`;

const StyledPrintArea = styled.div`
  margin: 0;
  padding: var(--xl);
  display: grid;
  grid-template-areas: 'header' 'table';
  grid-template-columns: 1fr;
  grid-gap: var(--xl);
  align-items: baseline;

  table,
  th,
  td {
    border: 1px solid var(--c-white);

    @media print {
      color: var(--c-print-black);
    }
  }

  & table {
    grid-area: table;
    margin: 0;
    border-collapse: collapse;
    width: 100%;

    @media print {
      max-width: 100%;
      margin: 0 auto;
    }
  }

  & tr {
    height: 45px;
  }

  & th {
    font-size: var(--fs-text);
    font-weight: var(--fw-light);
    color: var(--c-white);
    padding: 0.25em 0.5em;

    @media print {
      color: var(--c-print-black);
    }

    &:first-child {
      @media print {
        display: none;
      }
    }
  }

  & td {
    font-size: var(--fs-text);
    font-weight: var(--fw-light);
    text-align: center;
    color: var(--c-white);
    padding: var(--xxs) var(--m);

    @media print {
      color: var(--c-print-black);
    }

    &:first-child {
      padding: var(--xxs);

      & button {
        margin: 0 auto;
      }

      @media print {
        display: none;
      }
    }

    & span {
      font-size: var(--fs-h6);
      font-style: italic;
    }
  }
`;

const StyledPrintAreaHeader = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: column;

  & > h2 {
    font-size: var(--fs-h1);
    font-weight: var(--fw-light);
    color: var(--c-white);

    @media print {
      color: var(--c-print-black);
    }
  }

  & > p {
    font-size: var(--fs-h4);
    font-weight: var(--fw-light);
    color: var(--c-white);

    @media print {
      color: var(--c-print-black);
    }
  }
`;

const HrRcp = ({year, month, employees}) => {
  const tableRef = useRef();

  const [employeesData, setEmployeesData] = useState(employees);
  // const [updatedEmployees, setUpdatedEmployees] = useState(employeesData)
  // eslint-disable-next-line no-unused-vars
  const [updatedEmployees, setUpdatedEmployees] = useState(employeesData);

  useEffect(() => {
    setEmployeesData((employeesData) => employeesData);
  }, [employeesData]);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const getEmployeeData = (currentMonthData) => {
    const overtimeHoursMultiplier = currentMonthData.overtime_hours_multiplier;
    const workedHours = getCurrentMonthWorkedHours(currentMonthData);
    const overtimeHours = getCurrentMonthOvertimeHours(currentMonthData) * overtimeHoursMultiplier;
    const weekendsHours = getCurrentMonthWeekendsHours(currentMonthData) * overtimeHoursMultiplier;
    const sumOfHours = workedHours + overtimeHours + weekendsHours;

    const holidayDays = getHolidayLeaveDaysForCurrentMonth(currentMonthData);
    const sickDays = getSickLeaveDaysForCurrentMonth(currentMonthData);
    const otherLeaveDays = getOtherLeaveDaysForCurrentMonth(currentMonthData);

    return {
      employeeHoursSum: sumOfHours,
      employeeHolidaysSum: holidayDays,
      employeeSickSum: sickDays,
      employeeOtherLeaveSum: otherLeaveDays,
    };
  };

  console.log(employeesData);

  const handleRemoveFromViewClick = (idx) => {
    // setUpdatedEmployees((updatedEmployees) => {
    //   updatedEmployees = employeesData.splice(idx, 1);
    // });
    setUpdatedEmployees((updatedEmployees) => employeesData.splice(idx, 1));
    setEmployeesData((employeesData) => employeesData);
  };

  return (
    <StyledHrRtsReport>
      <IconButton size="xl" isActive={false} onClickAction={handlePrint}>
        <SvgPrint />
      </IconButton>
      <StyledPrintArea ref={tableRef}>
        <StyledPrintAreaHeader>
          <h2>Narzędziownia</h2>
          <p>
            Miesiąc: <strong>{getMonthName(month)}</strong>
          </p>
          <p>
            Data raportu: <span>{format(new Date(), 'yyyy-MM-dd')}</span>
          </p>
        </StyledPrintAreaHeader>
        <table>
          <thead>
            <tr>
              <th>Usuń</th>
              <th>Pracownik</th>
              <th>Ilość przepracowanych godzin</th>
              <th>Ilość dni urlopu</th>
              <th>Ilość dni chorobowego</th>
              <th>Ilość dni urlopu okolicznościowego</th>
            </tr>
          </thead>
          <tbody>
            {employeesData.map((employee, idx) => {
              const fullName = `${employee.name} ${employee.surname}`;
              const currentMonthData = getGivenMonthData(employee.calendar, year, month)[0];
              const employeeData = getEmployeeData(currentMonthData);
              const {
                employeeHoursSum,
                employeeHolidaysSum,
                employeeSickSum,
                employeeOtherLeaveSum,
              } = employeeData;

              return (
                // !isHidden &&
                <tr key={`${idx}${fullName}`}>
                  <td>
                    <IconButton
                      size="normal"
                      isActive={false}
                      onClickAction={() => handleRemoveFromViewClick(idx)}
                    >
                      <SvgRemove />
                    </IconButton>
                  </td>
                  <td>
                    {fullName} {employee.juvenile_worker && <span>pracownik młodociany</span>}
                  </td>
                  <td>{employeeHoursSum.toFixed(0)}</td>
                  <td>{employeeHolidaysSum}</td>
                  <td>{employeeSickSum}</td>
                  <td>{employeeOtherLeaveSum}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </StyledPrintArea>
    </StyledHrRtsReport>
  );
};

export default HrRcp;
