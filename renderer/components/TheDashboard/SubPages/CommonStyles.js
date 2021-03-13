import styled from 'styled-components'

export const StyledLeavePages = styled.section`
  margin: 0;
  display: grid;
  grid-template-areas: 'title title' 'data form';
  grid-template-columns: minmax(293px, max-content) 1fr;
  grid-template-rows: 40px 1fr;
  grid-gap: var(--s);
  min-height: 100%;
  max-width: 100%;
  justify-items: start;
  align-items: start;

  & > h1 {
    grid-area: title;
    margin: 0;
  }

  & > section {
    grid-area: data;
  }

  & > form {
    grid-area: form;
    margin: 0;
  }
`
