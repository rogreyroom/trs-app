import styled from 'styled-components';
import {Logo} from './Logo';
import {Navbar} from './Navbar';

const StyledHeaderContainer = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: var(--xl);
`;

export const Header = () => {
  return (
    <StyledHeaderContainer>
      <Logo />
      <Navbar />
    </StyledHeaderContainer>
  );
};
