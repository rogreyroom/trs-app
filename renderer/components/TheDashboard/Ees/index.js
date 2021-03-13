import {useRouter} from 'next/router';
import {axios} from '@/lib/axios-config';
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

const eesFormSchema = Joi.object().keys({
  type: Joi.string().required(),
  count_type: Joi.string().valid('auto', 'manual').required(),
  symbol: Joi.string().required(),
  percent: Joi.number().required(),
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

export const EesForm = ({preloadedValues}) => {
  const router = useRouter();
  const {id} = router.query;
  const {register, errors, handleSubmit, reset} = useForm({
    mode: 'onBlur',
    resolver: joiResolver(eesFormSchema),
    defaultValues: preloadedValues,
  });

  const onSubmit = async (data) => {
    console.log(data);
    await axios.put(`/api/ees/${id}`, {value: data});
    reset;
    router.back();
  };

  const handleReset = () => {
    reset;
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
          errorMessage={errors?.symbol && 'Symbol jest wymagany!'}
          ref={register}
        />
        <Input
          name="percent"
          type="text"
          label="Procent"
          error={!!errors.percent}
          errorMessage={
            errors?.percent && 'Procent jest wymagany i musi być liczbą!'
          }
          ref={register}
        />
        <Select
          name="type"
          label="Rodzaj premii"
          optionsArray={typeSelectOptions}
          error={!!errors.type}
          errorMessage={
            errors?.count_type && 'Typ przydzielania jest wymagany!'
          }
          ref={register}
        />
        <Select
          name="count_type"
          label="Typ przydzielania"
          optionsArray={countTypeSelectOptions}
          error={!!errors.count_type}
          errorMessage={
            errors?.count_type && 'Typ przydzielania jest wymagany!'
          }
          ref={register}
        />
        <Textarea
          name="description"
          label="Zasada przyznania premii"
          error={!!errors.description}
          errorMessage={errors?.description && 'Opis jest wymagany!'}
          ref={register}
        ></Textarea>
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
