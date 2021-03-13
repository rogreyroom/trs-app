import {useContext, useRef} from 'react';
import {DashboardContext} from '@/contexts/DashboardContext';
import format from 'date-fns/format';
import {pl} from 'date-fns/locale';
import {
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
import {SvgPrint} from '@/icons';
import styled from 'styled-components';

const StyledEmployeeDetails = styled.section`
  & button {
    margin-left: var(--xxl);
  }
`;

const StyledPrintArea = styled.div`
  margin: 0;
  padding: var(--xl);
  display: grid;
  grid-template-areas: 'name month' 'table table' 'summary summary';
  grid-template-columns: max-content 1fr;
  grid-gap: var(--xl);
  align-items: baseline;

  .tableSumRow {
    background: var(--c-blue-01);

    @media print {
      background: transparent;
    }

    & td {
      font-weight: var(--fw-normal);
    }
  }

  & > h2 {
    grid-area: name;
    font-size: var(--fs-h1);
    font-weight: var(--fw-light);
    color: var(--c-white);

    @media print {
      color: var(--c-print-black);
    }
  }

  & > h4 {
    grid-area: month;
    justify-self: start;
    margin: 0;
    font-size: var(--fs-h4);
    font-weight: var(--fw-light);
    color: var(--c-white);
    @media print {
      color: var(--c-print-black);
    }
  }

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

  & th {
    font-size: var(--fs-text);
    font-weight: var(--fw-light);
    color: var(--c-white);
    padding: 0.25em 0.5em;

    @media print {
      color: var(--c-print-black);
    }
  }

  & td {
    font-size: var(--fs-text);
    font-weight: var(--fw-light);
    text-align: left;
    color: var(--c-white);
    padding: var(--xxs) var(--m);

    & span {
      float: right;
    }

    & div {
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--xxs);

      & p {
        margin: 0;
        padding: 0;
      }
    }

    &:last-child {
      white-space: nowrap;
      min-width: 125px;
    }

    @media print {
      color: var(--c-print-black);
      padding: var(--xxs);
    }
  }

  & div {
    grid-area: summary;
    margin: 0;

    & span {
      font-weight: var(--fw-normal);
    }
  }
`;

const EmployeeRcpDetails = ({year, month}) => {
  const [employee, setEmployee] = useContext(DashboardContext).employee;
  const tableRef = useRef();

  const monthName = format(new Date(year, month - 1, 1), 'LLLL', {locale: pl});
  const currentMonthData = getGivenMonthData(employee.calendar, year, month)[0];
  const hourlyRate = currentMonthData.hourly_rate;
  const overtimeRate = currentMonthData.overtime_rate;
  const holidayRate = currentMonthData.holiday_rate;
  const sickLeaveRate = currentMonthData.sick_leave_rate;
  const otherLeaveRate = currentMonthData.other_leave_rate;
  const toAccountRate = currentMonthData.to_account_rate;
  const insuranceRate = currentMonthData.insurance_rate;
  const retainmentRate = currentMonthData.retainment_rate;
  const bonusRate = currentMonthData.bonus_rate;
  const overtimeRateMultiplier = currentMonthData.overtime_rate_multiplier;
  const overtimeHoursMultiplier = currentMonthData.overtime_hours_multiplier;

  const workedHours = getCurrentMonthWorkedHours(currentMonthData);
  const overtimeHours = getCurrentMonthOvertimeHours(currentMonthData);
  const weekendsHours = getCurrentMonthWeekendsHours(currentMonthData);
  const sumOfHours =
    workedHours +
    overtimeHours * overtimeHoursMultiplier +
    weekendsHours * overtimeHoursMultiplier;
  const amountWorkedHours = workedHours * hourlyRate;
  const amountOvertimeHours =
    overtimeHours * overtimeHoursMultiplier * overtimeRate;
  const amountWeekendsHours =
    weekendsHours * overtimeHoursMultiplier * overtimeRate;
  const amountSumOfHours =
    amountWorkedHours + amountOvertimeHours + amountWeekendsHours;

  const holidayDays = getHolidayLeaveDaysForCurrentMonth(currentMonthData);
  const sickDays = getSickLeaveDaysForCurrentMonth(currentMonthData);
  const otherLeaveDays = getOtherLeaveDaysForCurrentMonth(currentMonthData);
  const amountHolidayDays = holidayDays * holidayRate;
  const amountSickDays = sickDays * sickLeaveRate;
  const amountOtherLeaveDays = otherLeaveDays * otherLeaveRate;
  const amountSumOfLeave =
    amountHolidayDays + amountSickDays + amountOtherLeaveDays;

  let autoWeekendBonusName = '';
  let autoWeekendBonus = 0;
  if (weekendsHours >= 24) {
    autoWeekendBonus = bonusRate * 0.5;
    autoWeekendBonusName = '4W';
  } else if (weekendsHours >= 12) {
    autoWeekendBonus = bonusRate * 0.25;
    autoWeekendBonusName = '2W';
  }

  let autoWeekdayBonusName = '';
  let autoWeekdayBonus = 0;
  if (overtimeHours >= 40) {
    autoWeekdayBonus = bonusRate;
    autoWeekdayBonusName = '4H';
  } else if (overtimeHours >= 20) {
    autoWeekdayBonus = bonusRate * 0.5;
    autoWeekdayBonusName = '2H';
  }

  const evaluationArray = currentMonthData.rts.reduce((res, curr) => {
    if (curr.evaluation.length > 0) {
      res.push(...curr.evaluation);
    }
    return res;
  }, []);

  let manualBonus = 0;
  if (evaluationArray.length > 0) {
    const percentsArray = evaluationArray.reduce((res, curr) => {
      res.push(curr.percent);
      return res;
    }, []);

    manualBonus = percentsArray.reduce((res, curr) => {
      const bonusAmount = bonusRate * (parseInt(curr) / 100);
      return res + bonusAmount;
    }, 0);
  }

  const amountBonus = autoWeekendBonus + autoWeekdayBonus + manualBonus;
  const amountToBePaid =
    amountSumOfHours +
    amountSumOfLeave -
    toAccountRate -
    insuranceRate -
    retainmentRate;
  const totalAmountToPay = amountToBePaid + amountBonus;

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  return (
    <StyledEmployeeDetails>
      <IconButton size="xl" isActive={false} onClickAction={handlePrint}>
        <SvgPrint />
      </IconButton>
      <StyledPrintArea ref={tableRef}>
        <h2>
          {employee.name} {employee.surname}
        </h2>
        <h4>
          {year} / {monthName}
        </h4>
        <table>
          <thead>
            <tr>
              <th>Opis</th>
              <th>Godziny / dni</th>
              <th>Kwota</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Obecność</td>
              <td>
                {workedHours} <span>godz</span>
              </td>
              <td>
                {amountWorkedHours} <span>pln</span>
              </td>
            </tr>

            <tr>
              <td>Nadgodziny</td>
              <td>
                {overtimeHours * overtimeHoursMultiplier} <span>godz</span>
              </td>
              <td>
                {amountOvertimeHours} <span>pln</span>
              </td>
            </tr>

            <tr>
              <td>Dyżur</td>
              <td>
                {weekendsHours * overtimeHoursMultiplier} <span>godz</span>
              </td>
              <td>
                {amountWeekendsHours} <span>pln</span>
              </td>
            </tr>

            <tr className="tableSumRow">
              <td>SUMA</td>
              <td>
                {sumOfHours.toFixed(0)} <span>godz</span>
              </td>
              <td>
                {amountSumOfHours} <span>pln</span>
              </td>
            </tr>

            <tr>
              <td>Urlop</td>
              <td>
                {holidayDays} <span>{holidayDays === 1 ? 'dzień' : 'dni'}</span>
              </td>
              <td>
                {amountHolidayDays} <span>pln</span>
              </td>
            </tr>

            <tr>
              <td>Chorobowe</td>
              <td>
                {sickDays} <span>{sickDays === 1 ? 'dzień' : 'dni'}</span>
              </td>
              <td>
                {amountSickDays} <span>pln</span>
              </td>
            </tr>

            <tr>
              <td>Urlop okolicznościowy</td>
              <td>
                {otherLeaveDays}{' '}
                <span>{otherLeaveDays === 1 ? 'dzień' : 'dni'}</span>
              </td>
              <td>
                {amountOtherLeaveDays} <span>pln</span>
              </td>
            </tr>

            <tr className="tableSumRow">
              <td>SUMA</td>
              <td>
                {holidayDays + sickDays + otherLeaveDays}{' '}
                <span>
                  {holidayDays + sickDays + otherLeaveDays === 1
                    ? 'dzień'
                    : 'dni'}
                </span>
              </td>
              <td>
                {amountSumOfLeave} <span>pln</span>
              </td>
            </tr>

            <tr>
              <td>ROR</td>
              <td>-</td>
              <td>
                {toAccountRate} <span>pln</span>
              </td>
            </tr>

            <tr>
              <td>PZU</td>
              <td>-</td>
              <td>
                {insuranceRate} <span>pln</span>
              </td>
            </tr>

            <tr>
              <td>PPK</td>
              <td>-</td>
              <td>
                {retainmentRate} <span>pln</span>
              </td>
            </tr>

            <tr>
              <td>Premia</td>
              <td>
                <div>
                  {autoWeekendBonus > 0 && <p>{autoWeekendBonusName}</p>}
                  {autoWeekdayBonus > 0 && <p>{autoWeekdayBonusName}</p>}
                  {evaluationArray.map(({name, percent, description}, idx) => {
                    return (
                      <p key={idx}>
                        {name} {percent} %, {description}
                      </p>
                    );
                  })}
                </div>
              </td>
              <td>
                {amountBonus} <span>pln</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <p>
            Całkowita kwota:{' '}
            <span>{(amountSumOfHours + amountSumOfLeave).toFixed(0)}</span>{' '}
            <span>pln</span>
          </p>
          <p>
            Kwota do wypłaty: <span>{amountToBePaid.toFixed(0)}</span>{' '}
            <span>pln</span>
          </p>
          <p>
            Kwota do wypłaty z premią: <span>{totalAmountToPay.toFixed()}</span>{' '}
            <span>pln</span>
          </p>
        </div>
      </StyledPrintArea>
    </StyledEmployeeDetails>
  );
};

export default EmployeeRcpDetails;
