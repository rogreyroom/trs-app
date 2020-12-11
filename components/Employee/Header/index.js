import styled from 'styled-components';
import { OptionsNav } from '../OptionsNav'
import { useRouter } from 'next/router'

const EmployeeHeader = styled.header`
grid-area: title;
display: grid;
grid-template-columns: auto 1fr;
grid-template-rows: 32px 18px;

& h1 {
  grid-column: 1 / 2;
  grid-row: 1;
  margin: 0;
}

& span {
  grid-column: 1 / 2;
  grid-row: 2;
  margin: 0;
  font-size: var(--s);
  color: var(--c-blue-03);
}

& nav {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  margin: 0;
}
`

const StyledTitle = styled.h1`
  font-size: var(--l);
  color: var(--c-accent);
  margin: 0;
`

export const Header = ({ children, name, position, juvenile, status }) => {
  const router = useRouter()
  const { employee } = router.query

  return (
    <EmployeeHeader>
      <StyledTitle>{ name }</StyledTitle>
      <span>{ position }</span>
      <OptionsNav juvenile={juvenile} status={status} />
    </EmployeeHeader>
  )
}

