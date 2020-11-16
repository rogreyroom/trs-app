import styled from 'styled-components'
import { CommonFormFieldsStyles } from './CommonStyles'

export const StyledInput = styled.input`
  ${CommonFormFieldsStyles}

  &[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
    margin: 0;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  & + span {
    ${ props => props.error && `transform: translateY(0)`};
  }
`
