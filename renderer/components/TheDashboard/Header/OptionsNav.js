import styled from 'styled-components';
import {axios} from '@/lib/axios-config';
import {mutate} from 'swr';
import {useContext, useEffect, useState} from 'react';
import {SvgEdit, SvgOnSwitch, SvgOffSwitch, SvgYoung} from '@/icons';
import {IconButton} from '@/common/Buttons';
import {SubPagesContext} from '@/contexts/SubPagesContext';
import {DashboardContext} from '@/contexts/DashboardContext';

const EmployeeOptionsNav = styled.nav`
  grid-area: employee-nav;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  gap: var(--xs);
  padding-left: var(--normal);
`;

export const OptionsNav = ({id}) => {
  // eslint-disable-next-line no-unused-vars
  const [employee, setEmployee] = useContext(DashboardContext).employee;
  const [page, setPage] = useContext(SubPagesContext).page;
  const [juvenileStatus, setJuvenileStatus] = useState(employee.juvenile_worker);
  const [employeeChange, setEmployeeChange] = useState(null);
  const [employeeData, setEmployeeData] = useState(
    {
      id: employee._id,
      juvenile: employee.juvenile,
      status: employee.status,
    } || {}
  );

  console.log('OptionsNav1 ', employee.juvenile_worker);

  useEffect(() => {
    if (employeeChange !== id) {
      setEmployeeChange((employeeChange) => id);
    }
    setEmployeeData((employeeData) => ({
      id: employee._id,
      juvenile: employee.juvenile_worker,
      status: employee.status,
    }));
    setJuvenileStatus((juvenileStatus) => employee.juvenile_worker);
  }, [id, employee, employeeChange]);

  const handleSubPageClick = (pageName) => {
    console.log('handleSubPageClick');
    setPage((page) => pageName);
  };

  const handleYoungSwitch = async () => {
    const newJuvenileStatus = !employeeData.juvenile;
    console.log('handleYoungSwitch newJuvenileStatus', newJuvenileStatus);
    setJuvenileStatus((juvenileStatus) => newJuvenileStatus);
    await mutate(`/api/employees/${id}`, (data) => ({
      ...data,
      juvenile_worker: newJuvenileStatus,
    }));
    await axios.put(`/api/employees/${id}`, {
      field: 'juvenile',
      value: {newJuvenileStatus},
    });
    mutate();
  };

  console.log('OptionsNav2 ', employee.juvenile_worker);

  return (
    <EmployeeOptionsNav>
      <IconButton
        size="xl"
        isActive={page === 'edit'}
        onClickAction={() => handleSubPageClick('edit')}
      >
        <SvgEdit />
      </IconButton>
      <IconButton
        size="xl"
        isActive={employeeData.status}
        onClickAction={() => handleSubPageClick('status')}
      >
        {(employeeData.status && <SvgOnSwitch />) || <SvgOffSwitch />}
      </IconButton>
      <IconButton size="xl" isActive={juvenileStatus} onClickAction={handleYoungSwitch}>
        <SvgYoung />
      </IconButton>
    </EmployeeOptionsNav>
  );
};
