import Head from 'next/head'
import { getLayout } from '@/layouts/LoginLayout'
import { Login } from '@/components/TheLogin'
import styled from 'styled-components';

const Panel = styled.section`
  background-image: var(--g-panel);
  box-shadow: var(--s-panel);
  padding: var(--xl);
  display: flex;
  flex-direction: column;
  max-width: 50vw;

  & h1 {
    font-size: var(--xl);
    color: var(--c-accent);
    margin: 0;
  }
`

const Index = () => {
  return (
    <>
      <Head>
        <title>Home - login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Panel>
        <h1>Login</h1>
        <Login />
      </Panel>
    </>
  )
}

Index.getLayout = getLayout
export default Index