import styled from 'styled-components';

export const StyledRtsFormContainer = styled.section`
  width: 100%;
  height: 100%;
  margin: 0;
  display: grid;
`

export const StyledRtsForm = styled.form`
    display: grid;
    grid-template-areas: 'calendar inputs' 'calendar buttons' 'calendar evaluation' 'data data' 'controls controls';
    grid-template-columns: repeat(2, 1fr);
    /* grid-template-rows: repeat(2, auto) auto 40px; */
    grid-template-rows: repeat(3, auto) 1fr 40px;
    grid-gap: var(--xs);
    min-height: 100%;
  `

  export const StyledRtsCalendarWrapper = styled.section`
    grid-area: calendar;
    display: grid;
    grid-template-areas: 'title' 'error' 'calendar';
    grid-template-columns: 1fr;
    grid-template-rows: var(--xl) var(--m) 1fr;
    justify-items: center;
    align-items: start;
    grid-gap: var(--xs);
    margin: 0;

    & > h4 {
      /* grid-row: 1 / 1; */
      grid-area: title;
      justify-self: start;
      font-size: var(--fs-h4);
      font-weight: var(--fw-normal);
      color: var(--c-white);
    }

    & > span {
      grid-area: error;
      position: relative;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      align-content: center;
    }

    & > div {
      grid-area: calendar;
      justify-self: center;
      align-self: center;
    }
  `

  export const StyledRtsInputsWrapper = styled.section`
  grid-area: inputs;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: var(--xl) var(--m) 1fr;
  grid-gap: var(--xs);
  justify-items: center;
  align-items: start;
  margin: 0;

  & h4 {
    grid-row: 1 / 1;
    grid-column: 1 / 4;
    justify-self: start;
    font-size: var(--fs-h4);
    font-weight: var(--fw-normal);
    color: var(--c-white);
  }

  & div {
    grid-row: 3 / 3;

    & input {
      --size: 50px;
    }
  }
`

export const StyledRtsEvalControlsWrapper = styled.section`
  grid-area: buttons;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: var(--xl) var(--xxl);
  grid-gap: var(--s);
  justify-items: center;
  align-items: center;
  margin: 0;

  & h4 {
    grid-row: 1 / 1;
    grid-column: 1 / 5;
    justify-self: start;
    font-size: var(--fs-h4);
    font-weight: var(--fw-normal);
    color: var(--c-white);
  }
`

export const StyledRtsEvalInputsWrapper = styled.section`
  grid-area: evaluation;
  align-self: end;
  display: grid;
  /* grid-template-areas: 'title percent . .' 'textarea button'; */
  grid-template-columns: 50px 80px 1fr max-content;
  grid-template-rows: var(--xl) 130px;
  grid-gap: var(--xs);
  justify-items: center;
  align-items: center;
  margin: 0;

  & h4 {
    grid-row: 1 / 1;
    grid-column: 1 / 2;
    justify-self: start;
    font-size: var(--fs-h4);
    font-weight: var(--fw-normal);
    color: var(--c-white);
  }

  & button {
    grid-row: 2 / 2;
    grid-column: 4 / 5;

    max-width: max-content;
    max-height: 32px;
    min-width: 0;
    padding: var(--s) var(--m);
  }
`

export const StyledRtsEvalOutputWrapper = styled.section`
  grid-area: data;
  margin: 0;
  /* background: hotpink; */
`

export const StyledEvalList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const StyledEvalListItem = styled.li`
  margin: 0;
  display: flex;
  gap: var(--xs);
  align-items: center;

  & span {
    margin: 0;
    font-size: var(--fs-h6);
    font-weight: var(--fw-light);
    color: var(--c-white);
  }
`