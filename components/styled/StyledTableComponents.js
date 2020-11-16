import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--xxl);
`

export const StyledThead = styled.thead`
  border-bottom: 1px solid var(--c-blue-03);
`

export const StyledTh = styled.th`
  color: var(--c-white);
  font-weight: var(--fw-normal);
  font-size: var(--fs-text);
  line-height: var(--lh-large);
  text-align: center;
  padding: var(--xs) var(--normal);

  &:last-child {
    text-align: left;
  }
`

export const StyledTbody = styled.tbody`
  &::before {
    content: '';
    display: block;
    height: var(--normal);
    width: 100%;
  }
`

export const StyledTr = styled.tr`
  border-bottom: 1px solid var(--c-blue-01);
`

export const StyledTd = styled.td`
  color: var(--c-white);
  font-weight: var(--fw-light);
  font-size: var(--fs-text);
  text-align: center;
  padding: var(--xs) var(--normal);
  margin: var(--xxs) 0;

  &:first-child > * {
    margin: 0 auto;
  }

  &:last-child {
    text-align: left;
  }
`