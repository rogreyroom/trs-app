import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {Input} from '@/common/Inputs';
import {Button} from '@/common/Buttons';
import {errorMessages} from '@/lib/errorMessages';
import {useState} from 'react';
import {axios} from '@/lib/axios-config';
import styled from 'styled-components';
import {StyledFormControlsWrapper, StyledForm} from '@/common/CommonWrappers';
import Loader from 'react-loader-spinner';
import {confirmAlert} from 'react-confirm-alert';
import {Alert} from '@/common/Alert';

const Panel = styled.section`
  background-image: var(--g-panel);
  box-shadow: var(--s-panel);
  padding: var(--xl);
  display: flex;
  flex-direction: column;
  max-width: 50vw;

  & h1 {
    font-size: var(--xl);
    color: var(--c-accent);
    margin: 0;
  }
`;

export const Login = () => {
  const router = useRouter();
  const {register, errors, handleSubmit, reset} = useForm();
  const [wrongLogin, setWrongLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data, e) => {
    const {name, password} = data;
    const result = axios.post('/api/login', {name, password});
    result
      .then(({data}) => {
        setLoading((loading) => true);
        router.push('/employees');
      })
      .catch((err) => setWrongLogin((wrongLogin) => true));
    reset();
  };

  if (wrongLogin) {
    return (
      <>
        {confirmAlert({
          customUI: ({onClose}) => (
            <Alert
              title="Błąd logowania"
              message="Wprowadzono nieprawidłowy login i/lub hasło!"
              yesButtonLabel="Zaloguj"
              isNoButtonPresent={false}
              yesAction={() => {
                setWrongLogin((wrongLogin) => false);
                router.push('/');
                onClose();
              }}
            />
          ),
        })}
      </>
    );
  }
  if (loading) {
    return <Loader type="Puff" color="var(--c-blue-03)" height={100} width={100} />;
  }
  return (
    <Panel>
      <h1>Login</h1>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          type="text"
          label="Nazwa"
          error={!!errors.name}
          errorMessage={errors?.name && [errorMessages.notEmpty, errorMessages.alphaString]}
          ref={register}
        />
        <Input
          name="password"
          type="password"
          label="Hasło"
          error={!!errors.password}
          errorMessage={
            errors?.password && [errorMessages.notEmpty, errorMessages.alphaNumericString]
          }
          ref={register}
        />
        <StyledFormControlsWrapper>
          <Button type="submit">Zaloguj</Button>
        </StyledFormControlsWrapper>
      </StyledForm>
    </Panel>
  );
};
