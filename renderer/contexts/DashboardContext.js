import { createContext, useState } from 'react'

export const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
  const [employees, setEmployees] = useState(null)
  const [employee, setEmployee] = useState(null)
  const [employeesFilter, setEmployeesFilter] = useState(true)
  const [addEmployeePage, setAddEmployeePage] = useState(null)

  return (
    <DashboardContext.Provider value={{data: [employees, setEmployees], employee: [employee, setEmployee], filter: [employeesFilter, setEmployeesFilter], add: [addEmployeePage, setAddEmployeePage]}}>
        { children }
    </DashboardContext.Provider>
  )
}