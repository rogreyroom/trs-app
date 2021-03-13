import {StyledLeavePages} from '../CommonStyles';
import {Title} from '@/common/Title';
import {LeaveForm} from './Form';
import {LeaveData} from '@/dashboard/LeaveData';

const LeavePage = ({employeeId}) => {
  return (
    <StyledLeavePages>
      <Title isWhite>Wprowadź wolne okolicznościowe</Title>
      <LeaveData leaveType="other" id={employeeId} />
      <LeaveForm id={employeeId} />
    </StyledLeavePages>
  );
};

export default LeavePage;
