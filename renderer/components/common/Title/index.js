import styled from 'styled-components';

const StyledTitle = styled.h1.attrs((props) => ({
  size: (props.isLogo && '--xl') || '--l',
  color: (props.isWhite && '--c-white') || '--c-accent',
}))`
  --size: var(${(props) => props.size});
  --color: var(${(props) => props.color});

  font-size: var(--size);
  color: var(--color);
  margin: 0;
`;

export const Title = ({children, isLogo, isWhite}) => (
  <StyledTitle isLogo={isLogo} isWhite={isWhite}>
    {children}
  </StyledTitle>
);
