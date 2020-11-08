import { getLayout as getAppLayout } from './app'

const MainLayout = ({ children }) => {
  return (
    <>
      <h1>Main Layout</h1>
      { children }
    </>
  )
}


export const getLayout = page =>
  getAppLayout(<MainLayout>{page}</MainLayout>)

export default MainLayout