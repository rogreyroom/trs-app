import styled from 'styled-components';
import {useContext, useState, useEffect} from 'react';
import {SubPagesContext} from '@/contexts/SubPagesContext';
import EditEmployee from '@/subPages/Employee/EditEmployee';
import EmploymentStatus from '@/subPages/EmploymentStatus';
import Holiday from '@/subPages/Holiday';
import Sick from '@/subPages/Sick';
import Leave from '@/subPages/Leave';
import Rts from '@/subPages/Rts';
import Responsibilities from '@/subPages/Responsibilities';
import Reports from '@/subPages/Reports';

export const StyledContentSection = styled.section`
  grid-area: content;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: var(--normal) var(--l);
  margin: var(--xl) var(--xxs) var(--xxs) var(--xl);
  background-image: var(--g-panel);
  box-shadow: var(--s-panel);
  color: var(--c-white);
`;

export const ContentSection = ({employeeId}) => {
  const [page, setPage] = useContext(SubPagesContext).page;
  const [employeeChange, setEmployeeChange] = useState(null);

  useEffect(() => {
    if (employeeChange !== employeeId) {
      setEmployeeChange((employeeChange) => employeeId);
      page !== 'rts' && setPage((page) => 'rts');
    }
  }, [employeeChange, employeeId, page, setPage]);

  const SwitchPage = ({value, id}) => {
    switch (value) {
      case 'edit':
        return <EditEmployee employeeId={id} />;
      case 'status':
        return <EmploymentStatus employeeId={id} />;
      case 'holiday':
        return <Holiday employeeId={id} />;
      case 'sick':
        return <Sick employeeId={id} />;
      case 'leave':
        return <Leave employeeId={id} />;
      case 'rts':
        // console.log('RTS', id);
        return <Rts employeeId={id} />;
      case 'reports':
        return <Reports employeeId={id} />;
      case 'responsibilities':
        return <Responsibilities employeeId={id} />;
      default:
        return null;
    }
  };

  return (
    <StyledContentSection>
      <SwitchPage value={page} id={employeeId} />
    </StyledContentSection>
  );
};
