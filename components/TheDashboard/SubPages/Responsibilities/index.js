import { useState, useContext, useEffect } from 'react'
import useSWR from 'swr'
import { axios } from '@/lib/axios-config'
import { Title } from "@/common/Title"
import { useForm } from 'react-hook-form'
import { Button } from '@/common/Buttons'
import { Textarea } from '@/common/Inputs'
// import { joiResolver } from '@hookform/resolvers/joi';
// import { employeesFormSchema } from '@/lib/db/schemas'
import { SubPagesContext } from '@/contexts/SubPagesContext'

// TO be fixed
import { StyledFormControlsWrapper } from '@/common/CommonWrappers'


import styled  from 'styled-components';



// TODO: All that page needs to be split




export const StyledResponsibilitiesForm = styled.form`
    --max-width: ${props => props.edit ? `100%` : `80%` };
    display: grid;
    grid-template-areas: 'inputs' 'controls';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 40px;
    grid-gap: var(--xl);
    min-height: 100%;
    min-width: 100%;
`

export const StyledResponsibilitiesPage = styled.div`
  display: grid;
  grid-template-areas: 'title button' 'content content' 'form form';
  grid-template-columns: max-content 1fr;
  grid-template-rows: 48px 1fr 1fr;
  grid-gap: var(--l);
  align-items: center;
  width: 100%;
  height: 100%;

  & > h1 {
    grid-area: title;
  }

  & > button {
    grid-area: button;
    max-width: max-content;
    max-height: 32px;
    min-width: 0;
    padding: var(--s) var(--l);
  }

  & > section{
    grid-area: content;
  }

  & > :last-child {
    grid-area: form;
  }
`

export const ResponsibilitiesDataSection = styled.section`
  font-size: var(--fs-text);
  font-weight: var(--fw-light);
  color: var(--c-white);
  width: 100%;
  height: 100%;
  margin: 0 auto;
`

export const ResponsibilitiesFormSection = styled.section`
  margin: 0;
  width: 100%;
  height: 100%;
`



const fetcher = (url) => axios.get(url).then(res => res.data)


// ===============================================================================================

const ResponsibilitiesFormAdd = ({ id }) => {
  const [page, setPage] = useContext(SubPagesContext).page
  const formDefaultValues = { text: '' }
  const {register, errors, handleSubmit, reset  } = useForm({
    mode: 'onBlur',
    // resolver: joiResolver(employeesFormSchema),
    defaultValues: formDefaultValues
  })

  const onSubmit = async (data) => {
    const newResponsibilitiesData = {
      doc: 'responsibilities',
      employee: id,
      text: data.text
    }

    await axios.post(`/api/responsibilities/${id}`, { ...newResponsibilitiesData })
    setPage(page => 'responsibilities')
  }

  const handleReset = () => {
    reset()
    setPage(page => 'responsibilities')
  }

  return (
    <StyledResponsibilitiesForm onSubmit={handleSubmit(onSubmit)}>
      <Textarea name='text' error={!!errors.name} errorMessage={errors?.name && [errorMessages.notEmpty, errorMessages.alphaString] } ref={register} />
      <StyledFormControlsWrapper>
        <Button type='button' onClickAction={handleReset}>Anuluj</Button>
        <Button type='submit'>Dodaj</Button>
      </StyledFormControlsWrapper>
    </StyledResponsibilitiesForm>
  )
}

// ===============================================================================================

const ResponsibilitiesFormEdit = ({ id, text }) => {
  const [page, setPage] = useContext(SubPagesContext).page
  const { register, errors, handleSubmit, reset  } = useForm({
    mode: 'onBlur',
    // resolver: joiResolver(employeesFormSchema),
    defaultValues: text
  })

  const onSubmit = async (data) => {
    const newResponsibilitiesData = {
      text: data.text
    }

    await axios.put(`/api/responsibilities/${id}`, { ...newResponsibilitiesData })
    setPage(page => 'responsibilities')
  }

  const handleReset = () => {
    reset()
    setPage(page => 'responsibilities')
  }

  return (
    <StyledResponsibilitiesForm onSubmit={handleSubmit(onSubmit)}>
      <Textarea name='text' error={!!errors.name} errorMessage={errors?.name && [errorMessages.notEmpty, errorMessages.alphaString] } ref={register} />
      <StyledFormControlsWrapper>
        <Button type='button' onClickAction={handleReset}>Anuluj</Button>
        <Button type='submit'>Zmień</Button>
      </StyledFormControlsWrapper>
    </StyledResponsibilitiesForm>
  )
}

// ===============================================================================================

const ResponsibilitiesPage = ({ employeeId }) => {
  const [showForm, setShowForm] = useState(false)
  const { data, error } = useSWR(`/api/responsibilities/${employeeId}`, fetcher)

  useEffect(() => {
    const hideForm = () => { setShowForm(showForm => false)}
    ( data && showForm ) && hideForm()
    return () => {
      hideForm()
    }
  }, [data])

  if (error) return <h1>Something went wrong on the server!</h1>
  // if (!data) return <h1>Loading data from server...</h1>

  return (
    <StyledResponsibilitiesPage>
      <Title isWhite>Zakres obowiązków</Title>
      <Button onClickAction={() => setShowForm(showForm => true)}>{ data && ( 'Edit' ) || ( 'Add' )}</Button>
      <ResponsibilitiesDataSection>
        <p>{ data && data.text }</p>
      </ResponsibilitiesDataSection>
      <ResponsibilitiesFormSection>
        {
          data && showForm  ? (
            <ResponsibilitiesFormEdit id={employeeId} text={data} /> )
            : showForm ? ( <ResponsibilitiesFormAdd id={employeeId} /> ) : null
        }
      </ResponsibilitiesFormSection>
    </StyledResponsibilitiesPage>
  )
}

export default ResponsibilitiesPage