import { FC } from 'react';
import clsx from 'clsx';
import { Container, Typography } from '@mui/material';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import TestTemplateCard from './TestTemplateCard';

interface IProps {
  userId: string;
}

const AllTestsView: FC<IProps> = ({ userId }) => {
  const testsRef = collection(
    doc(collection(firestore, 'users'), userId),
    'tests'
  );

  const [testTemplates] = useCollection(testsRef);

  return (
    <div className="">
      <Container maxWidth="lg" className="mt-10">
        <div>
          <Typography className="text-3xl font-medium text-gray-900 ">
            Шаблоны
          </Typography>
          <Typography className="mt-1 text-base text-gray-600">
            Ваши шаблоны тестов
          </Typography>
        </div>
        <div className="grid gap-10 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {(testTemplates?.docs || []).map((test) => {
            const testData = test.data();

            return <TestTemplateCard key={testData.slug} testData={testData} />;
          })}
        </div>
      </Container>
    </div>
  );
};

export default AllTestsView;
