import styled from 'styled-components';

export const StyledError = styled.span`
  display: block;
  background-color: var(--c-white);
  font-size: var(--s);
  color: var(--c-error);
  padding: 0 var(--xxs);
  margin: 0;
  margin-left: var(--xs);
  border: solid var(--c-error);
  border-width: 0 1px 1px 1px;
  max-width: calc(100% - 14px);
  transition: all .4s ease;
  transform: translateY(-20px);
  z-index: 1;
`
