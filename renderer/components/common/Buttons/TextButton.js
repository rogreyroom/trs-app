import styled from 'styled-components';
import { CommonButtonStyles } from './_commonStyles'


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

  &:focus, &:active {
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
