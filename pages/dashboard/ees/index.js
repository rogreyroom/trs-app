import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'
import { axios } from '@/lib/axios-config'
import { getLayout } from '@/components/layouts/TopBarOnlyLayout'
import { Title } from '@/components/Title'
import { IconButton } from '@/components/common/IconButton111'
import { SvgEdit } from '@/Icons'
import { StyledTable, StyledThead, StyledTbody, StyledTr, StyledTh, StyledTd } from '@/components/common/Table'

const Ees = ({ allEesData }) => {
   console.log('allEesData',allEesData);
  return (
    <>
      <Head>
        <title>SOP - System Oceny Pracownika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <header>
          <Title>
            System Oceny Pracownika
          </Title>
        </header>
        {allEesData && (
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>Edycja</StyledTh>
              <StyledTh>Symbol</StyledTh>
              <StyledTh>%</StyledTh>
              <StyledTh>Zasada przyznania premii</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
          {allEesData.map(({ _id, symbol, percent, description }) => (
            <StyledTr key={_id}>
              <StyledTd>
                <IconButton size='m' href={`/ees/${encodeURIComponent(_id)}`}>
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
          </StyledTbody>
        </StyledTable>
        )}
      </>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await axios.get('api/ees').catch(error => `Timeout exceeded ${error}`)

  console.log('RES:', res);

  const allEesData = (res && res.data) ? await res.data : []



  return {
    props: {
      allEesData
    }
  }
}

Ees.getLayout = getLayout
export default Ees
