import {createContext, useState, useEffect} from 'react';
import useSWR from 'swr';

export const EesContext = createContext();

export const EesProvider = ({children, ...otherProps}) => {
  const [ees, setEes] = useState([]);
  const [theEes, setTheEes] = useState(null);
  const {data, error} = useSWR('/api/ees');

  useEffect(() => {
    setEes((ees) => data);
  }, [data, ees, theEes]);

  if (error) return <h1>Something went wrong on the server!</h1>;
  // if (!data) return <h1>Loading data from server!!!...</h1>

  return (
    <EesContext.Provider
      value={{
        data: [ees, setEes],
        ees: [theEes, setTheEes],
      }}
    >
      {children}
    </EesContext.Provider>
  );
};
