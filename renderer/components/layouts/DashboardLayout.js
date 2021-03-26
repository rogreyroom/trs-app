import {DashboardProvider} from '@/contexts/DashboardContext';
import {Header} from '@/components/TheTopBar';
import {SWRConfig} from 'swr';
import {axios} from '@/lib/axios-config';
import {AppContainer} from './AppContainer';

const DashboardLayout = ({children}) => (
  <AppContainer dashboard>
    <Header />
    <SWRConfig
      value={{
        fetcher: (...args) => axios.get(...args).then((res) => res.data),
      }}
    >
      <DashboardProvider>{children}</DashboardProvider>
    </SWRConfig>
  </AppContainer>
);

export const getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardLayout;
