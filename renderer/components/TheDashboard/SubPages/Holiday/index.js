import {Title} from '@/common/Title';
import {LeaveData} from '@/dashboard/LeaveData';
import {StyledLeavePages} from '../CommonStyles';
import {HolidayForm} from './Form';

const HolidayPage = ({employeeId}) => (
  <StyledLeavePages>
    <Title isWhite>Wprowadź urlop</Title>
    <LeaveData leaveType="holiday" id={employeeId} />
    <HolidayForm id={employeeId} />
  </StyledLeavePages>
);

export default HolidayPage;
