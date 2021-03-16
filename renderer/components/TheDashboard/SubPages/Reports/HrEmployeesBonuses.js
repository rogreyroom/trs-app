import styled from 'styled-components';
import {useRef, useState, useEffect} from 'react';
import format from 'date-fns/format';
import {
  getCurrentMonthBonusRate,
  getMonthName,
  getGivenMonthData,
  getCurrentMonthOvertimeHours,
  getCurrentMonthWeekendsHours,
} from '@/lib/utils';
import {useReactToPrint} from 'react-to-print';
import {IconButton} from '@/common/Buttons';
import {SvgPrint, SvgRemove} from '@/icons';

const StyledHrRtsReport = styled.section`
  & button {
    margin-left: var(--xxl);
  }
`;

const StyledPrintArea = styled.div`
  margin: 0;
  padding: var(--xl);
  display: grid;
  grid-template-areas: 'header' 'table' 'summary';
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
      max-width: 80%;
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

    & span {
      font-size: var(--fs-h6);
      font-style: italic;
    }

    &:first-child {
      @media print {
        display: none;
      }
    }
  }

  & div {
    grid-area: summary;
    margin: 0;
    font-size: var(--fs-text);
    font-weight: var(--fw-light);
    text-align: left;
    color: var(--c-white);
    padding: var(--xxs) var(--m);

    @media print {
      color: var(--c-print-black);
    }

    & span {
      font-weight: var(--fw-normal);
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

const HrEmployeesBonus = ({year, month, employees}) => {
  const tableRef = useRef();
  const [employeesData, setEmployeesData] = useState(employees);
  // eslint-disable-next-line no-unused-vars
  const [updatedEmployees, setUpdatedEmployees] = useState(employeesData);
  let employeesBonusAmount = 0;

  useEffect(() => {
    setEmployeesData((employeesData) => employeesData);
  }, [employeesData]);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const getEmployeeData = (currentMonthData) => {
    const employeeBonusRate = getCurrentMonthBonusRate(currentMonthData);
    const overtimeHours = getCurrentMonthOvertimeHours(currentMonthData);
    const weekendsHours = getCurrentMonthWeekendsHours(currentMonthData);

    const evaluationArray = currentMonthData.rts.reduce((res, curr) => {
      if (curr.evaluation.length > 0) {
        res.push(...curr.evaluation);
      }
      return res;
    }, []);

    let autoWeekendBonus = 0;
    if (weekendsHours >= 24) {
      autoWeekendBonus = employeeBonusRate * 0.5;
    } else if (weekendsHours >= 12) {
      autoWeekendBonus = employeeBonusRate * 0.25;
    }

    let autoWeekdayBonus = 0;
    if (overtimeHours >= 40) {
      autoWeekdayBonus = employeeBonusRate;
    } else if (overtimeHours >= 20) {
      autoWeekdayBonus = employeeBonusRate * 0.5;
    }

    let manualBonus = 0;
    if (evaluationArray.length > 0) {
      const percentsArray = evaluationArray.reduce((res, curr) => {
        res.push(curr.percent);
        return res;
      }, []);

      manualBonus = percentsArray.reduce((res, curr) => {
        const bonusAmount = employeeBonusRate * (parseInt(curr, 10) / 100);
        return res + bonusAmount;
      }, 0);
    }

    const amountBonus = autoWeekendBonus + autoWeekdayBonus + manualBonus;
    return {employeeBonusAmount: amountBonus};
  };

  const handleRemoveFromViewClick = (idx) => {
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
          <h2>
            Narzędziownia - <strong>Premia</strong>
          </h2>
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
              <th>Kwota premii</th>
              <th>Pracownik</th>
              <th>Podpis pracownika</th>
            </tr>
          </thead>
          <tbody>
            {employeesData.map((employee, idx) => {
              const fullName = `${employee.name} ${employee.surname}`;
              const currentMonthData = getGivenMonthData(employee.calendar, year, month)[0];
              const employeeData = getEmployeeData(currentMonthData);
              const {employeeBonusAmount} = employeeData;
              employeesBonusAmount += employeeBonusAmount;
              console.log('employeeBonusAmount', employeeBonusAmount);
              return employeeBonusAmount > 0 ? (
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
                  <td>{fullName}</td>
                  <td>{employeeBonusAmount.toFixed(2)}</td>
                  <td>{fullName}</td>
                  <td />
                </tr>
              ) : null;
            })}
          </tbody>
        </table>
        <div>
          <p>
            Całkowita kwota premii: <span>{employeesBonusAmount.toFixed(2)}</span> <span>pln</span>
          </p>
        </div>
      </StyledPrintArea>
    </StyledHrRtsReport>
  );
};

export default HrEmployeesBonus;
