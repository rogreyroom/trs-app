import styled from 'styled-components';
import { axios } from '@/lib/axios-config'
import useSWR, {mutate} from 'swr'
import { useContext, useEffect  } from 'react'
import { SvgEdit, SvgOnSwitch, SvgOffSwitch, SvgYoung } from '@/icons'
import { IconButton } from '@/common/Buttons'
import { SubPagesContext } from '@/contexts/SubPagesContext';
import { DashboardContext } from '@/contexts/DashboardContext'


const EmployeeOptionsNav = styled.nav`
grid-area: employee-nav;
display: flex;
justify-content: flex-start;
align-content: center;
gap: var(--xs);
padding-left: var(--normal);
`

export const OptionsNav = ({ id, juvenile, status}) => {
  const [page, setPage] = useContext(SubPagesContext).page
  const [employees, setEmployees] = useContext(DashboardContext).data
  const [employee, setEmployee] = useContext(DashboardContext).employee
  const { data } = useSWR(`/api/employees/${id}`, { initialData: employee })

  useEffect(() => {
    setEmployee(employee => data)
    return () => {
      setEmployee(employee => employee)
    }
  }, [data, employee])

  const handleSubPageClick = (pageName) => {
    setPage(pageName)
  }

  const handleYoungSwitch = async () => {
    const newJuvenileStatus = !employee.juvenile_worker
    await mutate(`/api/employees/${id}`, data => ({ ...data, juvenile_worker: newJuvenileStatus }))
    await axios.put(`/api/employees/${id}`, { field: 'juvenile', value: { newJuvenileStatus }})
    mutate()
  }

  return (
    <EmployeeOptionsNav>
      <IconButton size='xl' isActive={page === 'edit' ? true : false} onClickAction={() => handleSubPageClick('edit')} >
        <SvgEdit />
      </IconButton>

      <IconButton size='xl' isActive={employee.employment_status} onClickAction={() => handleSubPageClick('status')} >
        { employee.employment_status && ( <SvgOnSwitch /> ) || ( <SvgOffSwitch /> )}
      </IconButton>

      <IconButton size='xl' isActive={employee.juvenile_worker} onClickAction={handleYoungSwitch}>
        <SvgYoung />
      </IconButton>
    </EmployeeOptionsNav>
  )
}