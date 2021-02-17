import dynamic from 'next/dynamic'
import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react'
import { SubPagesContext } from '@/contexts/SubPagesContext'

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
`

const EditEmployeePage = dynamic(() => import('@/subPages/Employee/EditEmployee'), { ssr: false })
const EmploymentStatusPage = dynamic(() => import('@/subPages/EmploymentStatus'), { ssr: false })
const HolidayPage = dynamic(() => import('@/subPages/Holiday'), { ssr: false })
const SickPage = dynamic(() => import('@/subPages/Sick'), { ssr: false })
const LeavePage = dynamic(() => import('@/subPages/Leave'), { ssr: false })
const RtsPage = dynamic(() => import('@/subPages/Rts'), { ssr: false })
const ReportsPage = dynamic(() => import('@/subPages/Reports'), { ssr: false })
const ResponsibilitiesPage = dynamic(() => import('@/subPages/Responsibilities'), { ssr: false })

export const ContentSection = ({ employeeId }) => {
  const [page, setPage] = useContext(SubPagesContext).page
  const [employeeChange, setEmployeeChange] = useState(null)

  useEffect(() => {
    if (employeeChange !== employeeId) {
      setEmployeeChange(employeeChange => employeeId)
      page !== 'rts' && setPage(page => 'rts')
    }
  }, [employeeId])

  return (
    <StyledContentSection>

      { page === 'edit' ? <EditEmployeePage employeeId={employeeId} /> : null }
      { page === 'status' ? <EmploymentStatusPage employeeId={employeeId} /> : null }
      { page === 'holiday' ? <HolidayPage employeeId={employeeId} /> : null }
      { page === 'sick' ? <SickPage employeeId={employeeId} /> : null }
      { page === 'leave' ? <LeavePage employeeId={employeeId} /> : null }
      { page === 'rts' ? <RtsPage employeeId={employeeId} /> : null }
      { page === 'reports' ? <ReportsPage employeeId={employeeId} /> : null }
      { page === 'responsibilities' ? <ResponsibilitiesPage employeeId={employeeId} /> : null }

    </StyledContentSection>
  )
}