import { forwardRef } from 'react'
import { StyledFieldWrapper, StyledLabel, StyledTextarea, StyledError } from './styled'

export const Textarea = forwardRef(({ name, label, error, errorMessage }, ref) => {
  return (
    <StyledFieldWrapper>
      <StyledLabel className='textarea-label' htmlFor={name}>{label}</StyledLabel>
      <StyledTextarea  name={name} ref={ref} error={error}/>
      <StyledError>{errorMessage}</StyledError>
    </StyledFieldWrapper>
  )
})
