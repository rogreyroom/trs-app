import {getLayout} from '@/layouts/DashboardLayout';
import {useContext} from 'react';
import {DashboardContext} from '@/contexts/DashboardContext';
import {SubPagesProvider} from '@/contexts/SubPagesContext';
import {Aside} from '@/dashboard/Sidebar';
import {Main} from '@/dashboard/Main';
import {Header} from '@/dashboard/Header';
import {MainNav} from '@/dashboard/MainNav';
import {DetailsSection} from '@/dashboard/DetailsSection';
import {ContentSection} from '@/dashboard/ContentSection';

const Dashboard = () => {
  const [employee] = useContext(DashboardContext).employee;
  const {_id, overdue_leave_amount, assigned_leave_amount, calendar} = employee || {};

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

Dashboard.getLayout = getLayout;
export default Dashboard;
