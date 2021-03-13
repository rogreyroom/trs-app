import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

// import { StyledForm, StyledFormControlsWrapper, StyledButton } from '@/common/StyledComponents'
import { Input } from '@/common/Inputs'
import { Button } from '@/common/Buttons'
import { errorMessages } from '@/lib/errorMessages'

import { StyledFormControlsWrapper, StyledForm } from '@/common/CommonWrappers'

export const Login = () => {
  const router = useRouter()
  const { register, errors, handleSubmit, reset } = useForm()

  const onSubmit = (data, e) => {
    console.log('Login user', data)
    router.push('/dashboard')
  }

  return (

        <StyledForm  onSubmit={handleSubmit(onSubmit)}>
          <Input name='name' type='text' label='Nazwa' error={!!errors.name} errorMessage={errors?.name && [errorMessages.notEmpty, errorMessages.alphaString] } ref={register} />
          <Input name='password' type='password' label='Hasło' error={!!errors.password} errorMessage={errors?.password && [errorMessages.notEmpty, errorMessages.alphaNumericString] } ref={register} />
          <StyledFormControlsWrapper>
            <Button type='submit'>Zaloguj</Button>
          </StyledFormControlsWrapper>
        </StyledForm>

  )
}