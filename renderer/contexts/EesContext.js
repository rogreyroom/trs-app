import {createContext, useState, useEffect} from 'react';
import useSWR from 'swr';
import {useRouter} from 'next/router';
import {confirmAlert} from 'react-confirm-alert';
import {Alert} from '@/common/Alert';

export const EesContext = createContext();

export const EesProvider = ({children, ...otherProps}) => {
  const router = useRouter();
  const [ees, setEes] = useState([]);
  const [theEes, setTheEes] = useState(null);
  const {data, error} = useSWR('/api/ees');

  useEffect(() => {
    setEes((ees) => data);
  }, [data, ees, theEes]);

  if (error) {
    return (
      <>
        {confirmAlert({
          customUI: ({onClose}) => (
            <Alert
              title="Błąd serwera"
              message="Nie udało pobrać się niezbędnych danych!"
              yesButtonLabel="Zaloguj"
              isNoButtonPresent={false}
              yesAction={() => {
                router.push('/ees');
                onClose();
              }}
            />
          ),
        })}
      </>
    );
  }

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
