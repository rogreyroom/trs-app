import Link from 'next/link'
import styled from 'styled-components';

const StyledButton = styled.button`
  --text-color: var(--c-white);

  display: inline-block;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  background: transparent;
  color: var(--text-color);
  font-family: inherit;
  font-size: var(--fs-text);
  line-height: 1;
  height: max-content;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  align-self: center;

  &:hover {
    --text-color: var(--c-accent);
    filter: var(--s-glow);
  }

  &:focus {
    outline: 3px solid transparent;
    box-shadow: 0 0 1px 2px var(--c-accent);
    filter: var(--s-glow);
  }
`

export const Button = ({ children, href }) => {
  return (
    // <Link href='/dashboard/employee/[id]' as={`/dashboard/employee/${href}`}>
    <Link href={`/dashboard/${href}`}>
      <StyledButton>
        { children }
      </StyledButton>
    </Link>
  )
}