import {Title} from '@/common/Title';
import {LeaveData} from '@/dashboard/LeaveData';
import {StyledLeavePages} from '../CommonStyles';
import {SickForm} from './Form';

const SickPage = ({employeeId}) => (
  <StyledLeavePages>
    <Title isWhite>Wprowadź chorobowe</Title>
    <LeaveData leaveType="sick" id={employeeId} />
    <SickForm id={employeeId} />
  </StyledLeavePages>
);

export default SickPage;
