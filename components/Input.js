import { forwardRef } from 'react'
import { StyledFieldWrapper, StyledLabel, StyledInput, StyledError } from './styled'

export const Input = forwardRef(({ name, type, label, error, errorMessage }, ref) => {
  return (
    <StyledFieldWrapper>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput type={type} name={name} ref={ref} error={error}/>
      <StyledError>{errorMessage}</StyledError>
    </StyledFieldWrapper>
  )
})
