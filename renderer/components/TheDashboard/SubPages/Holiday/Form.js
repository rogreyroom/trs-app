import {useForm, Controller} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Joi from 'joi';
import {axios} from '@/lib/axios-config';
import {endOfMonth, getDate} from 'date-fns';
import {plLocale} from '@/lib/calendarLocale';
import {
  StyledCalendarLeaveWrapper,
  StyledCalendarForm,
  StyledFormControlsWrapper,
} from '@/common/CommonWrappers';
import {Calendar} from 'react-modern-calendar-datepicker';
import {Button} from '@/common/Buttons';
import {Error} from '@/common/Errors';
import {errorMessages} from '@/lib/errorMessages';

import {mutate} from 'swr';
import {useContext} from 'react';
import {DashboardContext} from '@/contexts/DashboardContext';
import {SubPagesContext} from '@/contexts/SubPagesContext';

const schema = Joi.object().keys({
  holidayRangeDates: Joi.object()
    .keys({
      from: Joi.object().length(3),
      to: Joi.object().length(3),
    })
    .required(),
});

export const HolidayForm = ({id}) => {
  // eslint-disable-next-line no-unused-vars
  const [employee, setEmployee] = useContext(DashboardContext).employee;
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useContext(SubPagesContext).page;
  const calendarDefaultValue = {from: null, to: null};
  const {control, errors, handleSubmit, reset} = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: calendarDefaultValue,
  });

  const getEmployeeData = (id, data) => data.filter((employee) => employee._id === id)[0];

  const onSubmit = async (data) => {
    const datesRange = data.holidayRangeDates;

    if (
      datesRange.from.year === datesRange.to.year &&
      datesRange.from.month === datesRange.to.month
    ) {
      const yearIs = datesRange.from.year;
      const monthIs = datesRange.from.month;
      const valueIs = datesRange;

      await axios.put(`/api/employees/${id}`, {
        field: 'holiday',
        queryFields: {year: yearIs, month: monthIs},
        value: {date: valueIs},
      });
    }

    if (
      datesRange.from.year === datesRange.to.year &&
      datesRange.from.month !== datesRange.to.month
    ) {
      const constructDate = new Date(
        datesRange.from.year,
        datesRange.from.month - 1,
        datesRange.from.day
      );
      const getEndOfMonth = endOfMonth(constructDate);
      const getDayTo = getDate(getEndOfMonth);
      const yearIs = datesRange.from.year;
      const firstMonthIs = datesRange.from.month;
      const secondMonthIs = datesRange.to.month;
      const firstValueTo = {
        day: getDayTo,
        month: datesRange.from.month,
        year: datesRange.from.year,
      };
      const firstValueIs = {from: datesRange.from, to: firstValueTo};
      const secondValueFrom = {
        day: 1,
        month: datesRange.to.month,
        year: datesRange.to.year,
      };
      const secondValueIs = {from: secondValueFrom, to: datesRange.to};

      await axios.put(`/api/employees/${id}`, {
        field: 'holiday',
        queryFields: {year: yearIs, month: firstMonthIs},
        value: {date: firstValueIs},
      });
      await axios.put(`/api/employees/${id}`, {
        field: 'holiday',
        queryFields: {year: yearIs, month: secondMonthIs},
        value: {date: secondValueIs},
      });
    }

    mutate('/api/employees', async (mutatedEmployees) => {
      const updatedEmployees = await axios.get('/api/employees');
      const updatedEmployee = getEmployeeData(id, updatedEmployees.data);
      setEmployee((employee) => updatedEmployee);
    });
    reset({holidayRangeDates: calendarDefaultValue});
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset({holidayRangeDates: calendarDefaultValue});
    setPage((page) => 'rts');
  };

  return (
    <StyledCalendarForm onSubmit={handleSubmit(onSubmit)}>
      <StyledCalendarLeaveWrapper>
        <h4>Podaj zakres dat</h4>
        <Error error={!!errors?.holidayRangeDates} errorMessage={[errorMessages.dateRange]} />
        <Controller
          control={control}
          name="holidayRangeDates"
          defaultValue={calendarDefaultValue}
          render={({onChange, value}) => (
            <Calendar
              value={value}
              onChange={onChange}
              locale={plLocale}
              calendarClassName="custom-calendar"
              shouldHighlightWeekends
              error={!!errors.holidayRangeDates}
            />
          )}
        />
      </StyledCalendarLeaveWrapper>
      <StyledFormControlsWrapper>
        <Button type="button" onClickAction={(e) => handleReset(e)}>
          Anuluj
        </Button>
        <Button type="submit">Dodaj</Button>
      </StyledFormControlsWrapper>
    </StyledCalendarForm>
  );
};
