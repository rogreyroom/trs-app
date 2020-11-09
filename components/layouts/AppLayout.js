import styled from 'styled-components'
import { TopBar } from '../TopBar'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  min-height: 100vh;
  background: var(--g-page);
`
const StyledMain = styled.main`
  width: 100%;
  min-height: 100%;
  margin-top: var(--xs);
  flex: 1;
  padding: 0 var(--xl) var(--xl) var(--xl);
`

const AppLayout = ({ children }) => {
  return (
    <AppContainer>
      <TopBar />
      <StyledMain>
        { children }
      </StyledMain>
    </AppContainer>
  )
}

export const getLayout = page => <AppLayout>{page}</AppLayout>

export default AppLayout