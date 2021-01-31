import { forwardRef } from 'react'
import styled, { css } from 'styled-components';
import { StyledInput } from './_commonStyles'

// This should go to @/common/*
import { Label } from '@/common/Labels'
import { Error } from '@/common/Errors'


const StyledPercentWrapper = styled.div`
  margin: 0;
  display: flex;
  align-items: center;

  ${props => props.isEvalInput && css`
    grid-row: 1 / 1;
    grid-column: 2 / 3;
  `}

  & > label {
    margin-left: var(--s);
  }
`

// Is it necessary
export const PercentInput = forwardRef(({ name, label, error, errorMessage, value, onChange }, ref) => {
  return (
    <StyledPercentWrapper isEvalInput>
      <StyledInput type='number' name={name} ref={ref} error={error} value={value} onChange={onChange} />
      <Label name={name} label={label} />
      <Error error={error} errorMessage={errorMessage} />
    </StyledPercentWrapper>
  )
})

