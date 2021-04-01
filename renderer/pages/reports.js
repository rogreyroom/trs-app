import Head from 'next/head';
import {getLayout} from '@/layouts/TopBarOnlyLayout';
import {ReportsHr} from '@/subPages/Reports/ReportsHr';

const Reports = () => (
  <>
    <Head>
      <title>Raporty dla HR</title>
    </Head>
    <ReportsHr />
  </>
);

Reports.getLayout = getLayout;
export default Reports;
