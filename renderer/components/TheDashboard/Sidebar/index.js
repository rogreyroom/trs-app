import styled from 'styled-components';
import {Navbar} from './Navbar';
import {EmployeeList} from './EmployeeList';

const StyledAsideContainer = styled.aside`
  grid-area: aside;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--c-blue-03);
  margin: 0;
  padding: var(--xl) var(--normal) var(--normal) var(--xl);
  width: 100%;
  height: 100%;
`;

export const Aside = () => {
  return (
    <StyledAsideContainer>
      <Navbar />
      <EmployeeList />
    </StyledAsideContainer>
  );
};
