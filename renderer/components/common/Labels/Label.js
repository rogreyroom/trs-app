import styled from 'styled-components';

const StyledLabel = styled.label`
  color: var(--c-white);
  font-family: inherit;
  font-size: var(--fs-text);
  font-weight: var(--fw-light);
  text-align: right;
  margin: 0;
  flex-basis: 70%;
`;

export const Label = ({name, label}) => (
  <StyledLabel htmlFor={name} hasInput>
    {label}
  </StyledLabel>
);
