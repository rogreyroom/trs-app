
import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
// import { eesFormSchema } from '../../../lib/db/schemas'



import {
  StyledRtsFormContainer,
  StyledRtsForm,
  StyledRtsCalendarWrapper,
  StyledRtsInputsWrapper,
  StyledRtsEvalControlsWrapper,
  StyledRtsEvalInputsWrapper,
  StyledRtsEvalOutputWrapper,
  StyledEvalList,
  StyledEvalListItem,

} from './styles'

import { StyledFormControlsWrapper } from '@/common/CommonWrappers'
import { SvgEdit, SvgRemove } from '@/icons'
import { Input, PercentInput, EvaluationTextarea } from '@/common/Inputs';
import { Button, ButtonSmall, IconButton } from '@/common/Buttons';
import { Error } from '@/common/Errors'
import { errorMessages } from '@/lib/errorMessages'

// https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/core-concepts
import { plLocale } from '@/lib/calendarLocale'
import { Calendar } from "react-modern-calendar-datepicker"

import { useRef, useState, useEffect, useContext } from 'react';
import { DashboardContext } from '@/contexts/DashboardContext'
import { axios } from '@/lib/axios-config'
import useSWR from 'swr';



const fetcher = url => axios.get(url).then(res => res.data)



const schema = Joi.object().keys({
  due_date: Joi.object().length(3).required(),
  working_hours: Joi.number().required(),
  overtime_hours: Joi.number(),
  weekend_hours: Joi.number(),
})



export const RtsForm = ({ id }) => {
  const [employee, setEmployee] = useContext(DashboardContext).employee
  const [isEvalEdit, setIsEvalEdit] = useState(false)
  const [editedEvalIndex, setEditedEvalIndex] = useState(null)

  // Get ees data
  const { data: eesData } = useSWR(`api/ees/`, fetcher)
  const formFieldsDefaultValues = {due_date: null, working_hours: null, overtime_hours: null, weekend_hours: null, evaluationDescription: '', ew_percent: null}
  const { register, control, watch, getValues, handleSubmit, reset, errors, formState: { isSubmitSuccessful } } = useForm({
    // mode: 'onBlur',
    // resolver: joiResolver(employeeFormSchema),
    resolver: joiResolver(schema),
    defaultValues: formFieldsDefaultValues
  })
  // Refs
  const evalDescriptionRef = useRef(null)
  const evalPercentRef = useRef(null)

  // Form watch
  const watchCalendarChange = watch('due_date', null)
  const [isRtsEdit, setIsRtsEdit] = useState(false)

  // Data holders
  const [submittedData, setSubmittedData] = useState({})
  const [evalArray, setEvalArray] = useState([])

  // Evaluation chosen option [SP, MP, LP, EW]
  const [evaluation, setEvaluation] = useState(null)

  // React controlled components
  const [evalDescription, setEvalDescription] = useState('')
  const [ewEvalPercent, setEwEvalPercent] = useState(0)
  const [workingHours, setWorkingHours] = useState(0)
  const [overtimeHours, setOvertimeHours] = useState(0)
  const [weekendHours, setWeekendHours] = useState(0)

  const handleHours = (getValuesFunction) => {
    const newValue = getValuesFunction('working_hours')
    setWorkingHours(workingHours => newValue)
  }

  const handleOvertime = (getValuesFunction) => {
    const newValue = getValuesFunction('overtime_hours')
    setOvertimeHours(overtimeHours => newValue)
  }

  const handleWeekend = (getValuesFunction) => {
    const newValue = getValuesFunction('weekend_hours')
    setWeekendHours(weekendHours => newValue)
  }

  const handleEwEvalPercent = (e) => {
    const newValue = e.target.value
    setEwEvalPercent(ewEvalPercent => newValue)
  }

  const handleEvalDescription = (e) => {
    const newValue = e.target.value
    setEvalDescription(evalDescription => newValue)
  }

  const handleEvaluationEdit = (evalArrayIndex, e) => {
    e.preventDefault()
    setIsEvalEdit(isEvalEdit => true)
    setEditedEvalIndex(editedEvalIndex => evalArrayIndex)
    setEvaluation(evaluation => evalArray[evalArrayIndex].name)
    setEvalDescription(evalDescription => evalArray[evalArrayIndex].description)
    evalArray[evalArrayIndex].name === 'EW' && setEwEvalPercent(ewEvalPercent => evalArray[evalArrayIndex].percent)
  }

  const handleEvaluationDelete = (evalArrayIndex, e) => {
    e.preventDefault()
    const newEvalArray = [...evalArray]
    newEvalArray.splice(evalArrayIndex, 1)
    setEvalArray(evalArray => newEvalArray)
  }


  const handleEvaluationEditSubmit = (e) => {
    e.preventDefault()
    const newEvalArray = [...evalArray]
    evaluation === 'EW' ?
      newEvalArray[editedEvalIndex] = {...newEvalArray[editedEvalIndex], description: evalDescription, percent : ewEvalPercent}
      :
      newEvalArray[editedEvalIndex] = {...newEvalArray[editedEvalIndex], description: evalDescription}
    setEvalArray(evalArray => newEvalArray)
    setEditedEvalIndex(editedEvalIndex => null)
    setIsEvalEdit(isEvalEdit => false)
    setEvalDescription(null)
    setEwEvalPercent(ewEvalPercent => 0)
    setEvaluation(null)
  }

  const handleEvaluationSubmit = () => {
    const percentIs = ['SP', 'MP', 'LP'].includes(evaluation) ?
                    eesData.filter(({symbol}) => symbol === evaluation)[0].percent : ewEvalPercent
    setEvalArray(evalArray => [...evalArray, {name: evaluation, description: evalDescription, percent: percentIs}])
    setEvalDescription(evalDescription => '')
    if (evaluation === 'EW') setEwEvalPercent(ewEvalPercent => 0)
    setEvaluation(null)
  }

  const onSubmit = async (data) => {
    // It Adds new data to the employee RTS
    const resultData= {...data, evaluation: evalArray}
    const yearIs = resultData.due_date.year
    const monthIs = resultData.due_date.month
    const valueIs = { ...resultData }

    if (isRtsEdit){
      await axios.put(`/api/employees/${id}`, { field: 'update_rts', queryFields: { year: yearIs, month: monthIs }, value: { ...valueIs }})
      setIsRtsEdit(isRtsEdit => false)
    } else {
      await axios.put(`/api/employees/${id}`, { field: 'add_rts', queryFields: { year: yearIs, month: monthIs }, value: { ...valueIs }})
    }

    setSubmittedData(submittedData => resultData)
  }

  const handleReset = () => {
    reset(formFieldsDefaultValues)
    setEvaluation(null)
    setEvalDescription(null)
    setEvalArray([])
  }

  // Utils
  const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]))

  const getCurrentMonthData = (employeeCalendar, givenYear, givenMonth, givenDate) => {
    const givenYearMonths = employeeCalendar.filter(({year}) => parseInt(year) === givenYear)[0]?.months
    const givenMonthRts = givenYearMonths?.filter(({month}) => parseInt(month) == givenMonth)[0]?.rts
    return givenMonthRts?.filter(({ due_date }) => isEqual(due_date, givenDate))[0]
  }
// ------end utils

  useEffect(() => {
    if (watchCalendarChange !== null) {
      setEvaluation(evaluation => '')
      setEvalDescription(evalDescription => '')
      const res = getCurrentMonthData(employee.calendar, watchCalendarChange.year, watchCalendarChange.month, watchCalendarChange)

      if ( res ) {
        setEvalArray(evalArray => [...res.evaluation])
        setWorkingHours(workingHours => res.working_hours)
        setOvertimeHours(overtimeHours => res.overtime_hours)
        setWeekendHours(weekendHours => res.weekend_hours)
        setIsRtsEdit(isRtsEdit => true)
      } else {
        setEvalArray(evalArray => [])
        setWorkingHours(workingHours => 0)
        setOvertimeHours(overtimeHours => 0)
        setWeekendHours(weekendHours => 0)
        setIsRtsEdit(isRtsEdit => false)
      }
    }

    if (isSubmitSuccessful) {
      console.log('isSubmitSuccessful')
      reset(formFieldsDefaultValues)
      setEvaluation(null)
      setEvalDescription(null)
      setEvalArray([])
    }
  }, [isSubmitSuccessful, submittedData, reset, watchCalendarChange]);

  // TODO: add error handling for inputs

  return (
      <StyledRtsFormContainer>
        <StyledRtsForm  onSubmit={handleSubmit(onSubmit)}>
          <StyledRtsCalendarWrapper>
            <h4>Wybierz datę</h4>
            <Error error={!!errors?.due_date} errorMessage={[errorMessages.dateRange]} />
            <Controller
              control={control}
              name="due_date"
              render={ ({ onChange, value })  =>
              <Calendar
              value={value}
              onChange={onChange}
              locale={plLocale}
              calendarClassName="custom-calendar"
              shouldHighlightWeekends
              error={!!errors.due_date}
              />
            }
          />
          </StyledRtsCalendarWrapper>

          <StyledRtsInputsWrapper>
            <h4>Podaj czas pracy</h4>
              <Input
                name='working_hours'
                type='number'
                label='Obecność'
                min='0' max='8' step='1'
                value={workingHours}
                onChange={() => handleHours(getValues)}
                error={!!errors.working_hours}
                errorMessage={errors?.working_hours && [errorMessages.notEmpty, errorMessages.numericValue]}
                ref={register}
              />

              <Input
                name='overtime_hours'
                type='number'
                label='Nadgodziny'
                min='0' max='8' step='1'
                value={overtimeHours}
                onChange={() => handleOvertime(getValues)}
                error={!!errors.overtime_hours}
                errorMessage={errors?.overtime_hours && [errorMessages.notEmpty, errorMessages.numericValue]}
                ref={register}
              />

              <Input
                name='weekend_hours'
                type='number'
                label='Dyżur'
                min='0' max='16' step='1'
                value={weekendHours}
                onChange={() => handleWeekend(getValues)}
                error={!!errors.weekend_hours}
                errorMessage={errors?.weekend_hours && [errorMessages.notEmpty, errorMessages.numericValue]}
                ref={register}
              />

          </StyledRtsInputsWrapper>

          <StyledRtsEvalControlsWrapper>
              <h4>Ocena pracownika</h4>
              <ButtonSmall type='button' onClickAction={() => setEvaluation('SP')}>SP</ButtonSmall>
              <ButtonSmall type='button' onClickAction={() => setEvaluation('MP')}>MP</ButtonSmall>
              <ButtonSmall type='button' onClickAction={() => setEvaluation('LP')}>LP</ButtonSmall>
              <ButtonSmall type='button' onClickAction={() => setEvaluation('EW')}>EW</ButtonSmall>
          </StyledRtsEvalControlsWrapper>


          <StyledRtsEvalInputsWrapper>
            {evaluation &&
            <>
              <h4>{evaluation}</h4>
              {evaluation === 'EW' && <PercentInput
                                        name='ew_evaluation_percent'
                                        type='number'
                                        label='%'
                                        min='0' max='200' step='1'
                                        value={ewEvalPercent}
                                        onChange={(e) => handleEwEvalPercent(e)}
                                        error={!!errors.ew_evaluation_percent}
                                        errorMessage={errors?.ew_evaluation_percent && [errorMessages.notEmpty, errorMessages.numericValue]}
                                        ref={evalPercentRef}
                                      />}

              <EvaluationTextarea
                name='evaluation_description'
                type='text'
                value={evalDescription}
                onChange={(e) => handleEvalDescription(e)}
                error={!!errors.evaluation_description}
                errorMessage={errors?.evaluation_description && [errorMessages.notEmpty]}
                ref={evalDescriptionRef} />

              { isEvalEdit &&
                <Button onClickAction={(e ) => handleEvaluationEditSubmit(e)}>Zmień</Button>
                ||
                <Button onClickAction={handleEvaluationSubmit}>Zatwierdź</Button>
              }
            </>
            }
          </StyledRtsEvalInputsWrapper>
          <StyledRtsEvalOutputWrapper>
            {
              evalArray &&
              <StyledEvalList>
                {
                  evalArray.map(({ name, percent, description }, idx) => {
                    return (
                      <StyledEvalListItem key={idx}>
                        <IconButton size='m' isActive={false} onClickAction={(e) => handleEvaluationEdit(idx, e)} >
                          <SvgEdit />
                        </IconButton>
                        <IconButton size='m' isActive={false} onClickAction={(e) => handleEvaluationDelete(idx, e)} >
                          <SvgRemove />
                        </IconButton>
                        <span>{ name }</span>
                        <span>{ percent } %</span>
                        <span>{ description }</span>
                      </StyledEvalListItem>
                    )
                  })
                }
              </StyledEvalList>
            }
          </StyledRtsEvalOutputWrapper>

          <StyledFormControlsWrapper>
            <Button type='button' onClickAction={handleReset}>Anuluj</Button>
            <Button type='submit'>{isRtsEdit ? 'Zmień' : 'Dodaj'}</Button>
          </StyledFormControlsWrapper>
        </StyledRtsForm>
      </StyledRtsFormContainer>
  )
}


