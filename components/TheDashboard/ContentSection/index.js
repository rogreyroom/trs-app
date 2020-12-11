import dynamic from 'next/dynamic'
import styled from 'styled-components';
import { useContext } from 'react'
import { SubPagesContext } from '@/contexts/SubPagesContext'

export const StyledContentSection = styled.section`
grid-area: content;
margin: 0;
padding: var(--normal) var(--l);
margin: var(--xl) var(--xxs) var(--xxs) var(--xl);
background-image: var(--g-panel);
box-shadow: var(--s-panel);
color: var(--c-white);
`

const HolidayPage = dynamic(() => import('@/components/TheDashboard/SubPages/Holiday'), { ssr: false })
const SickPage = dynamic(() => import('@/components/TheDashboard/SubPages/Sick'), { ssr: false })
const LeavePage = dynamic(() => import('@/components/TheDashboard/SubPages/Leave'), { ssr: false })
const RtsPage = dynamic(() => import('@/components/TheDashboard/SubPages/Rts'), { ssr: false })
// const ReportsPage = dynamic(() => import('@/components/SubPages/Reports'), { ssr: false })

export const ContentSection = ({ employee }) => {
  const [page,setPage] = useContext(SubPagesContext)

  return (
    <StyledContentSection>
      { page === 'holiday' ? <HolidayPage employee={employee}/> : null }
      { page === 'sick' ? <SickPage employee={employee}/> : null }
      { page === 'leave' ? <LeavePage employee={employee}/> : null }
      { page === 'rts' ? <RtsPage employee={employee}/> : null }
      {/* { page === 'reports' ? <ReportsPage employee={employee}/> : null } */}
    </StyledContentSection>
  )
}