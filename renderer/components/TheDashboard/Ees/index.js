import {useRouter} from 'next/router';
import {axios} from '@/lib/axios-config';
import {mutate} from 'swr';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import Joi from 'joi';
import {Input, Select, Textarea} from '@/common/Inputs';
import {Button} from '@/common/Buttons';
import {
  StyledEesFormContainer,
  StyledEesForm,
  StyledFormControlsWrapper,
} from '@/common/CommonWrappers';

import {useContext} from 'react';
import {EesContext} from '@/contexts/EesContext';

import {errorMessages} from '@/lib/errorMessages';

const eesFormSchema = Joi.object().keys({
  type: Joi.string().required(),
  count_type: Joi.string().valid('auto', 'manual').required(),
  symbol: Joi.string().required(),
  percent: Joi.string().required(),
  description: Joi.string().required(),
});

const typeSelectOptions = [
  {label: 'Zadaniowy', value: 'task-oriented'},
  {label: 'Uznaniowy', value: 'discretionary'},
];
const countTypeSelectOptions = [
  {label: 'Automatycznie', value: 'auto'},
  {label: 'Ręcznie', value: 'manual'},
];

const getEesData = (id, data) => data.filter((ees) => ees._id === id)[0];

export const EesForm = ({id, preloadedValues}) => {
  const [theEes, setTheEes] = useContext(EesContext).ees;
  const router = useRouter();
  const {register, errors, handleSubmit, reset} = useForm({
    mode: 'onBlur',
    resolver: joiResolver(eesFormSchema),
    defaultValues: theEes || {},
  });

  const onSubmit = async (data) => {
    const id = theEes?._id;
    await axios.put(`/api/ees/${id}`, {value: data});
    mutate('/api/ees', async () => {
      await axios.get('api/ees');
      const updatedEes = await axios.get('/api/ees');
      const updatedEmployee = getEesData(id, updatedEes.data);
      setTheEes((theEes) => updatedEmployee);
    });
    reset();
    router.push('/ees');
  };

  const handleReset = () => {
    reset();
    router.back();
  };

  return (
    <StyledEesForm onSubmit={handleSubmit(onSubmit)}>
      <StyledEesFormContainer>
        <Input
          name="symbol"
          type="text"
          label="Symbol"
          error={!!errors.symbol}
          errorMessage={errors?.symbol && [errorMessages.notEmpty]}
          ref={register}
        />
        <Input
          name="percent"
          type="text"
          label="Procent"
          error={!!errors.percent}
          errorMessage={
            errors?.percent && [errorMessages.notEmpty, errorMessages.alphaNumericString]
          }
          ref={register}
        />
        <Select
          name="type"
          label="Rodzaj premii"
          optionsArray={typeSelectOptions}
          error={!!errors.type}
          errorMessage={errors?.count_type && [errorMessages.notEmpty]}
          ref={register}
        />
        <Select
          name="count_type"
          label="Typ przydzielania"
          optionsArray={countTypeSelectOptions}
          error={!!errors.count_type}
          errorMessage={errors?.count_type && [errorMessages.notEmpty]}
          ref={register}
        />
        <Textarea
          name="description"
          label="Zasada przyznania premii"
          error={!!errors.description}
          errorMessage={errors?.description && [errorMessages.notEmpty]}
          ref={register}
        />
      </StyledEesFormContainer>
      <StyledFormControlsWrapper>
        <Button type="button" onClickAction={handleReset}>
          Anuluj
        </Button>
        <Button type="submit">Zamień</Button>
      </StyledFormControlsWrapper>
    </StyledEesForm>
  );
};
