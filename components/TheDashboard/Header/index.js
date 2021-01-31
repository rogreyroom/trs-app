import styled from 'styled-components';
import { OptionsNav } from './OptionsNav'

const EmployeeHeader = styled.header`
grid-area: title;
display: grid;
grid-template-columns: auto 1fr;
grid-template-rows: 32px 18px;

& h1 {
  grid-column: 1 / 2;
  grid-row: 1;
  margin: 0;
  align-self: start;
}

& span {
  grid-column: 1 / 2;
  grid-row: 2;
  margin: 0;
  font-size: var(--s);
  color: var(--c-blue-03);
  align-self: end;
}

& nav {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  align-items: center;
  margin: 0;
}
`

const StyledTitle = styled.h1`
  font-size: var(--l);
  color: var(--c-accent);
  margin: 0;
`

export const Header = ({ employeeId, name, position }) => {

  return (
    <EmployeeHeader>
      <StyledTitle>{ name }</StyledTitle>
      <OptionsNav id={employeeId} />
      <span>{ position }</span>
    </EmployeeHeader>
  )
}

