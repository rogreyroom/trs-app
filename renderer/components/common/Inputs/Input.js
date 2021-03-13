import { forwardRef, useState, useEffect } from 'react'
import { StyledInput, StyledFieldWrapper } from './_commonStyles'
import { Label } from '@/common/Labels'
import { Error } from '@/common/Errors'


export const Input = forwardRef(({ name, type, label, error, errorMessage, min, max, step, value, onChange, disable, ee }, ref) => {
  const [isDisabled, setIsDisabled] = useState(disable || false)

  useEffect(() => {
    isDisabled !== disable && setIsDisabled(isDisabled => disable)
  }, [disable])

  const handleFocus = (event) => event.target.select()

  return (
    <StyledFieldWrapper>
      <Label name={name} label={label} />
      <StyledInput type={type} name={name} ref={ref} error={error} min={min} max={max} step={step} value={value} onFocus={handleFocus} onChange={onChange} disabled={isDisabled} />
      <Error error={error} errorMessage={errorMessage} />
    </StyledFieldWrapper>
  )
})

