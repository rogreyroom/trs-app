import {mutate} from 'swr';
import {useContext} from 'react';
import {DashboardContext} from '@/contexts/DashboardContext';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Joi from 'joi';
import {axios} from '@/lib/axios-config';
import {errorMessages} from '@/lib/errorMessages';
import {Button} from '@/common/Buttons';
import {Input, InputDatePicker, Select} from '@/common/Inputs';
import {StyledFormControlsWrapper} from '@/common/CommonWrappers';
import {useRouter} from 'next/router';
import {StyledEmployeeForm, StyledAddEmployeeInputsWrapper} from './styles';

const employeeAddFormSchema = Joi.object().keys({
  employment_start_date: Joi.object({
    year: Joi.number().empty(null),
    month: Joi.number().empty(null),
    day: Joi.number().empty(null),
  }).required(),
  juvenile_worker: Joi.boolean().required(),
  name: Joi.string()
    .pattern(/^[a-zA-ZążźćńółęśĄŻŹĆŃÓŁĘŚ]|-$/)
    .required(),
  surname: Joi.string()
    .pattern(/^[a-zA-ZążźćńółęśĄŻŹĆŃÓŁĘŚ]|-$/)
    .required(),
  position: Joi.string()
    .pattern(/^[a-zA-Z]|[0-9]+$/)
    .required(),
  overdue_leave_amount: Joi.number().required(),
  assigned_leave_amount: Joi.number().required(),
  bonus_rate: Joi.number().required(),
  employment_termination_date: Joi.object({
    year: Joi.number().empty(null),
    month: Joi.number().empty(null),
    day: Joi.number().empty(null),
  }).allow(null),
  hourly_rate: Joi.number().required(),
  holiday_rate: Joi.number(),
  sick_leave_rate: Joi.number(),
  other_leave_rate: Joi.number(),
  insurance_rate: Joi.number(),
  retainment_rate: Joi.number(),
  to_account_rate: Joi.number(),
  overtime_rate_multiplier: Joi.number(),
  overtime_hours_multiplier: Joi.number(),
});

const juvenileWorkerOptions = [
  {label: 'Tak', value: true},
  {label: 'Nie', value: false},
];

const createMonthsData = (month, data) => {
  const monthsArray = [];
  const {
    hourly_rate,
    holiday_rate,
    sick_leave_rate,
    other_leave_rate,
    insurance_rate,
    retainment_rate,
    bonus_rate,
    to_account_rate,
    overtime_rate_multiplier,
    overtime_hours_multiplier,
  } = data;

  const overtime_rate = hourly_rate * overtime_rate_multiplier;

  for (let idx = 1; idx <= 12; idx += 1) {
    if (idx < month) {
      monthsArray.push({
        month: idx,
        holiday_leave: [],
        sick_leave: [],
        other_leave: [],
        rts: [],
        hourly_rate: null,
        overtime_rate: null,
        holiday_rate: null,
        sick_leave_rate: null,
        other_leave_rate: null,
        insurance_rate: null,
        bonus_rate: null,
        to_account_rate: null,
        overtime_rate_multiplier: null,
        overtime_hours_multiplier: null,
      });
    } else if (idx >= month) {
      monthsArray.push({
        month: idx,
        holiday_leave: [],
        sick_leave: [],
        other_leave: [],
        rts: [],
        hourly_rate,
        overtime_rate,
        holiday_rate,
        sick_leave_rate,
        other_leave_rate,
        insurance_rate,
        retainment_rate,
        bonus_rate,
        to_account_rate,
        overtime_rate_multiplier,
        overtime_hours_multiplier,
      });
    }
  }
  return monthsArray;
};

export const AddEmployeeForm = ({preloadedValues}) => {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [addEmployeePage, setAddEmployeePage] = useContext(DashboardContext).add;
  // eslint-disable-next-line no-unused-vars
  const [employees, setEmployees] = useContext(DashboardContext).data;
  const formDefaultValues = {
    employment_start_date: null,
    employment_termination_date: null,
    name: '',
    surname: '',
    position: '',
    juvenile_worker: false,
    overdue_leave_amount: 0,
    assigned_leave_amount: 0,
    to_account_rate: 0,
    hourly_rate: 0,
    holiday_rate: 0,
    sick_leave_rate: 0,
    other_leave_rate: 0,
    insurance_rate: 0,
    retainment_rate: 0,
    bonus_rate: 0,
    overtime_rate_multiplier: 1,
    overtime_hours_multiplier: 1,
  };
  const {control, register, errors, handleSubmit, reset} = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeAddFormSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit = async (data) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const {
      name,
      surname,
      position,
      juvenile_worker,
      employment_start_date,
      overdue_leave_amount,
      assigned_leave_amount,
    } = data;
    const calendarMonths = await createMonthsData(currentMonth, data);
    const newEmployeeData = {
      doc: 'employee',
      name,
      surname,
      position,
      juvenile_worker,
      employment_status: true,
      employment_start_date,
      employment_termination_date: null,
      overdue_leave_amount,
      assigned_leave_amount,
      calendar: [
        {
          year: currentYear,
          months: calendarMonths,
        },
      ],
    };

    await axios.post('/api/employees', {...newEmployeeData});
    mutate();
    reset(formDefaultValues);
    setAddEmployeePage((addEmployeePage) => null);
    router.push('/employees');
  };

  const handleReset = () => {
    reset(formDefaultValues);
    setAddEmployeePage((addEmployeePage) => null);
  };

  return (
    <StyledEmployeeForm onSubmit={handleSubmit(onSubmit)}>
      <StyledAddEmployeeInputsWrapper>
        <InputDatePicker
          isRequired
          name="employment_start_date"
          label="Data rozpoczęcia pracy"
          error={!!errors.employment_start_date}
          errorMessage={errors?.employment_start_date && [errorMessages.notEmpty]}
          control={control}
        />
        <Select
          name="juvenile_worker"
          label="Pracownik młodociany"
          optionsArray={juvenileWorkerOptions}
          error={!!errors.juvenile_worker}
          errorMessage={errors?.juvenile_worker && [errorMessages.notEmpty]}
          ref={register}
        />
        <Input
          name="name"
          type="text"
          label="Imię"
          error={!!errors.name}
          errorMessage={errors?.name && [errorMessages.notEmpty, errorMessages.alphaString]}
          ref={register}
        />
        <Input
          name="surname"
          type="text"
          label="Nazwisko"
          error={!!errors.surname}
          errorMessage={errors?.surname && [errorMessages.notEmpty, errorMessages.alphaString]}
          ref={register}
        />
        <Input
          name="position"
          type="text"
          label="Stanowisko"
          error={!!errors.position}
          errorMessage={
            errors?.position && [errorMessages.notEmpty, errorMessages.alphaNumericString]
          }
          ref={register}
        />
        <Input
          name="overdue_leave_amount"
          type="number"
          min="0"
          max="46"
          step="1"
          label="Urlop zaległy"
          error={!!errors.overdue_leave_amount}
          errorMessage={
            errors?.overdue_leave_amount && [errorMessages.notEmpty, errorMessages.numericValue]
          }
          ref={register}
        />
        <Input
          name="assigned_leave_amount"
          type="number"
          min="0"
          max="46"
          step="1"
          label="Urlop przysługujący"
          error={!!errors.assigned_leave_amount}
          errorMessage={
            errors?.assigned_leave_amount && [errorMessages.notEmpty, errorMessages.numericValue]
          }
          ref={register}
        />
        <Input
          name="bonus_rate"
          type="number"
          min="0"
          step="1"
          label="Stawka premii"
          error={!!errors.bonus_rate}
          errorMessage={errors?.bonus_rate && [errorMessages.notEmpty, errorMessages.numericValue]}
          ref={register}
        />
        <Input
          name="to_account_rate"
          type="number"
          min="0.00"
          step="0.01"
          label="Podstawa ROR"
          error={!!errors.to_account_rate}
          errorMessage={
            errors?.to_account_rate && [errorMessages.notEmpty, errorMessages.numericValue]
          }
          ref={register}
        />
        <InputDatePicker
          name="employment_termination_date"
          label="Data rozwiązania umowy"
          error={!!errors.employment_termination_date}
          errorMessage={errors?.employment_termination_date && [errorMessages.empty]}
          control={control}
        />
        <Input
          name="hourly_rate"
          type="number"
          min="0.00"
          step="0.01"
          label="Stawka godzinowa"
          error={!!errors.hourly_rate}
          errorMessage={errors?.hourly_rate && [errorMessages.notEmpty, errorMessages.numericValue]}
          ref={register}
        />
        <Input
          name="holiday_rate"
          type="number"
          min="0.00"
          step="0.01"
          label="Stawka urlopowa"
          error={!!errors.holiday_rate}
          errorMessage={
            errors?.holiday_rate && [errorMessages.notEmpty, errorMessages.numericValue]
          }
          ref={register}
        />
        <Input
          name="sick_leave_rate"
          type="number"
          min="0.00"
          step="0.01"
          label="Stawka chorobowa"
          error={!!errors.sick_leave_rate}
          errorMessage={
            errors?.sick_leave_rate && [errorMessages.notEmpty, errorMessages.numericValue]
          }
          ref={register}
        />
        <Input
          name="other_leave_rate"
          type="number"
          min="0.00"
          step="0.01"
          label="Stawka okolicznościowa"
          error={!!errors.other_leave_rate}
          errorMessage={
            errors?.other_leave_rate && [errorMessages.notEmpty, errorMessages.numericValue]
          }
          ref={register}
        />
        <Input
          name="insurance_rate"
          type="number"
          min="0.00"
          step="0.01"
          label="Stawka ubezpieczenia"
          error={!!errors.insurance_rate}
          errorMessage={
            errors?.insurance_rate && [errorMessages.notEmpty, errorMessages.numericValue]
          }
          ref={register}
        />
        <Input
          name="retainment_rate"
          type="number"
          min="0.00"
          step="0.01"
          label="Stawka PPK"
          error={!!errors.retainment_rate}
          errorMessage={
            errors?.retainment_rate && [errorMessages.notEmpty, errorMessages.numericValue]
          }
          ref={register}
        />
        <Input
          name="overtime_rate_multiplier"
          type="number"
          min="0.00"
          step="0.01"
          label="Mnożnik stawki nadgodzin"
          error={!!errors.overtime_rate_multiplier}
          errorMessage={
            errors?.overtime_rate_multiplier && [errorMessages.notEmpty, errorMessages.numericValue]
          }
          ref={register}
        />
        <Input
          name="overtime_hours_multiplier"
          type="number"
          min="0.00"
          step="0.01"
          label="Mnożnik ilości nadgodzin"
          error={!!errors.overtime_hours_multiplier}
          errorMessage={
            errors?.overtime_hours_multiplier && [
              errorMessages.notEmpty,
              errorMessages.numericValue,
            ]
          }
          ref={register}
        />
      </StyledAddEmployeeInputsWrapper>
      <StyledFormControlsWrapper>
        <Button type="button" onClickAction={handleReset}>
          Anuluj
        </Button>
        <Button type="submit">Dodaj</Button>
      </StyledFormControlsWrapper>
    </StyledEmployeeForm>
  );
};
