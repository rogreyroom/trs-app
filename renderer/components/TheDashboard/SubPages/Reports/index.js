import { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { DashboardContext } from '@/contexts/DashboardContext'
import { Title } from "@/common/Title"
import { TextButton } from "@/common/Buttons"
import { Select } from '@/common/Inputs'
import { getEmployeeYears } from '@/lib/utils'
import EmployeeRcpDetailsPage  from './EmployeeRcpDetails'
import EmployeeRcpCalendarPage from './EmployeeRcpCalendar'

const StyledReportsPages = styled.div`
  margin: 0;
  display: grid;
  grid-template-areas: 'title title' 'data form';
  grid-template-columns: minmax(293px, max-content) 1fr;
  grid-template-rows: 40px 1fr;
  grid-gap: var(--s);
  height: inherit;
  min-height: 100%;
  max-width: 100%;
  justify-items: start;
  align-items: start;
  padding-bottom: var(--l);

  & > h1 {
    grid-area: title;
    margin: 0;
  }

  & > section:first-child {
    grid-area: data;

  }

  & > section:last-child{
    grid-area: form;
    margin: 0;
  }
`
const StyledReportLinks = styled.section`
margin: 0;
  border-right: 1px solid var(--c-blue-03);
  padding-top: var(--l);
  padding-right: var(--l);
  min-height: inherit;

  display: grid;
  grid-template-columns: 1fr;
  /* grid-template-rows: repeat(4, 50px); */
  grid-template-rows: repeat(2, 50px) repeat(2, min-content);
  grid-gap: var(--l);
`
const StyledReportPrintArea = styled.section`
  width: 100%;
  height: 100%;
`

const getEmployeeYearsArray = (calendar) => {
  const years = getEmployeeYears(calendar)
  return  years.map(year => {
    return { label: year, value: year }
  })
}

const getEmployeeMonthsArray = () => {
  return [
    { label: 'Styczeń', value: 1 },
    { label: 'Luty', value: 2 },
    { label: 'Marzec', value: 3 },
    { label: 'Kwiecień', value: 4 },
    { label: 'Maj', value: 5 },
    { label: 'Czerwiec', value: 6 },
    { label: 'Lipiec', value: 7 },
    { label: 'Sierpień', value: 8 },
    { label: 'Wrzesień', value: 9 },
    { label: 'Październik', value: 10 },
    { label: 'Listopad', value: 11 },
    { label: 'Grudzień', value: 12 }
  ]
}




const ReportsPage = ({ employeeId }) => {
  const [employee, setEmployee] = useContext(DashboardContext).employee
  const [reportPageChange, setReportPageChange] = useState(null)
  const [reportPage, setReportPage] = useState(null)
  const defaultYear = new Date().getFullYear()
  const defaultMonth = new Date().getMonth() + 1
  const [year, setYear] = useState(defaultYear)
  const [month, setMonth] = useState(defaultMonth)
  const yearsSelectOptionsArray = getEmployeeYearsArray(employee.calendar)
  const monthsSelectOptionsArray = getEmployeeMonthsArray()

  const handleReportPageClick = (pageName) => {
    setReportPage(reportPage => pageName)
  }

  const handleYearChange = (e) => {
    const { value } = e.target
    setYear(year => parseInt(value))
  }

  const handleMonthChange = (e) => {
    const { value } = e.target
    setMonth(month => parseInt(value))
  }

  useEffect(() => {
    if (reportPageChange !== reportPage) {
      setReportPageChange(reportPageChange => reportPage)
    }
  }, [reportPage, reportPageChange])

  return (
    <StyledReportsPages>
      <Title isWhite>Raporty pracownika</Title>

      <StyledReportLinks>
        <Select name='year' label='Rok' optionsArray={yearsSelectOptionsArray} onChange={handleYearChange} selected={year}  />
        <Select name='month' label='Miesiąc' optionsArray={monthsSelectOptionsArray} onChange={handleMonthChange} selected={month}  />
        <TextButton isActive={reportPage === 'employeeRcpDetails' ? true : false} onClickAction={() => handleReportPageClick('employeeRcpDetails')}>
          Raport RCP - szczegółowy
        </TextButton>
        <TextButton isActive={reportPage === 'employeeRcpCalendar' ? true : false} onClickAction={() => handleReportPageClick('employeeRcpCalendar')}>
          Raport RCP - kalendarz
        </TextButton>
      </StyledReportLinks>
      <StyledReportPrintArea>
          { reportPage === 'employeeRcpDetails' ? <EmployeeRcpDetailsPage  year={year} month={month} /> : null }
          { reportPage === 'employeeRcpCalendar' ? <EmployeeRcpCalendarPage  year={year} month={month} /> : null }
      </StyledReportPrintArea>
    </StyledReportsPages>
  )
}

export default ReportsPage
