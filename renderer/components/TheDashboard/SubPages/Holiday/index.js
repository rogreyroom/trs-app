import { StyledLeavePages } from "../CommonStyles"
import { Title } from "@/common/Title"
import { HolidayForm } from "./Form"
import { LeaveData } from '@/dashboard/LeaveData'

const HolidayPage = ({ employeeId }) => {
  return (
    <StyledLeavePages>
      <Title isWhite>Wprowadź urlop</Title>
      <LeaveData leaveType='holiday'  id={ employeeId } />
      <HolidayForm id={ employeeId } />
    </StyledLeavePages>
  )
}

export default HolidayPage