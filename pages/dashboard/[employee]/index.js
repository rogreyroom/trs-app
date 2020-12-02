import React, { useState, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { axios } from '@/lib/axios-config'

import { getLayout } from '@/components/layouts/DashboardLayout'
import { Header, MainNav, DetailsSection, ContentSection } from '@/components/Employee'
import { SubPagesProvider } from '@/contexts/SubPagesContext'
import { ServerError } from '@/components/Errors';

const fetcher = url => axios.get(url).then(res => res.data)

const Employee = ({ children }) => {
  const router = useRouter()
  const { employee } = router.query
  const url = `api/employees/${employee}`
  const { data, error } = useSWR(url, fetcher)

  // TODO: add styling when error or loading
  if (error) return <ServerError>Wystąpił problem z pobraniem danych z serwera!</ServerError>
  if (!data) return <h1>!!!!Loading...</h1>
  const {
    name,
    surname,
    position,
    juvenile_worker,
    employment_status,
    overdue_leave_amount,
    assigned_leave_amount,
    calendar,
    employment_start_date,
    employment_termination_date
  } = data

  return (
    <>
      <Header name={`${name} ${surname}`} position={position} juvenile={juvenile_worker} status={employment_status}  />
      <SubPagesProvider>
        <MainNav employee={employee} />
        <DetailsSection employeeCalendar={calendar} assignedLeaveDays={{overdue: overdue_leave_amount, assigned: assigned_leave_amount}} employmentDates={{start: employment_start_date, end: employment_termination_date}}/>
        <ContentSection employee={employee} />
      </SubPagesProvider>
    </>
  )
}


Employee.getLayout = getLayout

export default Employee