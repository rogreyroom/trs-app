import {Header} from '@/components/TheTopBar';
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
      <Main>{children}</Main>
    </SWRConfig>
  </AppContainer>
);

export const getLayout = (page) => <TopBarOnlyLayout>{page}</TopBarOnlyLayout>;

export default TopBarOnlyLayout;
