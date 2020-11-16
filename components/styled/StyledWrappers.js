import styled from 'styled-components'

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