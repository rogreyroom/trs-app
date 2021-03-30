/* eslint-disable react-hooks/exhaustive-deps */
import {useForm, Controller} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Joi from 'joi';
import {StyledFormControlsWrapper} from '@/common/CommonWrappers';
import {SvgEdit, SvgRemove} from '@/icons';
import {Input, PercentInput, EvaluationTextarea} from '@/common/Inputs';
import {Button, ButtonSmall, IconButton} from '@/common/Buttons';
import {Error} from '@/common/Errors';
import {errorMessages} from '@/lib/errorMessages';
import {plLocale} from '@/lib/calendarLocale';
import {Calendar} from 'react-modern-calendar-datepicker';
import {useRef, useState, useEffect, useContext} from 'react';
import {DashboardContext} from '@/contexts/DashboardContext';
import {axios} from '@/lib/axios-config';
import useSWR, {mutate} from 'swr';
import isWeekend from 'date-fns/isWeekend';
import {
  getGivenMonthData,
  getEmployeeHolidayDays,
  getEmployeeSickDays,
  getEmployeeOtherLeaveDays,
  getEmployeeWorkedDays,
} from '@/lib/utils';
import {confirmAlert} from 'react-confirm-alert';
import {Alert} from '@/common/Alert';
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
} from './styles';

const schema = Joi.object().keys({
  due_date: Joi.object().length(3).required(),
  working_hours: Joi.number(),
  overtime_hours: Joi.number(),
  weekend_hours: Joi.number(),
});

export const RtsForm = ({id}) => {
  // eslint-disable-next-line no-unused-vars
  const [publicHolidays, setPublicHolidays] = useContext(DashboardContext).publicHolidays;
  const [employee, setEmployee] = useContext(DashboardContext).employee;
  const [isEvalEdit, setIsEvalEdit] = useState(false);
  const [editedEvalIndex, setEditedEvalIndex] = useState(null);
  // Refs
  const evalDescriptionRef = useRef(null);
  const evalPercentRef = useRef(null);
  // Hours enable state
  const [isDateWeekday, setIsDateWeekday] = useState(true);
  const [isDateWeekend, setIsDateWeekend] = useState(true);
  // Data holders
  const [submittedData, setSubmittedData] = useState({});
  const [evalArray, setEvalArray] = useState([]);
  // Evaluation chosen option [SP, MP, LP, EW]
  const [evaluation, setEvaluation] = useState(null);
  // React controlled components
  const [ewEvalCalendarDate, setEwEvalCalendarDate] = useState(0);
  const [evalDescription, setEvalDescription] = useState('');
  const [ewEvalPercent, setEwEvalPercent] = useState(0);
  const [workingHours, setWorkingHours] = useState(0);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [weekendHours, setWeekendHours] = useState(0);
  // React-hook-form
  const formFieldsDefaultValues = {
    due_date: null,
    working_hours: 0,
    overtime_hours: 0,
    weekend_hours: 0,
    evaluationDescription: '',
    ew_percent: 0,
  };
  const {
    register,
    control,
    watch,
    getValues,
    setValue,
    handleSubmit,
    reset,
    errors,
    formState: {isSubmitSuccessful},
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: formFieldsDefaultValues,
  });
  // Form watch
  const watchCalendarChange = watch('due_date');
  const [isRtsEdit, setIsRtsEdit] = useState(false);
  // Get ees data
  const {data: eesData} = useSWR(`api/ees/`);

  const currentYear = new Date().getFullYear();
  const employeeMonthsData = employee.calendar.find((year) => year.year === currentYear).months;
  const holidayDaysArray = getEmployeeHolidayDays(employeeMonthsData);
  const sickDaysArray = getEmployeeSickDays(employeeMonthsData);
  const otherDaysArray = getEmployeeOtherLeaveDays(employeeMonthsData);
  const workedDaysArray = getEmployeeWorkedDays(employeeMonthsData);

  const allLeaveDaysArray = [
    ...holidayDaysArray,
    ...sickDaysArray,
    ...otherDaysArray,
    ...workedDaysArray,
  ];

  const getEmployeeData = (id, data) => data.filter((employee) => employee._id === id)[0];

  const handleHours = (getValuesFunction) => {
    const newValue = getValuesFunction('working_hours');
    setWorkingHours((workingHours) => newValue);
  };

  const handleOvertime = (getValuesFunction) => {
    const newValue = getValuesFunction('overtime_hours');
    setOvertimeHours((overtimeHours) => newValue);
  };

  const handleWeekend = (getValuesFunction) => {
    const newValue = getValuesFunction('weekend_hours');
    setWeekendHours((weekendHours) => newValue);
  };

  const handleEwEvalPercent = (e) => {
    const newValue = e.target.value;
    setEwEvalPercent((ewEvalPercent) => newValue);
  };

  const handleEvalDescription = (e) => {
    const newValue = e.target.value;
    setEvalDescription((evalDescription) => newValue);
  };

  const handleEvaluationSet = (e, evalName) => {
    e.preventDefault();
    setEvaluation((evaluation) => evalName);
  };

  const handleEvaluationEdit = (evalArrayIndex, e) => {
    e.preventDefault();
    setIsEvalEdit((isEvalEdit) => true);
    setEditedEvalIndex((editedEvalIndex) => evalArrayIndex);
    setEvaluation((evaluation) => evalArray[evalArrayIndex].name);
    setEvalDescription((evalDescription) => evalArray[evalArrayIndex].description);
    evalArray[evalArrayIndex].name === 'EW' &&
      setEwEvalPercent((ewEvalPercent) => evalArray[evalArrayIndex].percent);
  };

  const handleEvaluationDelete = (evalArrayIndex, e) => {
    e.preventDefault();
    const newEvalArray = [...evalArray];
    newEvalArray.splice(evalArrayIndex, 1);
    setEvalArray((evalArray) => newEvalArray);
  };

  const makeAdd = (newPercent) => {
    const percentIs = ['SP', 'MP', 'LP'].includes(evaluation)
      ? eesData.filter(({symbol}) => symbol === evaluation)[0].percent
      : newPercent;
    setEvalArray((evalArray) => [
      ...evalArray,
      {
        name: evaluation,
        description: evalDescription,
        percent: percentIs,
      },
    ]);
    setEvalDescription((evalDescription) => '');
    if (evaluation === 'EW') setEwEvalPercent((ewEvalPercent) => 0);
    setEvaluation(null);
  };

  const makeEdit = (newPercent) => {
    const newEvalArray = [...evalArray];
    evaluation === 'EW'
      ? (newEvalArray[editedEvalIndex] = {
          ...newEvalArray[editedEvalIndex],
          description: evalDescription,
          percent: newPercent,
        })
      : (newEvalArray[editedEvalIndex] = {
          ...newEvalArray[editedEvalIndex],
          description: evalDescription,
        });
    setEvalArray((evalArray) => newEvalArray);
    setEditedEvalIndex((editedEvalIndex) => null);
    setIsEvalEdit((isEvalEdit) => false);
    setEvalDescription((evalDescription) => '');
    setEwEvalPercent((ewEvalPercent) => 0);
    setEvaluation(null);
  };

  const checkEWEvalPercentageMaximumValue = (isEdit) => {
    const {year, month} = ewEvalCalendarDate;
    const currentMonthData = getGivenMonthData(employee.calendar, year, month)[0];

    const evaluationArray = currentMonthData.rts.reduce((res, curr) => {
      if (curr.evaluation.length > 0) {
        const ewEvals = curr.evaluation.reduce((ewRes, ewCurr) => {
          if (ewCurr.name === 'EW') {
            ewRes.push(ewCurr);
          }
          return ewRes;
        }, []);

        if (ewEvals.length > 0) {
          res.push(...ewEvals);
        }
      }
      return res;
    }, []);

    if (isEdit === 'edit' && evalArray.length > 0) {
      const evalArrayObj = evalArray[editedEvalIndex];
      const evaluationArrayIndex = evaluationArray.findIndex(
        (obj) => JSON.stringify(obj) === JSON.stringify(evalArrayObj)
      );
      evaluationArray.splice(evaluationArrayIndex, 1);
    }

    if (evaluationArray.length > 0) {
      const ewEvalValue = evaluationArray.reduce(
        (res, curr) => res + parseInt(curr.percent, 10),
        0
      );

      if (ewEvalValue === 200) {
        return {res: true, data: 0};
      }
      if (ewEvalValue < 200) {
        if (ewEvalValue + parseInt(ewEvalPercent, 10) > 200) {
          const newPercent = ewEvalValue + parseInt(ewEvalPercent, 10) - 200;
          const maxToAddIs = parseInt(ewEvalPercent, 10) - newPercent;
          return {res: true, data: maxToAddIs};
        }
        return {res: false, data: parseInt(ewEvalPercent, 10)};
      }
    }

    if (parseInt(ewEvalPercent, 10) > 200) {
      const newPercent = parseInt(ewEvalPercent, 10) - 200;
      const maxToAddIs = parseInt(ewEvalPercent, 10) - newPercent;
      return {res: true, data: maxToAddIs};
    }
    return {res: false, data: parseInt(ewEvalPercent, 10)};
  };

  const evaluationPercentAmountCheck = (theCheck) => {
    const isToMuch = checkEWEvalPercentageMaximumValue(theCheck);
    if (isToMuch.res && isToMuch.data > 0) {
      confirmAlert({
        customUI: ({onClose}) => (
          <Alert
            title="Limit osiągnięty"
            message={`Możesz dodać jedynie ${isToMuch.data}% żeby nie przekroczyć miesięcznej maksymalnej wartości 200%`}
            yesButtonLabel="Dodaj"
            noButtonLabel="Wstecz"
            isNoButtonPresent
            yesAction={() => {
              if (theCheck === 'add') {
                makeAdd(isToMuch.data);
              } else if (theCheck === 'edit') {
                makeEdit(isToMuch.data);
              }
              onClose();
            }}
            noAction={() => {
              setEwEvalPercent((ewEvalPercent) => 0);
              onClose();
            }}
          />
        ),
      });
    } else if (isToMuch.res && isToMuch.data === 0) {
      confirmAlert({
        customUI: ({onClose}) => (
          <Alert
            title="Limit osiągnięty"
            message="Limit oceny EW w tym miesiącu został osiągnięty!"
            yesButtonLabel="Rozumię"
            isNoButtonPresent={false}
            yesAction={() => {
              setEvaluation(null);
              setEvalDescription(null);
              setEwEvalPercent((ewEvalPercent) => 0);
              onClose();
            }}
          />
        ),
      });
    } else if (!isToMuch.res) {
      if (theCheck === 'add') {
        makeAdd(isToMuch.data);
      } else if (theCheck === 'edit') {
        makeEdit(isToMuch.data);
      }
    }
  };

  const handleEvaluationSubmit = (e) => {
    e.preventDefault();
    if (watchCalendarChange === null) {
      confirmAlert({
        customUI: ({onClose}) => (
          <Alert
            title="Uwaga"
            message="Nie wybrano daty! Ocena zostanie usunięta."
            yesButtonLabel="OK"
            isNoButtonPresent={false}
            yesAction={() => {
              setEvaluation(null);
              setEvalDescription(null);
              setEwEvalPercent((ewEvalPercent) => 0);
              onClose();
            }}
          />
        ),
      });
      return;
    }

    evaluation !== 'EW' ? makeAdd(null) : evaluationPercentAmountCheck('add');
  };

  const handleEvaluationEditSubmit = (e) => {
    e.preventDefault();
    evaluationPercentAmountCheck('edit');
  };

  const onSubmit = async (data) => {
    let defaultHours;
    if (!isDateWeekend) {
      defaultHours = {
        working_hours: 0,
        overtime_hours: 0,
      };
    } else {
      defaultHours = {
        weekend_hours: 0,
      };
    }

    const resultData = {...data, ...defaultHours, evaluation: evalArray};
    const yearIs = resultData.due_date.year;
    const monthIs = resultData.due_date.month;
    const valueIs = {...resultData};

    if (isRtsEdit) {
      await axios.put(`/api/employees/${id}`, {
        field: 'update_rts',
        queryFields: {year: yearIs, month: monthIs},
        value: {...valueIs},
      });
      setIsRtsEdit((isRtsEdit) => false);
    } else {
      await axios.put(`/api/employees/${id}`, {
        field: 'add_rts',
        queryFields: {year: yearIs, month: monthIs},
        value: {...valueIs},
      });
    }

    setSubmittedData((submittedData) => resultData);
    reset(formFieldsDefaultValues);
    setValue('due_date', null);
    mutate('/api/employees', async (mutatedEmployees) => {
      const updatedEmployees = await axios.get('/api/employees');
      const updatedEmployee = getEmployeeData(id, updatedEmployees.data);
      setEmployee((employee) => updatedEmployee);
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset(formFieldsDefaultValues);
    setEvaluation(null);
    setEvalDescription(null);
    setEvalArray([]);
  };

  // Utils
  const isEqual = (...objects) =>
    objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

  const getCurrentMonthData = (employeeCalendar, givenYear, givenMonth, givenDate) => {
    const givenYearMonths = employeeCalendar.filter(({year}) => parseInt(year, 10) === givenYear)[0]
      ?.months;
    const givenMonthRts = givenYearMonths?.filter(
      ({month}) => parseInt(month, 10) === givenMonth
    )[0]?.rts;
    return givenMonthRts?.filter(({due_date}) => isEqual(due_date, givenDate))[0];
  };
  // ------end utils

  useEffect(() => {
    if (watchCalendarChange !== null) {
      if (
        isWeekend(
          new Date(watchCalendarChange.year, watchCalendarChange.month - 1, watchCalendarChange.day)
        )
      ) {
        setIsDateWeekend((isDateWeekend) => false);
        setIsDateWeekday((isDateWeekday) => true);
      } else {
        setIsDateWeekday((isDateWeekday) => false);
        setIsDateWeekend((isDateWeekend) => true);
      }

      setEvaluation((evaluation) => '');
      setEvalDescription((evalDescription) => '');
      setEwEvalCalendarDate((ewEvalCalendarDate) => watchCalendarChange);

      const res = getCurrentMonthData(
        employee.calendar,
        watchCalendarChange.year,
        watchCalendarChange.month,
        watchCalendarChange
      );

      if (res) {
        setEvalArray((evalArray) => [...res.evaluation]);
        setWorkingHours((workingHours) => res.working_hours);
        setOvertimeHours((overtimeHours) => res.overtime_hours);
        setWeekendHours((weekendHours) => res.weekend_hours);
        setIsRtsEdit((isRtsEdit) => true);
      } else {
        setEvalArray((evalArray) => []);
        setWorkingHours((workingHours) => 0);
        setOvertimeHours((overtimeHours) => 0);
        setWeekendHours((weekendHours) => 0);
        setIsRtsEdit((isRtsEdit) => false);
      }
    }

    if (isSubmitSuccessful) {
      reset({...submittedData});
      setValue('due_date', null);
      setEvaluation(null);
      setEvalDescription(null);
      setEvalArray([]);
    }
  }, [isSubmitSuccessful, submittedData, reset, watchCalendarChange, employee]);

  return (
    <StyledRtsFormContainer>
      <StyledRtsForm onSubmit={handleSubmit(onSubmit)}>
        <StyledRtsCalendarWrapper>
          <h4>Wybierz datę</h4>
          <Error error={!!errors?.due_date} errorMessage={[errorMessages.dateRange]} />
          <Controller
            control={control}
            name="due_date"
            render={({onChange, value, onBlur}) => (
              <Calendar
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                locale={plLocale}
                calendarClassName="custom-calendar"
                customDaysClassName={allLeaveDaysArray}
                disabledDays={publicHolidays}
                shouldHighlightWeekends
                error={!!errors.due_date}
              />
            )}
          />
        </StyledRtsCalendarWrapper>

        <StyledRtsInputsWrapper>
          <h4>Podaj czas pracy</h4>
          <Input
            disable={isDateWeekday}
            type="number"
            label="Obecność"
            name="working_hours"
            min="0"
            max="8"
            step="1"
            value={workingHours}
            onChange={() => handleHours(getValues)}
            error={!!errors.working_hours}
            ee={errors}
            errorMessage={
              errors?.working_hours && [errorMessages.notEmpty, errorMessages.numericValue]
            }
            ref={register}
          />

          <Input
            name="overtime_hours"
            type="number"
            label="Nadgodziny"
            disable={isDateWeekday}
            min="0"
            max="8"
            step="1"
            value={overtimeHours}
            onChange={() => handleOvertime(getValues)}
            error={!!errors.overtime_hours}
            errorMessage={
              errors?.overtime_hours && [errorMessages.notEmpty, errorMessages.numericValue]
            }
            ref={register}
          />

          <Input
            name="weekend_hours"
            type="number"
            label="Dyżur"
            disable={isDateWeekend}
            min="0"
            max="16"
            step="1"
            value={weekendHours}
            onChange={() => handleWeekend(getValues)}
            error={!!errors.weekend_hours}
            errorMessage={
              errors?.weekend_hours && [errorMessages.notEmpty, errorMessages.numericValue]
            }
            ref={register}
          />
        </StyledRtsInputsWrapper>

        <StyledRtsEvalControlsWrapper>
          <h4>Ocena pracownika</h4>
          <ButtonSmall type="button" onClickAction={(e) => handleEvaluationSet(e, 'SP')}>
            SP
          </ButtonSmall>
          <ButtonSmall type="button" onClickAction={(e) => handleEvaluationSet(e, 'MP')}>
            MP
          </ButtonSmall>
          <ButtonSmall type="button" onClickAction={(e) => handleEvaluationSet(e, 'LP')}>
            LP
          </ButtonSmall>
          <ButtonSmall type="button" onClickAction={(e) => handleEvaluationSet(e, 'EW')}>
            EW
          </ButtonSmall>
        </StyledRtsEvalControlsWrapper>

        <StyledRtsEvalInputsWrapper>
          {evaluation && (
            <>
              <h4>{evaluation}</h4>
              {evaluation === 'EW' && (
                <PercentInput
                  name="ew_evaluation_percent"
                  type="number"
                  label="%"
                  min="0"
                  max="200"
                  step="1"
                  value={ewEvalPercent}
                  onChange={(e) => handleEwEvalPercent(e)}
                  error={!!errors.ew_evaluation_percent}
                  errorMessage={
                    errors?.ew_evaluation_percent && [
                      errorMessages.notEmpty,
                      errorMessages.numericValue,
                    ]
                  }
                  ref={evalPercentRef}
                />
              )}

              <EvaluationTextarea
                name="evaluation_description"
                type="text"
                value={evalDescription}
                onChange={(e) => handleEvalDescription(e)}
                error={!!errors.evaluation_description}
                errorMessage={errors?.evaluation_description && [errorMessages.notEmpty]}
                ref={evalDescriptionRef}
              />

              {(isEvalEdit && (
                <Button onClickAction={(e) => handleEvaluationEditSubmit(e)}>Zmień</Button>
              )) || <Button onClickAction={(e) => handleEvaluationSubmit(e)}>Dodaj</Button>}
            </>
          )}
        </StyledRtsEvalInputsWrapper>
        <StyledRtsEvalOutputWrapper>
          {evalArray && (
            <StyledEvalList>
              {evalArray.map(({name, percent, description}, idx) => (
                <StyledEvalListItem key={idx}>
                  <IconButton
                    size="m"
                    isActive={false}
                    onClickAction={(e) => handleEvaluationEdit(idx, e)}
                  >
                    <SvgEdit />
                  </IconButton>
                  <IconButton
                    size="m"
                    isActive={false}
                    onClickAction={(e) => handleEvaluationDelete(idx, e)}
                  >
                    <SvgRemove />
                  </IconButton>
                  <span>{name}</span>
                  <span>{percent} %</span>
                  <span>{description}</span>
                </StyledEvalListItem>
              ))}
            </StyledEvalList>
          )}
        </StyledRtsEvalOutputWrapper>

        <StyledFormControlsWrapper>
          <Button type="button" onClickAction={(e) => handleReset(e)}>
            Anuluj
          </Button>
          <Button type="submit">{isRtsEdit ? 'Zmień' : 'Dodaj'}</Button>
        </StyledFormControlsWrapper>
      </StyledRtsForm>
    </StyledRtsFormContainer>
  );
};
