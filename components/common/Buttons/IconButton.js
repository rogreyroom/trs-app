import styled from 'styled-components';
import { CommonButtonStyles } from './_commonStyles'

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

export const IconButton = ({ children, size, isActive, onClickAction }) => {
  return (
    <StyledIconButton size={size} isActive={ isActive } onClick={onClickAction}>
      { children }
    </StyledIconButton>
  )
}

