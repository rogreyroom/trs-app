import Link from 'next/link'
// import { forwardRef } from 'react'
import styled from 'styled-components';

const StyledButton = styled.button.attrs(props => ({
  size: props.size && `--${props.size}` || '--normal'
}))`
  --size: var(${props => props.size});

  display: flex;
  background: transparent;
  box-shadow: none;
  color: var(--c-white);
  font-family: inherit;
  line-height: var(--size);
  font-size: var(--size);
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: var(--xs);
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: all 250ms ease-in-out;

  & > svg {
    width: var(--size);
    height: var(--size);
  }

  &:hover > svg   {
    filter: var(--s-glow);
    color: var(--c-accent);
  }
`

// export const IconButton = forwardRef(({ children, href, size, localAction, ref, onClickAction }) => {
export const IconButton = ({ children, href, size }) => {
  return (
    <Link href={href}>
      <StyledButton size={size}>
        { children }
      </StyledButton>
    </Link>
  )
}