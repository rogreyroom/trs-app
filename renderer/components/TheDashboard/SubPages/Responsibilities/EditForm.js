import {useContext} from 'react';
import {SubPagesContext} from '@/contexts/SubPagesContext';
import {axios} from '@/lib/axios-config';
import {useForm} from 'react-hook-form';
import {Textarea} from '@/common/Inputs';
import {Button} from '@/common/Buttons';
import {errorMessages} from '@/lib/errorMessages';
import {StyledFormControlsWrapper} from '@/common/CommonWrappers';
import {StyledResponsibilitiesForm} from './styles';

const ResponsibilitiesFormEdit = ({id, text}) => {
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useContext(SubPagesContext).page;
  const {register, errors, handleSubmit, reset} = useForm({
    mode: 'onBlur',
    defaultValues: text,
  });

  const onSubmit = async (data) => {
    const newResponsibilitiesData = {
      text: data.text,
    };

    await axios.put(`/api/responsibilities/${id}`, {
      ...newResponsibilitiesData,
    });
    setPage((page) => 'responsibilities');
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
    setPage((page) => 'responsibilities');
  };

  return (
    <StyledResponsibilitiesForm onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        name="text"
        error={!!errors.name}
        errorMessage={errors?.name && [errorMessages.notEmpty, errorMessages.alphaString]}
        ref={register}
      />
      <StyledFormControlsWrapper>
        <Button type="button" onClickAction={(e) => handleReset(e)}>
          Anuluj
        </Button>
        <Button type="submit">Zmień</Button>
      </StyledFormControlsWrapper>
    </StyledResponsibilitiesForm>
  );
};

export default ResponsibilitiesFormEdit;
