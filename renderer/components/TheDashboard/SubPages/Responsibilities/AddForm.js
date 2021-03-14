import {useContext} from 'react';
import {SubPagesContext} from '@/contexts/SubPagesContext';
import {axios} from '@/lib/axios-config';
import {useForm} from 'react-hook-form';
import {Textarea} from '@/common/Inputs';
import {Button} from '@/common/Buttons';
import {errorMessages} from '@/lib/errorMessages';
import {StyledFormControlsWrapper} from '@/common/CommonWrappers';
import {StyledResponsibilitiesForm} from './styles';

const ResponsibilitiesFormAdd = ({id}) => {
  // const [employee, setEmployee] = useContext(DashboardContext).employee;
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useContext(SubPagesContext).page;
  const formDefaultValues = {text: ''};
  const {register, errors, handleSubmit, reset} = useForm({
    mode: 'onBlur',
    // resolver: joiResolver(employeesFormSchema),
    defaultValues: formDefaultValues,
  });

  // const getEmployeeData = (id, data) => data.filter((employee) => employee._id === id)[0];

  const onSubmit = async (data) => {
    const newResponsibilitiesData = {
      doc: 'responsibilities',
      employee: id,
      text: data.text,
    };

    await axios.post(`/api/responsibilities/${id}`, {
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
        <Button type="submit">Dodaj</Button>
      </StyledFormControlsWrapper>
    </StyledResponsibilitiesForm>
  );
};

export default ResponsibilitiesFormAdd;
