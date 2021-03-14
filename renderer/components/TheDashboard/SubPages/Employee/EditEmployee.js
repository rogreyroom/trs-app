import {Title} from '@/common/Title';
import styled from 'styled-components';
import {EditEmployeeForm} from './EditForm';

export const StyledContentSection = styled.section`
  grid-area: content;
  margin: 0;
  color: var(--c-white);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: var(--normal);
  height: 100%;
  align-content: start;
`;

const EditEmployeePage = ({employeeId}) => (
  <StyledContentSection>
    <Title isWhite>Edycja danych pracownika</Title>
    <EditEmployeeForm id={employeeId} />
  </StyledContentSection>
);

export default EditEmployeePage;
