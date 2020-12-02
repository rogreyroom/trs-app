import styled from 'styled-components';

const StyledError = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  font-weight: var(--fw-normal);
  font-size: var(--fs-h4);
  color: var(--c-error);
  padding: var(--xxl);
  border: 1px solid var(--c-error);
  width: 50vw;
  height: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
`

export const ServerError = ({ children }) => {
  return (
    <StyledError>
      { children }
    </StyledError>
  )
}