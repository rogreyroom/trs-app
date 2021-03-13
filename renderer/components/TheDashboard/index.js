// import { useContext } from 'react'
// import { DashboardContext } from '@/contexts/DashboardContext'
// import { SubPagesProvider } from '@/contexts/SubPagesContext'
// import { Title } from "@/common/Title"
// import { AddEmployeePage } from '@/subPages/Employee/AddEmployee'
// import { Header } from '@/dashboard/Header'
// import { MainNav } from '@/dashboard/MainNav'
// import { DetailsSection } from '@/dashboard/DetailsSection'
// import { ContentSection } from '@/dashboard/ContentSection'
// import { Aside } from '@/dashboard/Sidebar'
// import { Main } from '@/dashboard/Main'


// // import useSWR from 'swr'
// // import { axios } from '@/lib/axios-config'



// export const Board = () => {
//   const [employees, setEmployees] = useContext(DashboardContext).data
//   const [employee, setEmployee] = useContext(DashboardContext).employee
//   const [addEmployeePage, setAddEmployeePage] = useContext(DashboardContext).add


//   if ( addEmployeePage ) {
//     // console.log('board addEmployeePage', employee, addEmployeePage);
//     return (
//     <>
//       <Aside />
//       <Main>
//         <Title isWhite>Dodaj pracownika</Title>
//         <AddEmployeePage />
//       </Main>
//     </>
//     )
//   } else if (employee) {
//     // console.log('board employee', employee);
//     const {
//       _id,
//       name,
//       surname,
//       position,
//       juvenile_worker,
//       employment_status,
//       overdue_leave_amount,
//       assigned_leave_amount,
//       calendar,
//       employment_start_date,
//       employment_termination_date
//     } = employee

//     console.log();

//     return (
//       <>
//         <Aside />
//         <Main dashboard>
//           <SubPagesProvider>
//             <Header employeeId={_id} name={`${name} ${surname}`} position={position} juvenile={juvenile_worker} status={employment_status}  />
//             <MainNav />
//             {/* <DetailsSection calendar={calendar} leaveDays={{overdue: overdue_leave_amount, assigned: assigned_leave_amount}} employmentDates={{start: employment_start_date, end: employment_termination_date}}/> */}
//             <DetailsSection calendar={calendar} leaveDays={{overdue: overdue_leave_amount, assigned: assigned_leave_amount}} />
//             <ContentSection employeeId={_id} />
//           </SubPagesProvider>
//         </Main>
//       </>
//     )

//   } else {
//       // console.log('board aside', employee, addEmployeePage);
//       return <Aside />
//   }

// }