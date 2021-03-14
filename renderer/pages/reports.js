import {getLayout} from '@/layouts/TopBarOnlyLayout';
import {ReportsHr} from '@/subPages/Reports/ReportsHr';

const Reports = () => (
  <>
    <ReportsHr />
  </>
);

Reports.getLayout = getLayout;
export default Reports;
