import {Title} from '@/common/Title';
import {EmploymentStatusForm} from './Form';

const EmploymentStatusPage = ({employeeId}) => (
  <>
    <Title isWhite>Wprowadź datę zwolnienia pracownika</Title>
    <EmploymentStatusForm id={employeeId} />
  </>
);

export default EmploymentStatusPage;
