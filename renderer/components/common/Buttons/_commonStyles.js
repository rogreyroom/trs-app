import {css} from 'styled-components';

export const CommonButtonStyles = css`
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
`;
