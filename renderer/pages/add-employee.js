import {getLayout} from '@/layouts/DashboardLayout';
import {Aside} from '@/dashboard/Sidebar';
import {Main} from '@/dashboard/Main';
import {Title} from '@/common/Title';
import {AddEmployeePage} from '@/subPages/Employee/AddEmployee';

const AddEmployee = () => {
  return (
    <>
      <Aside />
      <Main>
        <Title isWhite>Dodaj pracownika</Title>
        <AddEmployeePage />
      </Main>
    </>
  );
};

AddEmployee.getLayout = getLayout;
export default AddEmployee;
