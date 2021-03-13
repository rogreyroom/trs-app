import styled from 'styled-components';
import { CommonButtonStyles } from './_commonStyles'


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
  max-height: 40px;
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

const StyledSmallButon = styled(StyledButton)`
  padding: var(--xs) var(--s);
  max-height: 32px;
  max-width: max-content;
  min-width: 0;
`

export const Button = ({ children, isActive, onClickAction }) => {
  return (
    <StyledButton isActive={ isActive } onClick={onClickAction}>
      { children }
    </StyledButton>
  )
}

export const ButtonSmall = ({ children, isActive, onClickAction }) => {
  return (
    <StyledSmallButon isActive={ isActive } onClick={onClickAction}>
      { children }
    </StyledSmallButon>
  )
}