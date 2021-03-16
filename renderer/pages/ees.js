import {useRouter} from 'next/router';
import useSWR from 'swr';
import {useContext} from 'react';
import {EesContext} from '@/contexts/EesContext';
import {getLayout} from '@/layouts/TopBarOnlyLayout';
import {Title} from '@/common/Title';
import {IconButton} from '@/common/Buttons';
import {SvgEdit} from '@/icons';
import {StyledTable, StyledThead, StyledTBody, StyledTr, StyledTh, StyledTd} from '@/common/Table';

const Ees = () => {
  const router = useRouter();
  const [eesData, setEesData] = useContext(EesContext).data;
  // eslint-disable-next-line no-unused-vars
  const [theEes, setTheEes] = useContext(EesContext).ees;

  const {data, error} = useSWR('/api/ees');
  if (error) return <h1>Something went wrong on the server!</h1>;
  if (!data) return <h1>Loading data from server...</h1>;

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
