import { StyledLeavePages } from "../CommonStyles"
import { Title } from "@/common/Title"
import { SickForm } from "./Form"
import { LeaveData } from '@/dashboard/LeaveData'

const SickPage = ({ employeeId }) => {
  return (
    <StyledLeavePages>
      <Title isWhite>Wprowadź chorobowe</Title>
      <LeaveData leaveType='sick' id={ employeeId } />
      <SickForm  id={ employeeId } />
    </StyledLeavePages>
  )
}

export default SickPage