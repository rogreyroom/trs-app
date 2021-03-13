import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useState } from 'react'
import { getLayout } from '@/layouts/TopBarOnlyLayout'
import { Title } from '@/common/Title'
import { IconButton } from '@/common/Buttons'
import { SvgEdit } from '@/icons'
import { StyledTable, StyledThead, StyledTBody, StyledTr, StyledTh, StyledTd } from '@/common/Table'


const Ees = () => {
  const router = useRouter()
  const [eesData, setEesData] = useState([])

  const { data, error } = useSWR('/api/ees')
  if (error) return <h1>Something went wrong on the server!</h1>
  if (!data) return <h1>Loading data from server...</h1>

  const eesDataCheck = Object.values(eesData).join('')
  const dataCheck = Object.values(data).join('')

  if ( eesDataCheck !== dataCheck ) {
    setEesData(eesData => data)
  }


  return (
    <>
        <header>
          <Title>
            System Oceny Pracownika
          </Title>
        </header>
        {eesData && (
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>Edycja</StyledTh>
              <StyledTh>Symbol</StyledTh>
              <StyledTh>%</StyledTh>
              <StyledTh>Zasada przyznania premii</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTBody>
          {eesData.map(({ _id, symbol, percent, description }) => (
            <StyledTr key={_id}>
              <StyledTd>
                <IconButton size='m' onClickAction={() => router.push({
                  pathname: `/ees-edit/`,
                  query: { pid: encodeURIComponent(_id)}
                })} >
                  <SvgEdit/>
                </IconButton>
              </StyledTd>
              <StyledTd>
                {symbol}
              </StyledTd>
              <StyledTd>
                {percent}%
              </StyledTd>
              <StyledTd>
                {description}
              </StyledTd>
            </StyledTr>
          ))}
          </StyledTBody>
        </StyledTable>
        )}
      </>
  )
}

// export async function getServerSideProps(context) {
//   const res = await axios.get('/ees').catch(error => `Timeout exceeded ${error}`)

//   const allEesData = (res && res.data) ? await res.data : []



//   return {
//     props: {
//       allEesData
//     }
//   }
// }

Ees.getLayout = getLayout
export default Ees
