import { forwardRef, useState, useEffect } from 'react'
// import styled from 'styled-components';
import { StyledInput, StyledFieldWrapper } from './_commonStyles'


// This should go to @/common/*
import { Label } from '@/common/Labels'
import { Error } from '@/common/Errors'


export const Input = forwardRef(({ name, type, label, error, errorMessage, min, max, step, value, onChange, disable, ee }, ref) => {
  const [isDisabled, setIsDisabled] = useState(disable || false)

  useEffect(() => {
    isDisabled !== disable && setIsDisabled(isDisabled => disable)
  }, [disable])

  return (
    <StyledFieldWrapper>
      <Label name={name} label={label} />
      <StyledInput type={type} name={name} ref={ref} error={error} min={min} max={max} step={step} value={value} onChange={onChange} disabled={isDisabled} />
      <Error error={error} errorMessage={errorMessage} />
    </StyledFieldWrapper>
  )
})

