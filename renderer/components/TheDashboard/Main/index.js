import styled from 'styled-components';

export const StyledMain = styled.main.attrs({
  GridTemplate: (props) =>
    (props.dashboard &&
      `'title title employee-nav employee-nav' 'details content content content' 'details content content content' `) ||
    `'title' 'content'`,
  GridColumns: (props) => (props.dashboard && '290px 1fr 1fr 1fr') || '1fr',
  GridRows: (props) => (props.dashboard && '50px 1fr') || '50px 1fr',
  GridPadding: (props) =>
    (props.dashboard && '0 var(--xl) var(--xl) var(--l)') || 'var(--xxl)',
})`
  --grid-template: ${(props) => props.GridTemplate};
  --grid-columns: ${(props) => props.GridColumns};
  --grid-rows: ${(props) => props.GridRows};
  --padding: ${(props) => props.GridPadding};

  display: grid;
  grid-template-areas: var(--grid-template);
  grid-template-columns: var(--grid-columns);
  grid-template-rows: var(--grid-rows);
  padding: var(--padding);
  margin: 0;
  width: 100%;
  height: 100%;
  position: relative;

  & h1 {
    align-self: center;
  }
`;

export const Main = ({children, dashboard}) => {
  return (
    (dashboard && <StyledMain dashboard>{children}</StyledMain>) || (
      <StyledMain>{children}</StyledMain>
    )
  );
};
