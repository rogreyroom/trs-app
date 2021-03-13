import {getLayout} from '@/layouts/DashboardLayout';
import {useContext, useEffect, useState} from 'react';
import {DashboardContext} from '@/contexts/DashboardContext';
import {SubPagesProvider} from '@/contexts/SubPagesContext';
import {Aside} from '@/dashboard/Sidebar';
import {Main} from '@/dashboard/Main';
import {Header} from '@/dashboard/Header';
import {MainNav} from '@/dashboard/MainNav';
import {DetailsSection} from '@/dashboard/DetailsSection';
import {ContentSection} from '@/dashboard/ContentSection';

const Dashboard = () => {
  const [employee, setEmployee] = useContext(DashboardContext).employee;
  // const [employeeData, setEmployeeData] = useState(employee)

  // console.log('Dashboard employee', employee);

  // useEffect(() => {
  const {
    _id,
    name,
    surname,
    position,
    juvenile_worker,
    employment_status,
    overdue_leave_amount,
    assigned_leave_amount,
    calendar,
  } = employee || {};

  // employee && setEmployeeData(employeeData => employee)

  // console.log('Dashboard useEffect employee', employee, employeeData);
  // }, [employee])

  // useEffect(() => {
  //   console.log('Jestem');
  //   const {
  //         _id,
  //         name,
  //         surname,
  //         position,
  //         juvenile_worker,
  //         employment_status,
  //         overdue_leave_amount,
  //         assigned_leave_amount,
  //         calendar
  //       } = employee || {}
  // }, [employee])

  // console.log('calendar', calendar);

  return (
    <>
      <Aside />
      <Main dashboard>
        <SubPagesProvider>
          {employee && <Header employeeId={_id} />}
          <MainNav />
          {calendar && (
            <DetailsSection
              employeeId={_id}
              calendar={calendar}
              leaveDays={{
                overdue: overdue_leave_amount,
                assigned: assigned_leave_amount,
              }}
            />
          )}
          <ContentSection employeeId={_id} />
        </SubPagesProvider>
      </Main>
    </>
  );
};

// export async function getStaticProps(context) {
//   const allEmployeesData = await fetcher('api/employees')

//   // TODO: here should by handle update for every employee new year calendar

//   return {
//     props: {
//       allEmployeesData
//     }
//   }
// }

Dashboard.getLayout = getLayout;
export default Dashboard;
