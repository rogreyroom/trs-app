import { useContext } from 'react'
import { DashboardContext } from '@/contexts/DashboardContext'

import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
// import Joi from 'joi';
// import { eesFormSchema } from '../../../lib/db/schemas'


import { StyledCalendarForm, StyledFormControlsWrapper, StyledCalendarLeaveWrapper } from '@/common/CommonWrappers'
import { Button } from '@/common/Buttons';

// https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/core-concepts
import { plLocale } from '@/lib/calendarLocale'
import { Calendar } from "react-modern-calendar-datepicker"

import {mutate} from 'swr'
import { axios } from '@/lib/axios-config'



export const EmploymentStatusForm = ({ id }) => {
  const [employee, setEmployee] = useContext(DashboardContext).employee
  const [employeesFilter, setEmployeesFilter] = useContext(DashboardContext).filter
  const calendarDefaultValue = employee.employment_termination_date
  const { handleSubmit, control, reset, errors } = useForm()

  const onSubmit = async (data, e) => {
    const terminationDate = data.terminationDate
    await mutate(`/api/employees/${id}`, employee => ({ ...employee, employment_termination_date: terminationDate, employment_status: false }))
    await axios.put(`/api/employees/${id}`, { field: 'termination', value: { date: terminationDate, status: false }})
    mutate()
    setEmployeesFilter(employeesFilter => false)
    reset(data)
  }

  const handleReset = () => {
    reset({terminationDate: calendarDefaultValue})
  }

  return (

        <StyledCalendarForm  onSubmit={handleSubmit(onSubmit)}>
          {/* <StyledCalendarWrapper> */}
            <StyledCalendarLeaveWrapper employmentStatus>
          <h4>Wybierz datę</h4>
          <Controller
            control={control}
            name="terminationDate"
            defaultValue={calendarDefaultValue}
            render={ ({ onChange, value })  =>
              <Calendar
                value={value}
                onChange={onChange}
                locale={plLocale}
                calendarClassName="custom-calendar"
                shouldHighlightWeekends
                error={!!errors.terminationDate}
                errorMessage={errors?.terminationDate && 'Data jest wymagana!'}
              />
            }
          />
          </StyledCalendarLeaveWrapper>
          {/* </StyledCalendarWrapper> */}

          <StyledFormControlsWrapper>
            <Button type='button' onClickAction={handleReset}>Anuluj</Button>
            <Button type='submit'>Dodaj</Button>
          </StyledFormControlsWrapper>
        </StyledCalendarForm>

  )
}
