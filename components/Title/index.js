import Link from 'next/link'
import styled from 'styled-components'

const StyledTitle = styled.h1.attrs(props => ({
  size: props.isLogo && '--xl' || '--l'
}))`
  --size: var(${props => props.size});

  font-size: var(--size);
  color: var(--c-accent);
  margin: 0;
`

export const Title = ({ children, isLogo }) => {
  return (
    <StyledTitle isLogo={isLogo}>
      {children}
    </StyledTitle>
  )
}