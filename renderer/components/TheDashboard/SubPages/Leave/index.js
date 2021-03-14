import {Title} from '@/common/Title';
import {LeaveData} from '@/dashboard/LeaveData';
import {StyledLeavePages} from '../CommonStyles';
import {LeaveForm} from './Form';

const LeavePage = ({employeeId}) => (
  <StyledLeavePages>
    <Title isWhite>Wprowadź wolne okolicznościowe</Title>
    <LeaveData leaveType="other" id={employeeId} />
    <LeaveForm id={employeeId} />
  </StyledLeavePages>
);

export default LeavePage;
