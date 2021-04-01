import {createContext, useState, useEffect} from 'react';
import useSWR from 'swr';
import {axios} from '@/lib/axios-config';
import {useRouter} from 'next/router';
import {confirmAlert} from 'react-confirm-alert';
import {Alert} from '@/common/Alert';

const createCalendarForCurrentYear = (currentYear, yearData) => {
  const monthsArray = [];
  const {
    hourly_rate,
    overtime_rate,
    holiday_rate,
    sick_leave_rate,
    other_leave_rate,
    insurance_rate,
    retainment_rate,
    bonus_rate,
    to_account_rate,
    overtime_rate_multiplier,
    overtime_hours_multiplier,
  } = yearData;

  for (let idx = 1; idx <= 12; idx += 1) {
    monthsArray.push({
      month: idx,
      holiday_leave: [],
      sick_leave: [],
      other_leave: [],
      rts: [],
      hourly_rate,
      overtime_rate,
      holiday_rate,
      sick_leave_rate,
      other_leave_rate,
      insurance_rate,
      retainment_rate,
      bonus_rate,
      to_account_rate,
      overtime_rate_multiplier,
      overtime_hours_multiplier,
    });
  }

  return {
    year: currentYear,
    months: monthsArray,
  };
};

export const DashboardContext = createContext();

export const DashboardProvider = ({children, ...otherProps}) => {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [employeesFilter, setEmployeesFilter] = useState(true);
  const [addEmployeePage, setAddEmployeePage] = useState(null);
  const [publicHolidays, setPublicHolidays] = useState([]);
  const {data, error} = useSWR('/api/employees');
  const sortEmployees = (employeesData) =>
    employeesData?.sort((a, b) => a.surname.localeCompare(b.surname));

  data && sortEmployees(data);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setEmployees((employees) => data);
    employees &&
      employees.map(async (employee) => {
        const employeeCalendar = employee.calendar;
        const hasCurrentYear = employeeCalendar.find(({year}) => year === currentYear);
        if (!hasCurrentYear) {
          const previousYearMonthsData = employeeCalendar.filter(
            ({year}) => year === currentYear - 1
          )[0].months;
          const previousYearLastMonthData =
            previousYearMonthsData[previousYearMonthsData.length - 1];
          const newData = await createCalendarForCurrentYear(
            currentYear,
            previousYearLastMonthData
          );
          newData &&
            axios.put(`/api/employees/${employee._id}`, {
              field: 'newYear',
              value: {...newData},
            });
        }
      });
  }, [data, employee, employees]);

  if (error) {
    return (
      <>
        {confirmAlert({
          customUI: ({onClose}) => (
            <Alert
              title="Błąd serwera"
              message="Nie udało pobrać się niezbędnych danych!"
              yesButtonLabel="Zaloguj"
              isNoButtonPresent={false}
              yesAction={() => {
                router.push('/');
                onClose();
              }}
            />
          ),
        })}
      </>
    );
  }

  return (
    <DashboardContext.Provider
      value={{
        data: [employees, setEmployees],
        employee: [employee, setEmployee],
        filter: [employeesFilter, setEmployeesFilter],
        add: [addEmployeePage, setAddEmployeePage],
        publicHolidays: [publicHolidays, setPublicHolidays],
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
