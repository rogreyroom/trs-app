import {useState, useEffect} from 'react';
import useSWR from 'swr';
import {Title} from '@/common/Title';
import {Button} from '@/common/Buttons';
import {
  StyledResponsibilitiesPage,
  ResponsibilitiesDataSection,
  ResponsibilitiesFormSection,
} from './styles';
import ResponsibilitiesFormAdd from './AddForm';
import ResponsibilitiesFormEdit from './EditForm';

const ResponsibilitiesPage = ({employeeId}) => {
  const [showForm, setShowForm] = useState(false);
  const {data, error} = useSWR(`/api/responsibilities/${employeeId}`);

  if (error) return <h1>Something went wrong on the server!</h1>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const hideForm = () => {
      setShowForm((showForm) => false);
    };
    data && showForm && hideForm();
    return () => {
      hideForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  console.log(data, showForm);

  return (
    <StyledResponsibilitiesPage>
      <Title isWhite>Zakres obowiązków</Title>
      <Button onClickAction={() => setShowForm((showForm) => true)}>
        {(data && 'Edytuj') || 'Dodaj'}
      </Button>
      <ResponsibilitiesDataSection>
        <p>{data && data.text}</p>
      </ResponsibilitiesDataSection>
      <ResponsibilitiesFormSection>
        {data && showForm ? (
          <ResponsibilitiesFormEdit id={employeeId} text={data} />
        ) : (
          (showForm && <ResponsibilitiesFormAdd id={employeeId} />) || null
        )}
      </ResponsibilitiesFormSection>
    </StyledResponsibilitiesPage>
  );
};

export default ResponsibilitiesPage;
