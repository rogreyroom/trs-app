import styled, { css } from 'styled-components';

export const CommonInputStyles = css`
  --input-border-size: ${ props => props.error ? '1px' : '2px'};
  --input-border-color: ${ props => props.error ? 'var(--c-error)' : 'transparent'};

  background-color: var(--c-blue-03);
  font-family: inherit;
  font-size: 1rem;
  font-size: max(16px, 1em);
  font-weight: var(--fw-light);
  color: var(--c-white);
  padding: 0.25em 0.5em;
  border-style: solid;
  border-color: var(--input-border-color);
  border-width: var(--input-border-size);
  border-radius: var(--xxs);
  width: 100%;
  cursor: pointer;
  transition: 180ms box-shadow ease-in-out;
  z-index: 2;

  &:focus {
    outline: 3px solid transparent;
    box-shadow: 0 0 1px 2px var(--c-blue-outline);
  }

  &::placeholder {
    color: var(--c-black);
    opacity: 1;
  }

  &::-moz-placeholder {
    opacity: 1;
  }

  &:not(textarea) {
    line-height: 1;
    height: 2.25rem;
  }

  &[disabled] {
    --input-border: var(--c-blue-01);
    background-color: var(--c-blue-01);
    color: var(--c-blue-03);
    cursor: not-allowed;
  }
`

export const StyledInput = styled.input`
  ${CommonInputStyles}

  &[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
    margin: 0;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

export const StyledFieldWrapper = styled.div`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: var(--normal);
  align-items: center;

  & > input,
  & > div select,
  & > div.DatePicker {
    --size: 216px;
    min-width: var(--size);
    max-width: var(--size);
  }

  div {
    margin: 0;
  }
`