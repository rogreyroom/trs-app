import styled  from 'styled-components';

export const StyledEmployeeForm = styled.form`
    --max-width: ${props => props.edit ? `100%` : `80%` };
    display: grid;
    grid-template-areas: 'inputs' 'controls';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 40px;
    grid-gap: var(--xs);
    min-height: 100%;
    margin: 0 auto;
    min-width: var(--max-width);
    max-width: var(--max-width);
`

export const StyledAddEmployeeInputsWrapper = styled.section`
  grid-area: inputs;
  display: grid;
  grid-gap: var(--s);
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(9, 1fr);
  grid-auto-flow: column;
`

export const StyledEditEmployeeInputsWrapper = styled.section`
  grid-area: inputs;
  display: grid;
  grid-gap: var(--s);
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, auto);
  grid-auto-flow: column;
`

export const StyledEditFieldsWrap = styled.section`
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--xxs);
  justify-content: space-between;

  h4 {
    grid-column: 1 / 3;
    align-self: center;
    font-weight: var(--fw-normal);

    & + div, & + div + div  {
      align-self: start;
    }
  }
`