import { forwardRef } from 'react'
// import styled from 'styled-components';
import { StyledInput, StyledFieldWrapper } from './_commonStyles'


// This should go to @/common/*
import { Label } from '@/common/Labels'
import { Error } from '@/common/Errors'


export const Input = forwardRef(({ name, type, label, error, errorMessage, min, max, step, value, onChange }, ref) => {
  return (
    <StyledFieldWrapper>
      <Label name={name} label={label} />
      <StyledInput type={type} name={name} ref={ref} error={error} min={min} max={max} step={step} value={value} onChange={onChange} />
      <Error error={error} errorMessage={errorMessage} />
    </StyledFieldWrapper>
  )
})

