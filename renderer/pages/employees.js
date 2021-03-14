import {getLayout} from '@/layouts/DashboardLayout';
import {Aside} from '@/dashboard/Sidebar';
import {mutate} from 'swr';
import {axios} from '@/lib/axios-config';

const getEmployees = () => axios.get('/api/employees');
const createCalendarForCurrentYear = async (currentYear, yearData) => {
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

const Employees = () => {
  const employees = getEmployees();
  const currentYear = new Date().getFullYear();
  employees
    .then((res) => {
      // eslint-disable-next-line array-callback-return
      res.data.map((employee) => {
        const employeeCalendar = employee.calendar;
        const hasCurrentYear = employeeCalendar.find(({year}) => year === currentYear);
        if (!hasCurrentYear) {
          const previousYearMonthsData = employeeCalendar.filter(
            ({year}) => year === currentYear - 1
          )[0].months;
          const previousYearLastMonthData =
            previousYearMonthsData[previousYearMonthsData.length - 1];
          const newData = createCalendarForCurrentYear(currentYear, previousYearLastMonthData);
          newData
            .then((monthsData) => {
              axios.put(`/api/employees/${employee._id}`, {
                field: 'newYear',
                value: {...monthsData},
              });
            })
            .catch((monthsErr) => console.error(monthsErr));
        }
      });
    })
    .catch((err) => console.error(err));

  mutate('employees');

  return (
    <>
      <Aside />
    </>
  );
};

Employees.getLayout = getLayout;
export default Employees;
