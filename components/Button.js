import Link from 'next/link'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  background: var(--c-blue-03);
  box-shadow: var(--s-button);
  color: var(--c-white);
  font-family: inherit;
  line-height: 1;
  font-size: var(--fs-text);
  font-weight: var(--fw-normal);
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: var(--xs);
  margin: 0;
  padding: var(--s) var(--xl);
  min-width: 130px;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: all 250ms ease-in-out;

  &:hover {
    box-shadow: var(--s-button-hover);
    color: var(--c-accent);
  }

  & > :first-child {
    margin-right: var(--xxs);
  }
`

export const Button = ({ children, href }) => {
  return (
    <Link href={href}>
        <StyledButton>
          { children }
        </StyledButton>
    </Link>
  )
}
