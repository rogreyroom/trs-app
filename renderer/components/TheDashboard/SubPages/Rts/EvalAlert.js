import styled from 'styled-components';
import {Title} from '@/common/Title';
import {Button} from '@/common/Buttons';
import {StyledFormControlsWrapper} from '@/common/CommonWrappers';

const StyledAlertForm = styled.div`
  display: grid;
  grid-template-areas: 'title' 'message' 'controls';
  grid-template-columns: 1fr;
  grid-template-rows: 40px 1fr 60px;
  grid-gap: var(--xl);
  background: var(--c-blue-03);
  padding: var(--l);
  max-width: 580px;

  & > h1 {
    grid-area: title;
  }

  & > p {
    grid-area: message;
    font-size: var(--fs-text);
    color: var(--c-white);
  }
`;

export const EvalAlert = ({
  title,
  message,
  yesButtonLabel,
  noButtonLabel,
  isNoButtonPresent,
  yesAction,
  noAction,
}) => (
  <StyledAlertForm>
    <Title isWhite>{title}</Title>
    <p>{message}</p>
    <StyledFormControlsWrapper>
      <Button onClickAction={yesAction}>{yesButtonLabel}</Button>
      {isNoButtonPresent && <Button onClickAction={noAction}>{noButtonLabel}</Button>}
    </StyledFormControlsWrapper>
  </StyledAlertForm>
);
