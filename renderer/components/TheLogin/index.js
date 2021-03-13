import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Input } from '@/common/Inputs'
import { Button } from '@/common/Buttons'
import { errorMessages } from '@/lib/errorMessages'
import { useState } from 'react'

import { StyledFormControlsWrapper, StyledForm } from '@/common/CommonWrappers'

export const Login = () => {
  const router = useRouter()
  const { register, errors, handleSubmit, reset } = useForm()
  const [wrongLogin, setWrongLogin] = useState(false)

  const adminName = 'tomek'
  const adminPassword = 'fasttracker'

  const onSubmit = (data, e) => {
    console.log('Login user', data)

    if (data.name === adminName && data.password === adminPassword) {
      console.log('Zalogowany ', data.name, data.password)
      router.push('/employees')
    } else {
      setWrongLogin(wrongLogin => true)
    }
  }

  return (
    <>
      { wrongLogin && <h1>Nieprawidłowy login i hasło!</h1> }

      <StyledForm  onSubmit={handleSubmit(onSubmit)}>
        <Input name='name' type='text' label='Nazwa' error={!!errors.name} errorMessage={errors?.name && [errorMessages.notEmpty, errorMessages.alphaString] } ref={register} />
        <Input name='password' type='password' label='Hasło' error={!!errors.password} errorMessage={errors?.password && [errorMessages.notEmpty, errorMessages.alphaNumericString] } ref={register} />
        <StyledFormControlsWrapper>
          <Button type='submit'>Zaloguj</Button>
        </StyledFormControlsWrapper>
      </StyledForm>
    </>
  )
}