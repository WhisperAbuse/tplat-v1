import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import TestStart from './TestStart';
import { TestProgressState } from 'src/types';
import TestMain from './TestMain';
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

interface IProps {
  className?: string;
}

const UserTestView: FC<IProps> = ({ className }) => {
  const [testProgress, setTestProgress] =
    useState<TestProgressState>('not_started');

  const router = useRouter();
  const [sessionRef, setSessionRef] = useState<DocumentReference | null>(null);
  const { slug, username } = router.query;
  const testRef = doc(
    collection(
      doc(collection(firestore, 'users'), auth.currentUser?.uid as string),
      'tests'
    ),
    slug as string
  );
  const [testData, testDataLoading] = useDocumentData<DocumentData>(testRef);

  const questionsRef = collection(testRef, 'questions');
  const [questionsData, questionsLoading] = useCollection(questionsRef);

  const questions = questionsData?.docs.map((doc) => doc.data()) || [];

  const handleStart = async () => {
    setTestProgress('started');
    const sessionRef = await addDoc(
      collection(
        doc(collection(firestore, 'users'), auth.currentUser?.uid),
        'sessions'
      ),
      {
        startedAt: serverTimestamp(),
        status: 'started',
      }
    );
    setSessionRef(sessionRef);
    scrollToTop();
  };

  const isLoading = testDataLoading || questionsLoading;

  const handleGoIntro = () => {
    setTestProgress('not_started');
    scrollToTop();
  };

  const scrollToTop = (smooth: boolean = true) => {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <div className={clsx('', className)}>
      {testData && questions ? (
        <>
          {testProgress === 'not_started' && (
            <TestStart
              onContinue={handleStart}
              testData={testData}
              questions={questions}
            />
          )}
          {sessionRef && testProgress === 'started' && (
            <TestMain
              onIntroClick={handleGoIntro}
              testRef={testRef}
              sessionRef={sessionRef}
              testData={testData}
              questions={questions}
            />
          )}
        </>
      ) : isLoading ? (
        'Загрузка...'
      ) : (
        <p className="p-10 text-xl font-semibold">Тест не найден</p>
      )}
    </div>
  );
};

export default UserTestView;
