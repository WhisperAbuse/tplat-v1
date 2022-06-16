import AuthCheck from '@/shared/AuthCheck';
import EditTestView from '@/views/EditTest';

const EditTestPage = () => {
  return (
    <AuthCheck>
      <EditTestView />;
    </AuthCheck>
  );
};

export default EditTestPage;

export async function getServerSideProps() {
  return {
    props: {},
  };
}
