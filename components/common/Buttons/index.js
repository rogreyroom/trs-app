import { forwardRef } from 'react'
import styled, { css } from 'styled-components';

const CommonButtonStyles = css`
  --size: var(--fs-text);
  display: flex;
  background: transparent;
  box-shadow: none;
  color: var(--c-white);
  font-family: inherit;
  font-size: var(--size);
  font-weight: var(--fw-normal);
  line-height: var(--size);
  text-align: center;
  text-decoration: none;
  border: none;
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: all 250ms ease-in-out;
  justify-content: center;
  align-items: center;
`

const StyledTextButton = styled.button.attrs(props => ({
  color: (props.isActive) && '--c-accent' || '--c-white',
  decoration: (props.isUnderlined) && 'underline' || 'none'
}))`
  ${CommonButtonStyles};
  --decoration: ${props => props.decoration};
  --padding: calc(var(--xxs) / 2);
  --color: var(${props => props.color});

  color: var(--color);
  text-decoration: var(--decoration);
  padding: var(--padding);
  width: max-content;

  &:hover {
    color: var(--c-accent);
    filter: var(--s-glow);
  }

  &:focus {
    outline: 3px solid transparent;
    box-shadow: 0 0 1px 2px var(--c-accent);
    filter: var(--s-glow);
  }
`

const StyledButton = styled.button.attrs(props => ({
  color: (props.isActive) && '--c-accent' || '--c-white'
}))`
  ${CommonButtonStyles};
  --color: var(${props => props.color});

  background: var(--c-blue-03);
  box-shadow: var(--s-button);
  border-radius: var(--xs);
  color: var(--color);
  padding: var(--s) var(--xl);
  min-width: 130px;
  width: max-content;

  & svg:first-of-type {
    margin-right: var(--xxs);
  }

  &:hover {
    box-shadow: var(--s-button-hover);
    color: var(--c-accent);
  }

  &:focus {
    outline: 3px solid transparent;
    box-shadow: 0 0 1px 2px var(--c-blue-outline);
  }
`

const StyledIconButton = styled.button.attrs(props => ({
  color: (props.isActive) && '--c-accent' || '--c-white',
  size: props.size && `--${props.size}` || '--normal'
}))`
  ${CommonButtonStyles};
  --padding: var(--xxs);
  --size: calc(var(${props => props.size}) + var(--padding));
  --color: var(${props => props.color});
  --maxSize: calc(var(--size) + var(--padding));

  color: var(--color);
  max-width: var(--maxSize);
  max-height: var(--maxSize);
  padding: var(--padding);
  border-radius: 50%;

  & > svg {
    width: var(--size);
    height: var(--size);
  }

  &:hover > svg   {
    filter: var(--s-glow);
    color: var(--c-accent);
  }

  &:focus {
    outline: 3px solid transparent;
    box-shadow: 0 0 1px 2px var(--c-accent);
    filter: var(--s-glow);
  }
`

export const TextButton = ({ children, isUnderlined, isActive, onClickAction }) => {
  return (
    <StyledTextButton isUnderlined={ isUnderlined } isActive={ isActive } onClick={onClickAction}>
      { children }
    </StyledTextButton>
  )
}

export const Button = ({ children, isActive, onClickAction }) => {
  return (
    <StyledButton isActive={ isActive } onClick={onClickAction}>
      { children }
    </StyledButton>
  )
}

export const IconButton = ({ children, size, isActive, onClickAction }) => {
  return (
    <StyledIconButton size={size} isActive={ isActive } onClick={onClickAction}>
      { children }
    </StyledIconButton>
  )
}

