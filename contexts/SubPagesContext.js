import { createContext, useState } from 'react'

export const SubPagesContext = createContext()

export const SubPagesProvider = ({ children }) => {
  const [page, setPage] = useState(null)
  const [isClicked, setIsClicked] = useState(false)

  return (
    <SubPagesContext.Provider value={[page, setPage], [isClicked, setIsClicked]}>
        { children }
    </SubPagesContext.Provider>
  )
}
