import Head from 'next/head'
import { axios } from '../../lib/axios-config'
import styled from 'styled-components'
import AppLayout from '../../components/layouts/AppLayout'
import { Title } from '../../components/Title'
import { IconButton } from '../../components/IconButton'
import { SvgEdit } from '../../components/Icons/EditIcon'

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const StyledThead = styled.thead`
  border-bottom: 1px solid var(--c-blue-03);
`

const StyledTh = styled.th`
  color: var(--c-white);
  font-weight: var(--fw-normal);
  font-size: var(--fs-text);
  line-height: var(--lh-large);
  text-align: center;
  padding: var(--xs) var(--normal);

  &:last-child {
    text-align: left;
  }
`

const StyledTbody = styled.tbody`
  &::before {
    content: '';
    display: block;
    height: var(--normal);
    width: 100%;
  }
`

const StyledTr = styled.tr`
  border-bottom: 1px solid var(--c-blue-01);
`

const StyledTd = styled.td`
  color: var(--c-white);
  font-weight: var(--fw-light);
  font-size: var(--fs-text);
  text-align: center;
  padding: var(--xs) var(--normal);
  margin: var(--xxs) 0;

  &:first-child > * {
    margin: 0 auto;
  }

  &:last-child {
    text-align: left;
  }
`

export default function Ees({ allEesData }) {
  return (
    <>
      <Head>
        <title>SOP - System Oceny Pracownika</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
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
      </AppLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await axios.get('api/ees').catch(error => `Timeout exceeded ${error}`)
  const allEesData = (res && res.data) ? await res.data : []

  return {
    props: {
      allEesData
    }
  }
}
