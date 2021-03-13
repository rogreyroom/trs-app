import {useRouter} from 'next/router';
import useSWR from 'swr';
import {getLayout} from '@/layouts/TopBarOnlyLayout';
import {Title} from '@/common/Title';
import {EesForm} from '@/dashboard/Ees';

const EesEdit = () => {
  const router = useRouter();
  const {pid} = router.query || null;
  const {data, error} = useSWR(`/api/ees/${pid}`);

  if (error) return <h1>Something went wrong on the server!</h1>;
  if (!data) return <h1>Loading data from server...</h1>;

  return (
    <>
      <header>
        <Title>System Oceny Pracownika - Edycja</Title>
      </header>
      <EesForm preloadedValues={data} />
    </>
  );
};

EesEdit.getLayout = getLayout;
export default EesEdit;
