// import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
// import Joi from 'joi';
import { eesFormSchema } from '../../../lib/db/schemas'
import { StyledFormContainer, StyledForm, StyledFormControlsWrapper, StyledButton  } from '../Common/StyledComponents'
import { Select } from '../Common/Select'
import { Input } from '../Common/Input'
import { Textarea } from '../Common/Textarea'

const prevYear = new Date().getFullYear() - 1
const years = Array(prevYear - ( prevYear - 5 )).fill('').map((value, index) => prevYear - index)

console.log('Years', years)

const yearsSelectOptions = years.map(year => {
  new { label: year, value: year }
})

const monthsSelectOptions = [
  { label: 'Styczeń', value: 1 },
  { label: 'Luty', value: 2 },
  { label: 'Marzec', value: 3 },
  { label: 'Kwiecień', value: 4 },
  { label: 'Maj', value: 5 },
  { label: 'Czerwiec', value: 6 },
  { label: 'Lipiec', value: 7 },
  { label: 'Sierpień', value: 8 },
  { label: 'Wrzesień', value: 9 },
  { label: 'Październik', value: 10 },
  { label: 'Listopad', value: 11 },
  { label: 'Grudzień', value: 12 }
]

export const Employee = ({preloadedValues}) => {
  const router = useRouter()
  const { register, errors, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeFormSchema),
    defaultValues: preloadedValues
  });

  const onSubmit = (data, e) => console.log('Submit', data)
  const handleReset = () => {
    reset
    router.back()
    // Should go back to the employee details page
  }

  return (
    <>
      <StyledFormContainer topMargin='xxl'>
        <StyledForm  onSubmit={handleSubmit(onSubmit)}>
          <Input name='name' type='text' label='Imię' error={!!errors.name} errorMessage={errors?.name && 'Imię jest wymagane!'} ref={register} />
          <Input name='surname' type='text' label='Nazwisko' error={!!errors.surname} errorMessage={errors?.surname && 'Nazwisko jest wymagane!'} ref={register} />
          <Input name='position' type='text' label='Stanowisko' error={!!errors.position} errorMessage={errors?.position && 'Stanowisko jest wymagane!'} ref={register} />

          <Input name='employment_start_date' type='date' label='Data rozpoczęcia pracy' error={!!errors.employment_start_dat} errorMessage={errors?.employment_start_dat && 'Symbol jest wymagany!'} ref={register} />
          <Input name='employment_termination_date' type='date' label='Data rozwiązania umowy' error={!!errors.employment_termination_date} errorMessage={errors?.employment_termination_date && 'Symbol jest wymagany!'} ref={register} />

          <Input name='overdue_leave_amount' type='number' label='Urlop zaległy' error={!!errors.overdue_leave_amount} errorMessage={errors?.overdue_leave_amount && 'Urlop zaległy jest wymagany!'} ref={register} />
          <Input name='assigned_leave_amount' type='number' label='Urlop przysługujący' error={!!errors.assigned_leave_amount} errorMessage={errors?.assigned_leave_amount && 'Urlop przysługujący jest wymagany!'} ref={register} />
          <Input name='hourly_rate' type='number' label='Stawka godzinowa' error={!!errors.hourly_rate} errorMessage={errors?.hourly_rate && 'Stawka godzinowa jest wymagana!'} ref={register} />
          <Input name='overtime_rate' type='number' label='Stawka nadgodzinowa' error={!!errors.overtime_rate} errorMessage={errors?.overtime_rate && 'Stawka nadgodzinowa jest wymagana!'} ref={register} />
          <Input name='holiday_rate' type='number' label='Stawka urlopowa' error={!!errors.holiday_rate} errorMessage={errors?.holiday_rate && 'Stawka urlopowa jest wymagana!'} ref={register} />
          <Input name='sick_leave_rate' type='number' label='Stawka chorobowa' error={!!errors.sick_leave_rate} errorMessage={errors?.sick_leave_rate && 'Stawka chorobowa jest wymagana!'} ref={register} />

          <Input name='insurance_rate' type='Stawka ubezpieczenia' label='Imię' error={!!errors.insurance_rate} errorMessage={errors?.insurance_rate && 'Stawka ubezpieczenia jest wymagana!'} ref={register} />

          <Input name='bonus_rate' type='number' label='Wysokość premii' error={!!errors.bonus_rate} errorMessage={errors?.bonus_rate && 'Wysokość premii jest wymagana!'} ref={register} />
          {/* <Input name='hourly_rate_multiplier' type='number' label='Mnożnik stawki godzinowej' error={!!errors.hourly_rate_multiplier} errorMessage={errors?.hourly_rate_multiplier && 'Mnożnik stawki godzinowej jest wymagany!'} ref={register} /> */}
          <Input name='overtime_rate_multiplier' type='number' label='Mnożnik stawki nadgodzinowej' error={!!errors.overtime_rate_multiplier} errorMessage={errors?.overtime_rate_multiplier && 'Mnożnik stawki nadgodzinowej jest wymagany!'} ref={register} />
          <Input name='overtime_hours_multiplier' type='number' label='Mnożnik nadgodzin' error={!!errors.overtime_hours_multiplier} errorMessage={errors?.overtime_hours_multiplier && 'Mnożnik nadgodzin jest wymagany!'} ref={register} />

          <Select name='year' label='Rok' optionsArray={yearsSelectOptions} error={!!errors.year} errorMessage={errors?.year && 'Rok jest wymagany!'} ref={register}  />
          <Select name='month' label='Miesiąc' optionsArray={monthsSelectOptions} error={!!errors.month} errorMessage={errors?.month && 'Miesiąc jest wymagany!'} ref={register}  />


          <StyledFormControlsWrapper topMargin='xxl'>
            <StyledButton type='button' onClick={handleReset}>Anuluj</StyledButton>
            <StyledButton type='submit'>Zamień</StyledButton>
          </StyledFormControlsWrapper>
        </StyledForm>
      </StyledFormContainer>
    </>
  )
}

// -> click DODAJ PRACOWNIKA {__*3__}
// * otwiera się okno z formularzem do dodania nowego pracownika
//   (
//     w oknie widoczne są:
//   - formularz z następującymi polami:
//       [
//     - imię
//     - nazwisko
//     - stanowisko
//     - data zatrudnienia
//     - urlop zaległy
//     - urlop przysługujący
//     - miesiąc do wyboru
//       - stawka godzinowa
//       - stawka nadgodzinowa (pole nie wymagane do wpisania. To pole to stawka godzinowa * mnożnik stawki nadgodzinowej)
//       - stawka urlopowa
//       - stawka chorobowa
//       - stawka ubezpieczania
//       - podstawa bonusu/oceny
//       - mnożnik stawki nadgodzinowej
//       - mnożnik ilości nadgodzin i weekendowych
//     - data od kiedy obowiązuje zakres zadań
//     - pole do wpisania zakresu zadań
//       ]
//   - przycisk Anuluj (czyści formularz i przechodzi do panelu głównego aplikacji) __*3*1__
//   - przycisk Zapisz (zapisuje dane w bazie, czyści formularz i przechodzi do panelu głównego aplikacji) __*3*2__
//   )


// -> click EDYCJA {__*5*1__}
// * otwiera się okno z formularzem do edycji danych pracownika
//   (
//     w oknie widoczne są:
//   - formularz z następującymi polami:>>>>>>a czy edycja nie powinna zawierać tego samego co dodawanie nowego emploja?:)
//       [
//     - imię
//     - nazwisko
//     - stanowisko
//     - urlop zaległy
//     - urlop przysługujący
//     - miesiąc do wyboru
//       - stawka godzinowa
//       - stawka nadgodzinowa (pole nie wymagane do wpisania. To pole to stawka godzinowa * mnożnik stawki nadgodzinowej)
//       - stawka urlopowa
//       - stawka chorobowa
//       - stawka ubezpieczania
//       - podstawa bonusu/oceny
//       - mnożnik stawki nadgodzinowej
//       - mnożnik ilości nadgodzin
//       ]
//   - przycisk Anuluj (czyści formularz i przechodzi do panelu pracownika) __*5*1*1__
//   - przycisk Zapisz (zapisuje dane w bazie, czyści formularz i przechodzi do panelu pracownika) __*5*1*2__
//   )