import {forwardRef} from 'react';
import styled, {css} from 'styled-components';
import {Error} from '@/common/Errors';
import {CommonInputStyles} from './_commonStyles';

const StyledTextareaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  width: 100%;
  margin: 0;
  position: relative;

  ${(props) =>
    (props.isEvalTextarea &&
      css`
        grid-row: 2 / 2;
        grid-column: 1 / 4;
      `) ||
    css`
      grid-row: 1 / 1;
    `}

  & textarea {
    height: 130px;
  }
`;

const StyledTextarea = styled.textarea`
  ${CommonInputStyles}
  resize: none;
  min-height: 100%;
  width: 100%;
  padding: var(--s);

  ${(props) =>
    props.isEval &&
    css`
      grid-row: 3;
    `}
`;

export const Textarea = forwardRef(({name, error, errorMessage, onChange, value}, ref) => (
  <StyledTextareaWrapper>
    <StyledTextarea name={name} ref={ref} error={error} value={value} onChange={onChange} />
    <Error error={error} errorMessage={errorMessage} />
  </StyledTextareaWrapper>
));

export const EvaluationTextarea = forwardRef(
  ({name, error, errorMessage, onChange, value}, ref) => (
    <StyledTextareaWrapper isEvalTextarea>
      <StyledTextarea
        isEval
        name={name}
        ref={ref}
        error={error}
        value={value}
        onChange={onChange}
      />
      <Error error={error} errorMessage={errorMessage} />
    </StyledTextareaWrapper>
  )
);
