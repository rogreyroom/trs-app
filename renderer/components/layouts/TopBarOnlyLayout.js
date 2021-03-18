import {Header} from '@/components/TheTopBar';
import {EesProvider} from '@/contexts/EesContext';
import {Main} from '@/components/TheDashboard/Main';
import {SWRConfig} from 'swr';
import {axios} from '@/lib/axios-config';
import {AppContainer} from './AppContainer';

const TopBarOnlyLayout = ({children}) => (
  <AppContainer>
    <Header />
    <SWRConfig
      value={{
        refreshInterval: 2000,
        fetcher: (...args) => axios.get(...args).then((res) => res.data),
      }}
    >
      <EesProvider>
        <Main>{children}</Main>
      </EesProvider>
    </SWRConfig>
  </AppContainer>
);

export const getLayout = (page) => <TopBarOnlyLayout>{page}</TopBarOnlyLayout>;

export default TopBarOnlyLayout;
