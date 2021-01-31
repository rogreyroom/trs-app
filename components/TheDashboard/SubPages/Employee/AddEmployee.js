import styled from 'styled-components';
import { AddEmployeeForm } from './AddForm';


export const StyledContentSection = styled.section`
grid-area: content;
margin: 0;
padding: var(--l);
margin: var(--xl) var(--xl) var(--xl) var(--xxs);
background-image: var(--g-panel);
box-shadow: var(--s-panel);
color: var(--c-white);
width: 100%;
`

export const AddEmployeePage = () => {

  return (
    <StyledContentSection>
      <AddEmployeeForm />
    </StyledContentSection>
  )
}

// export default AddEmployeePage