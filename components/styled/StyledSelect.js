import styled from 'styled-components';
import { CommonFormFieldsStyles } from './CommonStyles'

export const StyledSelect = styled.select`
  ${CommonFormFieldsStyles}

  appearance: none;
  grid-column: 1 / 3;
  grid-row: 1;

  & option {
    font-size: 1rem;
    font-size: max(16px, 1em);
    padding: 0.25em 0.5em;
    line-height: 1;
  }
`
