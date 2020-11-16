import Link from 'next/link'
import styled from 'styled-components'
import { Title } from './Title'

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
  border: 4px solid transparent;

  &:hover {
    box-shadow: 0 0 1px 2px var(--c-accent);
    filter: var(--s-glow);
  }

  &:focus {
    outline: 3px solid transparent;
    box-shadow: 0 0 1px 2px var(--c-accent);
    filter: var(--s-glow);
  }
`

export const LogoTitle = ({ children, href }) => {

  return (
    <Link href={href} scroll={false}>
      <StyledButton>
        <Title isLogo>
          {children}
        </Title>
      </StyledButton>
    </Link>
  )
}