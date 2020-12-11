import styled from 'styled-components'

export const StyledMain = styled.main.attrs({
  template: props => props.dashboard && `'title title employee-nav employee-nav' 'details content content content' 'details content content content' ` || 'content',
  columns: props => props.dashboard && '290px 1fr 1fr 1fr' || '1fr',
  rows: props => props.dashboard && '50px 1fr' || '50px 1fr',
  padding: props => props.dashboard && '0 var(--xl) var(--xl) var(--l)' || 'var(--xxl)'
})`
  --grid-template: ${props => props.template};
  --grid-columns:  ${props => props.columns};
  --grid-rows:  ${props => props.rows};
  --padding: ${props => props.padding};

  display: grid;
  grid-template-areas: var(--grid-template);
  grid-template-columns: var(--grid-columns);
  grid-template-rows: var(--grid-rows);
  padding: var(--padding);
  margin: 0;
  width: 100%;
  height: 100%;

  position: relative;
`

export const Main = ({ children, dashboard }) => {
  console.log('Main is dashboard', dashboard);
  return (
    dashboard && (
    <StyledMain dashboard>
      { children }
    </StyledMain>
    ) || (
      <StyledMain>
      { children }
    </StyledMain>
    )
  )
}