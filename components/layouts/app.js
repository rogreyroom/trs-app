const AppLayout = ({ children }) => {
  return (
    <>
      <h1>App Layout</h1>
      { children }
    </>
  )
}

export const getLayout = page => <AppLayout>{page}</AppLayout>

export default AppLayout