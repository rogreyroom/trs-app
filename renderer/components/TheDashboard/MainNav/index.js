import styled from 'styled-components';
import {useContext} from 'react';
import {SubPagesContext} from '@/contexts/SubPagesContext';
import {SvgHoliday, SvgSick, SvgLeave, SvgRts, SvgPdf} from '@/icons';
import {IconButton} from '@/common/Buttons';

const EmployeeMainNav = styled.nav`
  grid-area: employee-nav;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  background-image: var(--g-sub-nav);

  & button {
    margin-left: var(--xxs);
  }
`;

export const MainNav = () => {
  const [page, setPage] = useContext(SubPagesContext).page;

  const handleSubPageClick = (pageName) => {
    setPage((page) => pageName);
  };

  return (
    <EmployeeMainNav>
      <IconButton
        size="xl"
        isActive={page === 'holiday'}
        onClickAction={() => handleSubPageClick('holiday')}
      >
        <SvgHoliday />
      </IconButton>
      <IconButton
        size="xl"
        isActive={page === 'sick'}
        onClickAction={() => handleSubPageClick('sick')}
      >
        <SvgSick />
      </IconButton>
      <IconButton
        size="xl"
        isActive={page === 'leave'}
        onClickAction={() => handleSubPageClick('leave')}
      >
        <SvgLeave />
      </IconButton>
      <IconButton
        size="xl"
        isActive={page === 'rts'}
        onClickAction={() => handleSubPageClick('rts')}
      >
        <SvgRts />
      </IconButton>
      <IconButton
        size="xl"
        isActive={page === 'reports'}
        onClickAction={() => handleSubPageClick('reports')}
      >
        <SvgPdf />
      </IconButton>
    </EmployeeMainNav>
  );
};
