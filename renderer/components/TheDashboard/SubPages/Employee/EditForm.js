import {useContext} from 'react';
import {DashboardContext} from '@/contexts/DashboardContext';
import {SubPagesContext} from '@/contexts/SubPagesContext';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Joi from 'joi';
import {axios} from '@/lib/axios-config';
import {mutate} from 'swr';
import {errorMessages} from '@/lib/errorMessages';
import {Button} from '@/common/Buttons';
import {Input, InputDatePicker, Select} from '@/common/Inputs';
import {StyledFormControlsWrapper} from '@/common/CommonWrappers';
import {StyledEmployeeForm, StyledEditEmployeeInputsWrapper, StyledEditFieldsWrap} from './styles';

const employeeEditFormSchema = Joi.object().keys({
  year: Joi.required(),
  month: Joi.required(),
  name: Joi.string()
    .pattern(/^[a-zA-ZążźćńółęśĄŻŹĆŃÓŁĘŚ]|\$/)
    .required(),
  surname: Joi.string()
    .pattern(/^[a-zA-ZążźćńółęśĄŻŹĆŃÓŁĘŚ]|\$/)
    .required(),
  position: Joi.string()
    .pattern(/^[a-zA-Z]|[0-9]+$/)
    .required(),
  overdue_leave_amount: Joi.number().required(),
  assigned_leave_amount: Joi.number().required(),
  employment_start_date: Joi.object({
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
  bonus_rate: Joi.number().required(),
  overtime_rate_multiplier: Joi.number(),
  overtime_hours_multiplier: Joi.number(),
});

const getEmployeeYearsArray = (employeeData) => {
  const years = employeeData.calendar.map(({year}) => year);

  return years;
};

const getEmployeeMonthsArray = () => [
  {label: 'Styczeń', value: 1},
  {label: 'Luty', value: 2},
  {label: 'Marzec', value: 3},
  {label: 'Kwiecień', value: 4},
  {label: 'Maj', value: 5},
  {label: 'Czerwiec', value: 6},
  {label: 'Lipiec', value: 7},
  {label: 'Sierpień', value: 8},
  {label: 'Wrzesień', value: 9},
  {label: 'Październik', value: 10},
  {label: 'Listopad', value: 11},
  {label: 'Grudzień', value: 12},
];

const defaultSelectValues = (employeeYears) => {
  const currentYearIs = new Date().getFullYear();
  const currentMonthIs = new Date().getMonth() + 1;
  const sortedEmployeeYears = employeeYears.reverse();
  const year = sortedEmployeeYears.includes(currentYearIs) ? currentYearIs : sortedEmployeeYears[0];

  return {defaultYear: year, defaultMonth: currentMonthIs};
};

const getYearMonthData = (employeeData, theYear, theMonth) => {
  const yearData = employeeData.calendar.filter(({year}) => year === theYear)[0];
  const monthData = yearData?.months?.filter(({month}) => month === theMonth)[0];

  return {year: theYear, ...monthData};
};

const getDefaultValues = (employeeData, theYear, theMonth) => {
  const values = getYearMonthData(employeeData, theYear, theMonth);

  return {
    year: theYear,
    month: theMonth,
    name: employeeData.name,
    surname: employeeData.surname,
    position: employeeData.position,
    overdue_leave_amount: employeeData.overdue_leave_amount,
    assigned_leave_amount: employeeData.assigned_leave_amount,
    employment_start_date: employeeData.employment_start_date,
    hourly_rate: values.hourly_rate,
    holiday_rate: values.holiday_rate,
    sick_leave_rate: values.sick_leave_rate,
    other_leave_rate: values.other_leave_rate,
    insurance_rate: values.insurance_rate,
    retainment_rate: values.retainment_rate,
    bonus_rate: values.bonus_rate,
    to_account_rate: values.to_account_rate,
    overtime_rate_multiplier: values.overtime_rate_multiplier,
    overtime_hours_multiplier: values.overtime_hours_multiplier,
  };
};

export const EditEmployeeForm = ({id}) => {
  const [employee, setEmployee] = useContext(DashboardContext).employee;
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useContext(SubPagesContext).page;
  const years = getEmployeeYearsArray(employee).sort();
  const {defaultYear, defaultMonth} = defaultSelectValues(years);
  const preloadedValues = getDefaultValues(employee, defaultYear, defaultMonth);
  const {control, register, errors, handleSubmit, reset, getValues, setValue, onChange} = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeEditFormSchema),
    defaultValues: preloadedValues,
  });

  const getEmployeeData = (id, data) => data.filter((employee) => employee._id === id)[0];

  const yearsSelectOptionsArray = years.reduce((resultArray, year) => {
    const newYearOption = {label: year, value: year};
    resultArray.push(newYearOption);
    return resultArray;
  }, []);
  const monthsSelectOptionsArray = getEmployeeMonthsArray();

  const handleSelectChange = (values, setValue) => {
    const {year, month} = values;
    const selectedOptionsValue = getDefaultValues(
      employee,
      parseInt(year, 10),
      parseInt(month, 10),
      1
    );
    setValue('hourly_rate', selectedOptionsValue.hourly_rate);
    setValue('holiday_rate', selectedOptionsValue.holiday_rate);
    setValue('sick_leave_rate', selectedOptionsValue.sick_leave_rate);
    setValue('other_leave_rate', selectedOptionsValue.other_leave_rate);
    setValue('insurance_rate', selectedOptionsValue.insurance_rate);
    setValue('retainment_rate', selectedOptionsValue.retainment_rate);
    setValue('to_account_rate', selectedOptionsValue.to_account_rate);
    setValue('bonus_rate', selectedOptionsValue.bonus_rate);
    setValue('overtime_rate_multiplier', selectedOptionsValue.overtime_rate_multiplier);
    setValue('overtime_hours_multiplier', selectedOptionsValue.overtime_hours_multiplier);
  };

  const onSubmit = async (data) => {
    const employeeYearMonthValues = getYearMonthData(
      employee,
      parseInt(data.year, 10),
      parseInt(data.month, 10)
    );

    const employeeBasicInfoData = {
      name: data.name,
      surname: data.surname,
      position: data.position,
      overdue_leave_amount: parseInt(data.overdue_leave_amount, 10),
      assigned_leave_amount: parseInt(data.assigned_leave_amount, 10),
      employment_start_date: data.employment_start_date,
    };

    const employeeCalendarInfoData = {
      year: parseInt(data.year, 10),
      month: parseInt(data.month, 10),
      hourly_rate: parseFloat(data.hourly_rate),
      overtime_rate: parseFloat(data.hourly_rate) * parseFloat(data.overtime_rate_multiplier),
      holiday_rate: parseFloat(data.holiday_rate),
      sick_leave_rate: parseFloat(data.sick_leave_rate),
      other_leave_rate: parseFloat(data.other_leave_rate),
      insurance_rate: parseFloat(data.insurance_rate),
      retainment_rate: parseFloat(data.retainment_rate),
      to_account_rate: parseFloat(data.to_account_rate),
      bonus_rate: parseFloat(data.bonus_rate),
      overtime_rate_multiplier: parseFloat(data.overtime_rate_multiplier),
      overtime_hours_multiplier: parseFloat(data.overtime_hours_multiplier),
    };

    const employeeBasicInfoPreloadedValues = {
      name: preloadedValues.name,
      surname: preloadedValues.surname,
      position: preloadedValues.position,
      overdue_leave_amount: preloadedValues.overdue_leave_amount,
      assigned_leave_amount: preloadedValues.assigned_leave_amount,
      employment_start_date: preloadedValues.employment_start_date,
    };

    const employeeCalendarYearMonthValues = {
      year: employeeYearMonthValues.year,
      month: employeeYearMonthValues.month,
      hourly_rate: employeeYearMonthValues.hourly_rate,
      overtime_rate:
        employeeYearMonthValues.hourly_rate * employeeYearMonthValues.overtime_rate_multiplier,
      holiday_rate: employeeYearMonthValues.holiday_rate,
      sick_leave_rate: employeeYearMonthValues.sick_leave_rate,
      other_leave_rate: employeeYearMonthValues.other_leave_rate,
      insurance_rate: employeeYearMonthValues.insurance_rate,
      retainment_rate: employeeYearMonthValues.retainment_rate,
      to_account_rate: employeeYearMonthValues.to_account_rate,
      bonus_rate: employeeYearMonthValues.bonus_rate,
      overtime_rate_multiplier: employeeYearMonthValues.overtime_rate_multiplier,
      overtime_hours_multiplier: employeeYearMonthValues.overtime_hours_multiplier,
    };

    const employeeBasicInfo =
      JSON.stringify(employeeBasicInfoData) === JSON.stringify(employeeBasicInfoPreloadedValues);
    const employeeCalendarInfo =
      JSON.stringify(employeeCalendarInfoData) === JSON.stringify(employeeCalendarYearMonthValues);

    if (!employeeBasicInfo)
      await axios.put(`/api/employees/${id}`, {
        field: 'employee',
        value: {...employeeBasicInfoData},
      });
    if (!employeeCalendarInfo)
      await axios.put(`/api/employees/${id}`, {
        field: 'calendar',
        value: {...employeeCalendarInfoData},
      });

    mutate('/api/employees', async (mutatedEmployees) => {
      const updatedEmployees = await axios.get('/api/employees');
      const updatedEmployee = getEmployeeData(id, updatedEmployees.data);
      setEmployee((employee) => updatedEmployee);
    });

    setPage((page) => 'rts');
  };

  const handleReset = () => {
    reset();
    setPage((page) => 'rts');
  };

  return (
    <StyledEmployeeForm edit onSubmit={handleSubmit(onSubmit)}>
      <StyledEditEmployeeInputsWrapper>
        <StyledEditFieldsWrap>
          <Input
            name="name"
            type="text"
            label="Imię"
            error={!!errors.name}
            errorMessage={errors?.name && [errorMessages.notEmpty]}
            ref={register}
          />
          <Input
            name="surname"
            type="text"
            label="Nazwisko"
            error={!!errors.surname}
            errorMessage={errors?.surname && [errorMessages.notEmpty]}
            ref={register}
          />
          <Input
            name="position"
            type="text"
            label="Stanowisko"
            error={!!errors.position}
            errorMessage={errors?.position && [errorMessages.notEmpty]}
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
            errorMessage={errors?.overdue_leave_amount && [errorMessages.notEmpty]}
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
            errorMessage={errors?.assigned_leave_amount && [errorMessages.notEmpty]}
            ref={register}
          />
          <InputDatePicker
            name="employment_start_date"
            label="Data zatrudnienia"
            error={!!errors.employment_start_date}
            errorMessage={errors?.employment_start_date && [errorMessages.notEmpty]}
            control={control}
          />
        </StyledEditFieldsWrap>
        <StyledEditFieldsWrap>
          <h4>Wybierz rok i miesiąc obowiązywania poniższych składowych</h4>
          <Select
            name="year"
            label="Rok"
            optionsArray={yearsSelectOptionsArray}
            error={!!errors.year}
            onChange={() => handleSelectChange(getValues(['year', 'month']), setValue)}
            selected={defaultYear}
            errorMessage={errors?.year && [errorMessages.notEmpty]}
            ref={register}
          />
          <Select
            name="month"
            label="Miesiąc"
            optionsArray={monthsSelectOptionsArray}
            error={!!errors.month}
            onChange={() => handleSelectChange(getValues(['year', 'month']), setValue)}
            selected={defaultMonth}
            errorMessage={errors?.month && [errorMessages.notEmpty]}
            ref={register}
          />
        </StyledEditFieldsWrap>
        <StyledEditFieldsWrap>
          <Input
            name="hourly_rate"
            onChange={onChange}
            type="number"
            min="0.00"
            step="0.01"
            label="Stawka godzinowa"
            error={!!errors.hourly_rate}
            errorMessage={errors?.hourly_rate && [errorMessages.notEmpty]}
            ref={register}
          />
          <Input
            name="holiday_rate"
            type="number"
            min="0.00"
            step="0.01"
            label="Stawka urlopowa"
            error={!!errors.holiday_rate}
            errorMessage={errors?.holiday_rate && [errorMessages.notEmpty]}
            ref={register}
          />
          <Input
            name="sick_leave_rate"
            type="number"
            min="0.00"
            step="0.01"
            label="Stawka chorobowa"
            error={!!errors.sick_leave_rate}
            errorMessage={errors?.sick_leave_rate && [errorMessages.notEmpty]}
            ref={register}
          />
          <Input
            name="insurance_rate"
            type="number"
            min="0.00"
            step="0.01"
            label="Stawka ubezpieczenia"
            error={!!errors.insurance_rate}
            errorMessage={errors?.insurance_rate && [errorMessages.notEmpty]}
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
            name="retainment_rate"
            type="number"
            min="0.00"
            step="0.01"
            label="Stawka PPK"
            error={!!errors.retainment_rate}
            errorMessage={errors?.retainment_rate && [errorMessages.notEmpty]}
            ref={register}
          />
          <Input
            name="bonus_rate"
            type="number"
            min="0.00"
            step="0.01"
            label="Stawka premii"
            error={!!errors.bonus_rate}
            errorMessage={errors?.bonus_rate && [errorMessages.notEmpty]}
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
          <Input
            name="overtime_rate_multiplier"
            type="number"
            min="0.00"
            step="0.01"
            label="Mnożnik stawki nadgodzin"
            error={!!errors.overtime_rate_multiplier}
            errorMessage={errors?.overtime_rate_multiplier && [errorMessages.notEmpty]}
            ref={register}
          />
          <Input
            name="overtime_hours_multiplier"
            type="number"
            min="0.00"
            step="0.01"
            label="Mnożnik ilości nadgodzin"
            error={!!errors.overtime_hours_multiplier}
            errorMessage={errors?.overtime_hours_multiplier && [errorMessages.notEmpty]}
            ref={register}
          />
        </StyledEditFieldsWrap>
      </StyledEditEmployeeInputsWrapper>
      <StyledFormControlsWrapper>
        <Button type="button" onClickAction={handleReset}>
          Anuluj
        </Button>
        <Button type="submit">Zmień</Button>
      </StyledFormControlsWrapper>
    </StyledEmployeeForm>
  );
};
