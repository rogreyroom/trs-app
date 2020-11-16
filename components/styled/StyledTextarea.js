import styled from 'styled-components';
import { CommonFormFieldsStyles } from './CommonStyles'

export const StyledTextarea = styled.textarea`
  ${CommonFormFieldsStyles}

  height: 150px;
	resize: none;

  & + span {
    ${ props => props.error && `transform: translateY(0)`};
  }
`