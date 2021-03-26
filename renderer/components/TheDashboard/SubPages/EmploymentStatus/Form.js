import {useContext} from 'react';
import {DashboardContext} from '@/contexts/DashboardContext';
import {SubPagesContext} from '@/contexts/SubPagesContext';
import {
  StyledCalendarForm,
  StyledFormControlsWrapper,
  StyledCalendarLeaveWrapper,
} from '@/common/CommonWrappers';
import {Button} from '@/common/Buttons';
import {plLocale} from '@/lib/calendarLocale';
import {Calendar} from 'react-modern-calendar-datepicker';
import {mutate} from 'swr';
import {axios} from '@/lib/axios-config';
import {useForm, Controller} from 'react-hook-form';
import {useRouter} from 'next/router';

export const EmploymentStatusForm = ({id}) => {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [employee, setEmployee] = useContext(DashboardContext).employee;
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useContext(SubPagesContext).page;
  // eslint-disable-next-line no-unused-vars
  const [employeesFilter, setEmployeesFilter] = useContext(DashboardContext).filter;
  const calendarDefaultValue = employee.employment_termination_date;
  const {handleSubmit, control, reset, errors} = useForm();

  const onSubmit = async (data, e) => {
    console.log('EmploymentStatusForm SUBMIT');
    const {terminationDate} = data;
    await mutate(`/api/employees/${id}`, (employee) => ({
      ...employee,
      employment_termination_date: terminationDate,
      employment_status: false,
    }));
    await axios.put(`/api/employees/${id}`, {
      field: 'termination',
      value: {date: terminationDate, status: false},
    });
    mutate();
    setEmployeesFilter((employeesFilter) => false);
    reset(data);
    router.push('/employees');
  };

  const handleReset = (e) => {
    e.preventDefault();
    console.log('EmploymentStatusForm ANULUJ');
    reset({terminationDate: calendarDefaultValue});
    setPage((page) => 'rts');
  };

  return (
    <StyledCalendarForm onSubmit={handleSubmit(onSubmit)}>
      <StyledCalendarLeaveWrapper employmentStatus>
        <h4>Wybierz datę</h4>
        <Controller
          control={control}
          name="terminationDate"
          defaultValue={calendarDefaultValue}
          render={({onChange, value}) => (
            <Calendar
              value={value}
              onChange={onChange}
              locale={plLocale}
              calendarClassName="custom-calendar"
              shouldHighlightWeekends
              error={!!errors.terminationDate}
              errorMessage={errors?.terminationDate && 'Data jest wymagana!'}
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
