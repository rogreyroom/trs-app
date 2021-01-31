import { forwardRef } from 'react'
import styled from 'styled-components'
import { CommonInputStyles, StyledFieldWrapper } from './_commonStyles'

// This should go to @/common/*
import { Label } from '@/common/Labels'
import { Error } from '@/common/Errors'


const StyledSelectWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 36px;
  grid-template-rows: 36px;
  padding: 0;
  margin: 0;

  &::after {
    content: "";
    grid-column: 2 / 3;
    grid-row: 1;
    align-self: center;
    justify-self: center;
    background-color: var(--c-white);
    width: 0.8em;
    height: 0.5em;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    pointer-events: none;
    z-index: 3;
  }
`

const StyledSelect = styled.select`
  ${CommonInputStyles}

  appearance: none;
  grid-column: 1 / 3;
  grid-row: 1;

  & option {
    margin: 0;
    font-size: 1rem;
    font-size: max(16px, 1em);
    padding: 0.25em 0.5em;
    line-height: 1;
  }
`

export const Select = forwardRef(({name, label, optionsArray, error, errorMessage, onChange, selected}, ref) => {
  return (
    <StyledFieldWrapper>
      <Label name={name} label={label} />
      <StyledSelectWrapper>
        <StyledSelect name={name} ref={ref} error={error} defaultValue={selected} onChange={onChange} >
            {
              optionsArray.map(({label, value}) => (
              <option value={value} key={value}>{label}</option>
              ))
            }
        </StyledSelect>
      </StyledSelectWrapper>
      <Error error={error} errorMessage={errorMessage} />
    </StyledFieldWrapper>
  )
})
