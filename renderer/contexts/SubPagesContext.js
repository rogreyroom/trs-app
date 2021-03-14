import {createContext, useState} from 'react';

export const SubPagesContext = createContext();

export const SubPagesProvider = ({children}) => {
  const [page, setPage] = useState(null);

  return (
    <SubPagesContext.Provider value={{page: [page, setPage]}}>{children}</SubPagesContext.Provider>
  );
};
