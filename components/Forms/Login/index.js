import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { StyledForm, StyledFormControlsWrapper, StyledButton } from '../Common/StyledComponents'
import { Input } from '../Common/Input'


export const Login = () => {
  const router = useRouter()
  const { register, errors, handleSubmit, reset } = useForm()

  const onSubmit = (data, e) => {
    console.log('Login user', data)
    router.push('/dashboard')
  }


  return (

        <StyledForm  onSubmit={handleSubmit(onSubmit)}>
          <Input name='name' type='text' label='Nazwa' error={!!errors.name} errorMessage={errors?.name && 'Nazwa jest wymagana!'} ref={register} />
          <Input name='password' type='password' label='Hasło' error={!!errors.password} errorMessage={errors?.password && 'Hasło jest wymagane!'} ref={register} />
          <StyledFormControlsWrapper topMargin='xxl'>
            <StyledButton type='submit'>Zaloguj</StyledButton>
          </StyledFormControlsWrapper>
        </StyledForm>

  )
}


