import styled from 'styled-components';
import {Title} from '@/common/Title';
import {RtsForm} from './Form';

const StyledRtsPage = styled.section`
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 1fr;
  grid-gap: var(--xs);
  align-items: center;
  min-height: 100%;
`;

const RtsPage = ({employeeId}) => (
  // console.log('RTSPAGE id', employeeId);
  <StyledRtsPage>
    <Title isWhite>Wprowadź dane RCP</Title>
    <RtsForm id={employeeId} />
  </StyledRtsPage>
);
export default RtsPage;
