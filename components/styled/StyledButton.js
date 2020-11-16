import styled from 'styled-components'

export const StyledButton = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-family: inherit;
  font-size: var(--fs-text);
  font-weight: var(--fw-normal);
  line-height: 1;
  background: var(--c-blue-03);
  box-shadow: var(--s-button);
  color: var(--c-white);
  border: none;
  border-radius: var(--xs);
  margin: 0;
  padding: var(--s) var(--xl);
  min-width: 130px;
  cursor: pointer;
  transition: box-shadow 250ms ease-in-out;

  & > :first-child {
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