import Link from 'next/link'
import styled from 'styled-components'

const StyledTitle = styled.h1`
  font-size: ${props => props.size ? "var(--xl)" : "var(--l)"};
  color: var(--c-accent);
  margin: 0;
`

export const Title = ({ children, isLogo }) => {
  return (
    <StyledTitle size={isLogo}>
      {children}
    </StyledTitle>
  )
}