import { AppContainer } from '@/components/AppContainer'

const LoginLayout = ({ children }) => {
  return (
    <AppContainer login>
        { children }
    </AppContainer>
  )
}

export const getLayout = page => <LoginLayout>{page}</LoginLayout>

export default LoginLayout