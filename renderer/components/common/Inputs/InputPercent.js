import {forwardRef} from 'react';
import styled, {css} from 'styled-components';
import {Label} from '@/common/Labels';
import {Error} from '@/common/Errors';
import {StyledInput} from './_commonStyles';

const StyledPercentWrapper = styled.div`
  margin: 0;
  display: flex;
  align-items: center;

  ${(props) =>
    props.isEvalInput &&
    css`
      grid-row: 1 / 1;
      grid-column: 2 / 3;
    `}

  & > label {
    margin-left: var(--s);
  }
`;

export const PercentInput = forwardRef(
  ({name, label, error, errorMessage, min, max, step, value, onChange}, ref) => {
    const handleFocus = (event) => event.target.select();

    return (
      <StyledPercentWrapper isEvalInput>
        <StyledInput
          type="number"
          name={name}
          ref={ref}
          error={error}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
        />
        <Label name={name} label={label} />
        <Error error={error} errorMessage={errorMessage} />
      </StyledPercentWrapper>
    );
  }
);
