import {useRouter} from 'next/router';
import useSWR from 'swr';
import {useContext} from 'react';
import {EesContext} from '@/contexts/EesContext';
import {getLayout} from '@/layouts/TopBarOnlyLayout';
import {Title} from '@/common/Title';
import {IconButton} from '@/common/Buttons';
import {SvgEdit} from '@/icons';
import {StyledTable, StyledThead, StyledTBody, StyledTr, StyledTh, StyledTd} from '@/common/Table';
import {confirmAlert} from 'react-confirm-alert';
import {Alert} from '@/common/Alert';
import Loader from 'react-loader-spinner';
import {StyledSpinnerContainer} from '@/common/CommonWrappers';

const Ees = () => {
  const router = useRouter();
  const [eesData, setEesData] = useContext(EesContext).data;
  // eslint-disable-next-line no-unused-vars
  const [theEes, setTheEes] = useContext(EesContext).ees;

  const {data, error} = useSWR('/api/ees');
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
  if (!data)
    return (
      <StyledSpinnerContainer>
        <Loader type="Puff" color="var(--c-blue-03)" height={100} width={100} />
      </StyledSpinnerContainer>
    );

  setEesData((eesData) => data);

  const handleEditClick = (id) => {
    const singleEesData = eesData.filter((ees) => ees._id === id)[0];
    setTheEes((theEes) => singleEesData);
    router.push('/ees-edit');
  };

  return (
    <>
      <header>
        <Title>System Oceny Pracownika</Title>
      </header>
      {eesData && (
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>Edycja</StyledTh>
              <StyledTh>Symbol</StyledTh>
              <StyledTh>%</StyledTh>
              <StyledTh>Zasada przyznania premii</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTBody>
            {eesData.map(({_id, symbol, percent, description}) => (
              <StyledTr key={_id}>
                <StyledTd>
                  <IconButton size="m" onClickAction={() => handleEditClick(_id)}>
                    <SvgEdit />
                  </IconButton>
                </StyledTd>
                <StyledTd>{symbol}</StyledTd>
                <StyledTd>{percent}%</StyledTd>
                <StyledTd>{description}</StyledTd>
              </StyledTr>
            ))}
          </StyledTBody>
        </StyledTable>
      )}
    </>
  );
};

Ees.getLayout = getLayout;
export default Ees;
