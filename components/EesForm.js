import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { eesFormSchema } from '../lib/db/schemas'
import { StyledFormContainer, StyledForm, StyledFormControlsWrapper, StyledButton  } from './styled'
import { Select } from './Select'
import { Input } from './Input'
import { Textarea } from './Textarea'

const typeSelectOptions = [
  { label: 'Zadaniowy', value: 'task-oriented' },
  { label: 'Uznaniowy', value: 'discretionary' },
]
const countTypeSelectOptions = [
  { label: 'Automatycznie', value: 'auto' },
  { label: 'Ręcznie', value: 'manual' }
]

export default function EesEdit({preloadedValues}) {
  const router = useRouter()
  const { register, errors, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(eesFormSchema),
    defaultValues: preloadedValues
  });

  const onSubmit = (data, e) => console.log('Submit', data)
  const handleReset = () => {
    reset
    router.back()
  }

  return (
    <>
      <StyledFormContainer topMargin='xxl'>
        <StyledForm  onSubmit={handleSubmit(onSubmit)}>
          <Input name='symbol' type='text' label='Symbol' error={!!errors.symbol} errorMessage={errors?.symbol && 'Symbol jest wymagany!'} ref={register} />
          <Input name='percent' type='number' label='Percent' error={!!errors.percent} errorMessage={errors?.percent && 'Procent jest wymagany i musi być liczbą!'} ref={register} />
          <Select name='type' label='Rodzaj premii' optionsArray={typeSelectOptions} error={!!errors.type} errorMessage={errors?.count_type && 'Typ przydzielania jest wymagany!'} ref={register}  />
          <Select name='count_type' label='Typ przydzielania' optionsArray={countTypeSelectOptions} error={!!errors.count_type} errorMessage={errors?.count_type && 'Typ przydzielania jest wymagany!'} ref={register}  />
          <Textarea name='description' label='Zasada przyznania premii' error={!!errors.description} errorMessage={errors?.description && 'Opis jest wymagany!'} ref={register}></Textarea>
          <StyledFormControlsWrapper topMargin='xxl'>
            <StyledButton type='button' onClick={handleReset}>Anuluj</StyledButton>
            <StyledButton type='submit'>Zamień</StyledButton>
          </StyledFormControlsWrapper>
        </StyledForm>
      </StyledFormContainer>
    </>
  )
}