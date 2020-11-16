import styled from 'styled-components'

export const StyledForm = styled.form`
  --formPadding: ${props => props.formPadding ? `var(--${props.formPadding})` : 'var(--normal)'};

  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-around;
  width: 100%;
  max-width: 700px;
  height: 100%;
  padding: var(--formPadding);
`