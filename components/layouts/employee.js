import SiteLayout from './app'
import { getLayout } from './main'

const EmployeeInformationLayout = ({ children }) => {
  return (
    <>
      <h1>Employee Layout</h1>
      { children }
    </>
  )
}

EmployeeInformationLayout.getLayout = getLayout

export default EmployeeInformationLayout