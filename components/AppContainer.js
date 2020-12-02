import styled from 'styled-components'

export const AppContainer = styled.div.attrs({
  template: props => props.login ? 'main' : props.dashboard ? `'header header' 'aside main'` : `'header' 'main'`,
  columns: props => props.login ? '1fr' : props.dashboard ? '250px 1fr' : '1fr',
  rows: props => props.login ? '1fr' : props.dashboard ? '104px 1fr' : '104px 1fr',
})`
  --grid-template: ${props => props.template};
  --grid-columns:  ${props => props.columns};
  --grid-rows:  ${props => props.rows};

  display: grid;
  grid-template-areas: var(--grid-template);
  grid-template-columns: var(--grid-columns);
  grid-template-rows: var(--grid-rows);
  /* TODO: how to deal with this? */
  width: 100%;
  min-height: 100vh;
  justify-items: center;
  align-items: center;
  background: var(--g-page);
  margin: 0;
`