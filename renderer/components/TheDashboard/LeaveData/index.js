import styled from 'styled-components';
import {axios} from '@/lib/axios-config';
import {format} from 'date-fns';
import {useContext} from 'react';
import {DashboardContext} from '@/contexts/DashboardContext';
import {SvgRemove} from '@/icons';
import {IconButton} from '@/common/Buttons';

const StyledLeaveData = styled.section`
  margin: 0;
  padding-right: var(--m);
  border-right: 1px solid var(--c-blue-03);
  min-height: 100%;
  width: 100%;

  & > h4 {
    font-size: var(--fs-h5);
    font-weight: var(--fw-normal);
    color: var(--c-white);
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: var(--xs);
    font-size: var(--fs-h6);
    font-weight: var(--fw-light);
    color: var(--c-white);

    & > span {
      margin: 0;
    }
  }
`;

const StyledLeaveItem = styled.div`
  margin: 0;
  display: flex;
  gap: var(--xs);
  align-items: center;

  & span {
    margin: 0;
    font-size: var(--fs-h6);
    font-weight: var(--fw-light);
    color: var(--c-white);
  }
`;

const getTitle = (type, year) => {
  switch (type) {
    case 'holiday':
      return `Wykorzystany urlop w roku ${year}`;
    case 'sick':
      return `Wykorzystane chorobowe w roku ${year}`;
    case 'other':
      return `Wykorzystane wolne w roku ${year}`;
    default:
      return null;
  }
};

const getLeaveDays = (arrayData, type) => {
  const resultArray = arrayData.reduce((accArr, month) => {
    switch (type) {
      case 'holiday':
        month.holiday_leave.length > 0 && accArr.push(...month.holiday_leave.map((el) => el));
        break;
      case 'sick':
        month.sick_leave.length > 0 && accArr.push(...month.sick_leave.map((el) => el));
        break;
      case 'other':
        month.other_leave.length > 0 && accArr.push(...month.other_leave.map((el) => el));
        break;
      default:
        return null;
    }
    return accArr;
  }, []);
  return resultArray;
};

export const LeaveData = ({leaveType, id}) => {
  // eslint-disable-next-line no-unused-vars
  const [employee, setEmployee] = useContext(DashboardContext).employee;
  const currentYearIs = new Date().getFullYear();
  const title = getTitle(leaveType, currentYearIs);
  const employeeMonthsData = employee.calendar.find((year) => year.year === currentYearIs).months;
  const leaveDays = getLeaveDays(employeeMonthsData, leaveType);

  const handleSingleLeaveDelete = async (e, leave) => {
    e.preventDefault();
    const yearIs = leave.from.year;
    const monthIs = leave.from.month;
    const valueIs = leave;

    switch (leaveType) {
      case 'holiday':
        await axios.put(`/api/employees/${id}`, {
          field: 'deleteHoliday',
          queryFields: {year: yearIs, month: monthIs},
          value: {...valueIs},
        });
        break;
      case 'sick':
        await axios.put(`/api/employees/${id}`, {
          field: 'deleteSick',
          queryFields: {year: yearIs, month: monthIs},
          value: {...valueIs},
        });
        break;
      case 'other':
        await axios.put(`/api/employees/${id}`, {
          field: 'deleteOther',
          queryFields: {year: yearIs, month: monthIs},
          value: {...valueIs},
        });
        break;
      default:
        return null;
    }
  };

  return (
    <StyledLeaveData>
      <h4>{title}</h4>
      <div>
        {leaveDays.map((leave, idx) => {
          const dateFrom = format(
            new Date(leave.from.year, leave.from.month - 1, leave.from.day),
            'yyyy.MM.dd'
          );
          const dateTo = format(
            new Date(leave.to.year, leave.to.month - 1, leave.to.day),
            'yyyy.MM.dd'
          );
          return (
            <StyledLeaveItem key={idx}>
              <IconButton
                size="m"
                isActive={false}
                onClickAction={(e) => handleSingleLeaveDelete(e, leave)}
              >
                <SvgRemove />
              </IconButton>
              <span>
                od: {dateFrom}
                <span> - </span>do: {dateTo}
              </span>
            </StyledLeaveItem>
          );
        })}
      </div>
    </StyledLeaveData>
  );
};
