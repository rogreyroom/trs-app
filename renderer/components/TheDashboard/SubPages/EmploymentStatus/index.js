import { Title } from "@/common/Title"
import  { EmploymentStatusForm } from "./Form"

const EmploymentStatusPage = ({ employeeId }) => {
  return (
    <>
      <Title isWhite>Wprowadź datę zwolnienia pracownika</Title>
      <EmploymentStatusForm id={employeeId} />
    </>
  )
}

export default EmploymentStatusPage