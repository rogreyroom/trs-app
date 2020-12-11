

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
// import Joi from 'joi';
import { eesFormSchema } from '../../../lib/db/schemas'
import { StyledFormContainer, StyledForm, StyledFormControlsWrapper, StyledButton  } from '../Common/StyledComponents'
import { Input } from '../Common/Input'

const prevYear = new Date().getFullYear() - 1


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
          <Input name='name' type='text' label='Data rozpoczęcia' error={!!errors.name} errorMessage={errors?.name && 'Imię jest wymagane!'} ref={register} />
          <Input name='surname' type='text' label='Data zakończenia' error={!!errors.surname} errorMessage={errors?.surname && 'Nazwisko jest wymagane!'} ref={register} />

          <StyledFormControlsWrapper topMargin='xxl'>
            <StyledButton type='button' onClick={handleReset}>Anuluj</StyledButton>
            <StyledButton type='submit'>Zamień</StyledButton>
          </StyledFormControlsWrapper>
        </StyledForm>
      </StyledFormContainer>
    </>
  )
}


//     (
//       w oknie widoczne są:
//   - formularz z następującymi polami:
//         [
//     - data startu/rozpoczęcia
//     - data końca/zakończenia
//         ]
//   - przycisk Anuluj (czyści formularz i przechodzi do panelu pracownika) __*5*6*1__
//   - przycisk Zapisz (zapisuje dane w bazie, czyści formularz i przechodzi do panelu pracownika) __*5*6*2__
//     )