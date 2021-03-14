import styled from 'styled-components';

export const StyledResponsibilitiesForm = styled.form`
  --max-width: ${(props) => (props.edit ? `100%` : `80%`)};
  display: grid;
  grid-template-areas: 'inputs' 'controls';
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 40px;
  grid-gap: var(--xl);
  min-height: 100%;
  min-width: 100%;
`;

export const StyledResponsibilitiesPage = styled.div`
  display: grid;
  grid-template-areas: 'title button' 'content content' 'form form';
  grid-template-columns: max-content 1fr;
  grid-template-rows: 48px 1fr 1fr;
  grid-gap: var(--l);
  align-items: center;
  width: 100%;
  height: 100%;

  & > h1 {
    grid-area: title;
  }

  & > button {
    grid-area: button;
    max-width: max-content;
    max-height: 32px;
    min-width: 0;
    padding: var(--s) var(--l);
  }

  & > section {
    grid-area: content;
  }

  & > :last-child {
    grid-area: form;
  }
`;

export const ResponsibilitiesDataSection = styled.section`
  font-size: var(--fs-text);
  font-weight: var(--fw-light);
  color: var(--c-white);
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const ResponsibilitiesFormSection = styled.section`
  margin: 0;
  width: 100%;
  height: 100%;
`;
