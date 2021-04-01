import Head from 'next/head';
import {getLayout} from '@/layouts/TopBarOnlyLayout';
import {Title} from '@/common/Title';
import {EesForm} from '@/dashboard/Ees';

const EesEdit = () => (
  <>
    <Head>
      <title>System oceny pracownika - edycja</title>
    </Head>
    <header>
      <Title>System Oceny Pracownika - Edycja</Title>
    </header>
    <EesForm />
  </>
);
EesEdit.getLayout = getLayout;
export default EesEdit;
