import Link from 'next/link'
import { forwardRef } from 'react'
import styled from 'styled-components';

const StyledButton = styled.button.attrs(props => ({
  size: props.size && `--${props.size}` || '--normal',
  color: (props.isJuvenile || props.isActive) && '--c-accent' || '--c-white'
}))`
  --size: var(${props => props.size});
  --color: var(${props => props.color});

  display: flex;
  background: transparent;
  box-shadow: none;
  color: var(--color);
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
export const IconButton = forwardRef(({ children, href, size, isActive, isJuvenile, localAction, onClickAction }) => {
  // console.log('REF:', ref)
  // console.log('onClickHandler:', onClickHandler)
  return (
    localAction &&

    <StyledButton size={size} isActive={isActive} isJuvenile={isJuvenile} onClick={onClickAction}>
      { children }
    </StyledButton>

    ||

    <Link href={href}>
      <StyledButton size={size}>
        { children }
      </StyledButton>
    </Link>
  )
})