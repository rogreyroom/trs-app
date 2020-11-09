import Link from 'next/link'
import styled from 'styled-components'

const StyledTitle = styled.h1`
  font-size: var(--xl);
  color: var(--c-accent);
  margin: 0;
`
const StyledButton = styled.button`
  display: inline-block;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: 1;
  height: max-content;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  align-self: center;
`

export const Title = ({ children, href }) => {
  return (
    <Link href={href} scroll={false}>
      <StyledButton>
        <StyledTitle>
          {children}
        </StyledTitle>
      </StyledButton>
    </Link>
  )
}