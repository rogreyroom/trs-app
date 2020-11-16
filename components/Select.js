import { forwardRef } from 'react'
import { StyledFieldWrapper, StyledSelectWrapper, StyledLabel, StyledSelect, StyledError } from './styled'


export const Select = forwardRef(({name, label, optionsArray, error, errorMessage}, ref) => {
  return (
    <StyledFieldWrapper>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledSelectWrapper>
        <StyledSelect name={name} ref={ref} error={error}>
            {
              optionsArray.map(({label, value}) => (
              <option value={value} key={value}>{label}</option>
              ))
            }
        </StyledSelect>
      </StyledSelectWrapper>
      <StyledError>{errorMessage}</StyledError>
    </StyledFieldWrapper>
  )
})
