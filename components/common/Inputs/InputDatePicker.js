import { useState, forwardRef } from 'react'
import { useController } from "react-hook-form"
import { plLocale } from '@/lib/calendarLocale'
import DatePicker from "react-modern-calendar-datepicker";
import { StyledInput, StyledFieldWrapper } from './_commonStyles'

// This should go to @/common/*
import { Label } from '@/common/Labels'
import { Error } from '@/common/Errors'
//---------------


export const InputDatePicker = forwardRef(({ control, name, label, error, errorMessage, isRequired}, ref) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const { field: { value, ...props  } , meta } = useController({name, control});

  function customDateInput ({ ref }) {
    return (
      <>
      <StyledInput
        placeholder="Wybierz dzień"
        value={value ? `${value.day}.${value.month}.${value.year}` : ''}
        ref={ref}
        name={name}
        error={error}
        readOnly
      />
      </>
  )}

  return (
    <StyledFieldWrapper value={selectedDay}>
      <Label name={name} label={label} />
      <DatePicker
        value={selectedDay}
        onChange={setSelectedDay}
        renderInput={customDateInput}
        shouldHighlightWeekends
        locale={plLocale}
        calendarClassName="custom-calendar"
        wrapperClassName="custom-date-picker"
        inputClassName="custom-input"
        {...props}
        ref={ref}
      />
      <Error error={error} errorMessage={errorMessage} />
    </StyledFieldWrapper>
  )
})
