import styled from 'styled-components';

const StyledError = styled.span`
  ${(props) => (props.error ? `display: block` : `display: none`)};
  margin: 0;
  position: absolute;
  bottom: 60px;
  left: calc(50% + var(--normal) - 2px);
  width: calc(50% - var(--normal) + 2px);
  background-color: var(--c-white);
  font-size: var(--s);
  font-weight: var(--fw-normal);
  color: var(--c-error);
  padding: var(--xxs);
  border-radius: var(--xxs);
  transition: all 0.4s ease;
  z-index: 2;

  &:before {
    --arrow-size: var(--xs);
    position: absolute;
    content: '';
    left: 50%;
    transform: translateY(-50%);
    bottom: -12px;
    width: var(--arrow-size);
    height: var(--arrow-size);
    background: transparent;
    border-top: var(--arrow-size) solid var(--c-error);
    border-left: var(--arrow-size) solid transparent;
    border-right: var(--arrow-size) solid transparent;
  }
`;

export const Error = ({error, errorMessage}) => {
  const createError = (errorMsg) => {
    const errString = errorMsg.reduce((res, e) => `${res} ${e}`, '');
    return errString;
  };

  return <StyledError error={error}>{errorMessage && createError(errorMessage)}</StyledError>;
};
