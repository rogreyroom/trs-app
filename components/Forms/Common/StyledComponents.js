import styled, { css } from 'styled-components';

const CommonFormFieldsStyles = css`
  --input-border-size: ${ props => props.error ? '1px 1px 1px var(--xxs)' : '2px'};
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

  /* TODO: Style the disable version if needed */
  &[disabled] {
    --input-border: #ccc;
    background-color: #eee;
    cursor: not-allowed;
  }
`

export const StyledForm = styled.form`
  --formPadding: ${props => props.formPadding ? `var(--${props.formPadding})` : 'var(--normal)'};

  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-around;
  width: 100%;
  max-width: 700px;
  height: 100%;
  padding: var(--formPadding);
`

export const StyledLabel = styled.label`
    color: var(--c-white);
    font-family: inherit;
    font-size: var(--fs-text);
    font-weight: var(--fw-light);
    text-align: right;
    margin: 0;
    margin-right: var(--normal);
`

export const StyledInput = styled.input`
  ${CommonFormFieldsStyles}

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

  & + span {
    ${ props => props.error && `transform: translateY(0)`};
  }
`

export const StyledSelect = styled.select`
  ${CommonFormFieldsStyles}

  appearance: none;
  grid-column: 1 / 3;
  grid-row: 1;

  & option {
    font-size: 1rem;
    font-size: max(16px, 1em);
    padding: 0.25em 0.5em;
    line-height: 1;
  }
`

export const StyledError = styled.span`
  display: block;
  background-color: var(--c-white);
  font-size: var(--s);
  color: var(--c-error);
  padding: 0 var(--xxs);
  margin: 0;
  margin-left: var(--xs);
  border: solid var(--c-error);
  border-width: 0 1px 1px 1px;
  max-width: calc(100% - 14px);
  transition: all .4s ease;
  transform: translateY(-20px);
  z-index: 1;
`

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

export const StyledTextarea = styled.textarea`
  ${CommonFormFieldsStyles}

  height: 150px;
	resize: none;

  & + span {
    ${ props => props.error && `transform: translateY(0)`};
  }
`





export const StyledFormContainer = styled.section`
  --formTopMargin: ${props => props.topMargin ? `var(--${props.topMargin})` : 'var(--normal)'};

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  margin-top: var(--formTopMargin);
`

export const StyledFieldWrapper = styled.div`

  display: grid;
  grid-template-areas:
    'label field'
    '. error';
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 20px;
  align-items: center;
  margin: 0;
  margin-bottom: var(--s);
  position: relative;

  & label {
    grid-area: label;
  }

  & span {
    grid-area: error;
  }

  & input,
  & textarea,
  & div {
    grid-area: field;
  }

  & .textarea-label  {
    align-self: flex-start;
  }
`

export const StyledSelectWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 36px;
  grid-template-rows: 36px;
  padding: 0;
  margin: 0;

  &::after {
    content: "";
    grid-column: 2 / 3;
    grid-row: 1;
    align-self: center;
    justify-self: center;
    background-color: var(--c-white);
    width: 0.8em;
    height: 0.5em;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    pointer-events: none;
    z-index: 3;
  }
`

export const StyledFormControlsWrapper = styled.div`
  --controlsTopMargin: ${props => props.topMargin ? `var(--${props.topMargin})` : 'var(--normal)'};

  display: flex;
  justify-content: flex-end;
  margin-top: var(--controlsTopMargin);

  & > :last-child {
    margin-left: var(--l);
  }
`