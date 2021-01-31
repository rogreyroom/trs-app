import { forwardRef } from 'react'
// import { StyledFieldWrapper, StyledLabel, StyledTextarea, StyledEvaluationTextarea,StyledEvaluationTextareaWrapper, StyledError } from './StyledComponents'

import styled, { css } from 'styled-components';
import { CommonInputStyles } from './_commonStyles'
// import { CommonFormFieldsStyles } from './CommonCss'


// This should go to @/common/*
// import { Label } from '@/common/Labels'
import { Error } from '@/common/Errors'



// export const StyledTextarea2 = styled.textarea`
//   ${CommonFormFieldsStyles}
//   min-height: 100%;
//   padding: var(--s);


//   & + span {
//     /* ${ props => props.error && `transform: translateY(0)`}; */
//   }
// `



// export const StyledEvaluationTextarea = styled.textarea`
//   grid-row: 3;
//   ${CommonFormFieldsStyles}

//   /* height: 150px; */
//   resize: none;

//   width: 100%

//   & + span {
//     /* ${ props => props.error && `transform: translateY(0)`}; */
//   }
// `

// export const StyledEvaluationTextareaWrapper = styled.div`

//   display: flex;
//   justify-content: center;
//   align-content: center;

//   width: 100%;
//   margin: 0;
//   position: relative;

//   ${props => props.isTextarea && css`
//     grid-row: 2 / 2;
//     grid-column: 1 / 4;
//   `}

//   & textarea {
//     height: 130px;
//   }

// `



const StyledTextareaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  width: 100%;
  margin: 0;
  position: relative;

  ${props => props.isEvalTextarea && css`
    grid-row: 2 / 2;
    grid-column: 1 / 4;
  ` || css`
    grid-row: 1 / 1;
  `}

  & textarea {
    height: 130px;
  }

`

const StyledTextarea = styled.textarea`
  ${CommonInputStyles}
  resize: none;
  min-height: 100%;
  width: 100%;
  padding: var(--s);

  ${props => props.isEval && css`
    grid-row: 3;
  `}
`


export const Textarea = forwardRef(({ name, label, error, errorMessage, onChange,  value }, ref) => {
  return (
    <StyledTextareaWrapper>
      <StyledTextarea  name={name} ref={ref} error={error} value={value} onChange={onChange} />
      <Error error={error} errorMessage={errorMessage} />
    </StyledTextareaWrapper>
  )
})

export const EvaluationTextarea = forwardRef(({ name, label, error, errorMessage, onChange,  value }, ref) => {
  return (
    <StyledTextareaWrapper isEvalTextarea>
      <StyledTextarea isEval name={name} ref={ref} error={error} value={value} onChange={onChange} />
      <Error error={error} errorMessage={errorMessage} />
    </StyledTextareaWrapper>
  )
})


// export const Textarea2 = forwardRef(({ name, label, error, errorMessage }, ref) => {
//   return (
//     <StyledEvaluationTextareaWrapper>
//       <StyledTextarea2  name={name} ref={ref} error={error}/>
//       <StyledError>{errorMessage}</StyledError>
//     </StyledEvaluationTextareaWrapper>
//   )
// })



// export const EvaluationTextarea = forwardRef(({ name, label, error, errorMessage, onChange,  value }, ref) => {
//   console.log('EvaluationTextarea', value);
//   return (
//     <StyledEvaluationTextareaWrapper isTextarea>
//       <StyledEvaluationTextarea  name={name} ref={ref} error={error} value={value} onChange={onChange} />
//       {/* <StyledError>{errorMessage}</StyledError> */}
//     </StyledEvaluationTextareaWrapper>
//   )
// })
