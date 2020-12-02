import useSWR from 'swr'
import { axios } from '@/lib/axios-config'
import styled from 'styled-components';
import { Button } from './Button'


const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-top: var(--normal);
  display: flex;
  flex-direction: column;
  height: 100%;
`
const StyledListItem = styled.li`
  display: block;
  color: var(--c-white);
  text-align: right;
  margin: 0;
  padding: var(--xxs) var(--normal) var(--xxs) var(--xxs);
  width: 100%;
`

const StyledInfo = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  h1 {
    color: var(--c-white);
    font-family: inherit;
    font-size: var(--fs-text);
  }

  /* maybe add some spinner + styles when loading */

`

const url = 'api/employees'
const fetcher = url => axios.get(url).then(res => res.data)

export const EmployeeList = () => {
  const { data, error } = useSWR(url, fetcher)

  if (error) return <StyledInfo><h1>Something went wrong!</h1></StyledInfo>
  if (!data) return <StyledInfo><h1>Loading...</h1></StyledInfo>

  return (
      <StyledList>
        {
          data.map(({ _id, name, surname }) => (
            <StyledListItem key={ _id }>
              <Button href={`${encodeURIComponent(_id)}`}>
                {surname} {name}
              </Button>
            </StyledListItem>
          ))
        }
      </StyledList>
)}