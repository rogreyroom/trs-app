import styled from 'styled-components'

export const AppContainer = styled.div.attrs({
  gridTemplate: props => props.login ? 'main' : props.dashboard ? `'header header' 'aside main'` : `'header' 'main'`,
  gridColumns: props => props.login ? '1fr' : props.dashboard ? `250px 1fr` : '1fr',
  gridRows: props => props.login ? '1fr' : props.dashboard ? '104px 1fr' : '104px 1fr',
})`
  --grid-template: ${props => props.gridTemplate};
  --grid-columns:  ${props => props.gridColumns};
  --grid-rows:  ${props => props.gridRows};

  display: grid;
  grid-template-areas: var(--grid-template);
  grid-template-columns: var(--grid-columns);
  grid-template-rows: var(--grid-rows);
  width: 100%;
  min-height: 100vh;
  justify-items: center;
  align-items: center;
  background: var(--g-page);
  margin: 0;
`