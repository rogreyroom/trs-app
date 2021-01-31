import styled, { css }  from 'styled-components';



export const StyledForm = styled.form`
  --formPadding: ${props => props.formPadding ? `var(--${props.formPadding})` : 'var(--normal)'};

  display: flex;
  flex-direction: column;
  gap: var(--m);
  align-content: center;
  justify-content: space-between;
  width: 100%;
  /* max-width: 700px; */
  min-height: 100%;
  padding: var(--formPadding);
`

export const StyledEesFormContainer = styled.section`
  --formTopMargin: ${props => props.topMargin ? `var(--${props.topMargin})` : 'var(--normal)'};

  /* grid-row: 2; */

  /* display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  margin-top: var(--formTopMargin); */

  display: grid;
  grid-template-areas: '. . . .' '. symbol percent .' '. type count_type .' '. description description .' '. . . .';
  grid-template-columns: auto repeat(2, 380px) auto;
  grid-template-rows: 1fr repeat(2, 80px) 500px 1fr;
  grid-gap: var(--xl);

  & > div:first-child {
    grid-area: symbol;
  }

  & > div:nth-child(2) {
    grid-area: percent;
  }

  & > div:nth-child(3) {
    grid-area: type;
  }

  & > div:nth-child(4) {
    grid-area: count_type;
  }

  & > div:last-child {
    grid-area: description;
  }


`

export const StyledEesForm = styled.form`
  --formPadding: ${props => props.formPadding ? `var(--${props.formPadding})` : 'var(--normal)'};

  /* display: flex;
  flex-direction: column;
  gap: var(--m);
  align-content: center;
  justify-content: space-between;
  width: 100%;
  /* max-width: 700px; */
  /* min-height: 100%; */
  /* padding: var(--formPadding);  */

  display: grid;
  grid-template-areas: 'calendar' 'controls';
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 40px;
  height: 100%;
  width: 100%;
  margin: 0;
`


export const StyledCalendarForm = styled.form`
  display: grid;
  grid-template-areas: 'calendar' 'controls';
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 40px;
  height: 100%;
  width: 100%;
  margin: 0;
`








export const StyledFieldWrapper = styled.div`
  /* display: grid;
  grid-template-areas:
    'label field';
  grid-template-columns: 235px 240px;
  grid-template-rows: var(--xl);
  grid-gap: var(--s);
  align-items: center; */
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

// export const StyledCalendarLeaveWrapper = styled.section`
//   grid-area: calendar;
//   display: grid;
//   grid-template-areas: 'title' 'error' 'calendar';
//   grid-template-columns: 1fr;
//   grid-template-rows: var(--xl) var(--m) 1fr;
//   justify-items: center;
//   align-items: start;
//   grid-gap: var(--xs);
//   margin: 0;
//   max-height: 100%;
//   position: relative;

//   & > h4 {
//     grid-area: title;
//     justify-self: center;
//     font-size: var(--fs-h5);
//     font-weight: var(--fw-normal);
//     color: var(--c-white);
//   }

//   & > span {
//     grid-area: error;
//     position: relative;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     top: 0;
//     align-content: center;
//   }

//   & > div {
//     grid-area: calendar;
//     justify-self: center;
//     align-self: center;
//   }

// `

export const StyledCalendarLeaveWrapper = styled.section.attrs({
  gridTemplate: props => props.employmentStatus ? `'. . .' '. title .' '. calendar .' '. . .'` :  `'title' 'error' 'calendar'`,
  gridColumns: props => props.employmentStatus ? 'repeat(3, 1fr)' :  '1fr',
  gridRows: props => props.employmentStatus ? `calc(1fr / 2) var(--xl) 1fr calc(1fr / 2)` :  `var(--xl) var(--m) 1fr`,
})`
  --grid-template: ${props => props.gridTemplate};
  --grid-columns:  ${props => props.gridColumns};
  --grid-rows:  ${props => props.gridRows};

grid-area: calendar;
  display: grid;
  /* grid-template-areas: 'title' 'error' 'calendar';
  grid-template-columns: 1fr;
  grid-template-rows: var(--xl) var(--m) 1fr; */
  grid-template-areas: var(--grid-template);
  grid-template-columns: var(--grid-columns);
  grid-template-rows: var(--grid-rows);
  justify-items: center;
  align-items: start;
  grid-gap: var(--xs);
  margin: 0;
  max-height: 100%;
  position: relative;

  & > h4 {
    grid-area: title;
    font-size: var(--fs-h5);
    font-weight: var(--fw-normal);
    color: var(--c-white);

    ${props => props.employmentStatus && css`
      justify-self: start;
      align-self: end;
    ` || css`
      justify-self: center;
    `}
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
    /* width: 100%; */
    ${props => props.employmentStatus && css`
      justify-self: center;
      align-self: start;
    ` || css`
      justify-self: center;
      align-self: center;
    `}
  }

`


export const StyledFormControlsWrapper = styled.div`
  grid-area: controls;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;

  & > :last-child {
    margin-left: var(--l);
  }
`