import {useContext, useRef} from 'react';
import {DashboardContext} from '@/contexts/DashboardContext';
import {useReactToPrint} from 'react-to-print';
import {IconButton} from '@/common/Buttons';
import {SvgPrint} from '@/icons';
import {getGivenMonthData} from '@/lib/utils';
import styled from 'styled-components';
import {EmployeeCalendar} from './Print';

const StyledRcpDetailsPrint = styled.section`
  & button {
    margin-left: var(--xxl);
  }
`;

const EmployeeRcpCalendar = ({year, month}) => {
  // eslint-disable-next-line no-unused-vars
  const [employee, setEmployee] = useContext(DashboardContext).employee;
  const componentRef = useRef();
  const currentMonthData = getGivenMonthData(employee.calendar, year, month)[0];
  const employeeFullName = `${employee.name} ${employee.surname}`;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <StyledRcpDetailsPrint>
      <IconButton size="xl" isActive={false} onClickAction={handlePrint}>
        <SvgPrint />
      </IconButton>
      {currentMonthData && (
        <EmployeeCalendar
          employeeData={{
            employeeName: employeeFullName,
            year,
            month,
            data: currentMonthData,
          }}
          ref={componentRef}
        />
      )}
    </StyledRcpDetailsPrint>
  );
};

export default EmployeeRcpCalendar;
