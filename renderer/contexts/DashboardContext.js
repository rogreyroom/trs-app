import {createContext, useState, useEffect} from 'react';
import useSWR from 'swr';

export const DashboardContext = createContext();

export const DashboardProvider = ({children, ...otherProps}) => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [employeesFilter, setEmployeesFilter] = useState(true);
  const [addEmployeePage, setAddEmployeePage] = useState(null);
  const {data, error} = useSWR('/api/employees');

  useEffect(() => {
    setEmployees((employees) => data);
  }, [data, employees, employee]);

  if (error) return <h1>Something went wrong on the server!</h1>;
  // if (!data) return <h1>Loading data from server!!!...</h1>

  return (
    <DashboardContext.Provider
      value={{
        data: [employees, setEmployees],
        employee: [employee, setEmployee],
        filter: [employeesFilter, setEmployeesFilter],
        add: [addEmployeePage, setAddEmployeePage],
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
