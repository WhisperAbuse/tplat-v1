import { FC, useState } from 'react';
import clsx from 'clsx';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

import Tip from '@/shared/Tip';

import TestProgressBar from '@/shared/TestProgressBar';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import QuestionView from './QuestionView';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface FormValues {
  id: number;
  answer: string;
}

const defaultValues = {
  selectedAnswer: null,
};

interface IProps {
  className?: string;
  testData: DocumentData;
  testRef: DocumentReference;
  sessionRef: DocumentReference;
  questions: DocumentData[];
  onIntroClick: () => void;
}

const TestMain: FC<IProps> = ({
  className,
  testData,
  testRef,
  sessionRef,
  questions,
  onIntroClick,
}) => {
  const [currentQuestionNum, setCurrentQuestion] = useState(1);

  const methods = useForm<FormValues>();

  const saveQuestion = async (values: FormValues) => {
    const answerRef = doc(
      collection(sessionRef, 'answers'),
      questions[currentQuestionNum - 1].id
    );

    const answerData = await setDoc(
      answerRef,
      {
        answer: values.answer,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    if (questions.length === currentQuestionNum) {
      // Last question
      const sessionData = await updateDoc(sessionRef, {
        status: 'finished',
        completedAt: serverTimestamp(),
      });
      toast.success('Тест завершен!', { id: '1' });
    } else {
      goNextQuestion();
    }
  };

  const goNextQuestion = () => {
    setCurrentQuestion((prev) => {
      return Math.min(questions.length, prev + 1);
    });
  };

  const goPrevQuestion = () => {
    setCurrentQuestion((prev) => {
      return Math.max(1, prev - 1);
    });
  };

  return (
    <div className={clsx('mb-10', className)}>
      <TestProgressBar completed={1} total={9} />
      <Container maxWidth="md" className="mt-14 md:mt-20">
        <section className="flex flex-col gap-4 pt-10 mb-10 md:justify-between md:flex-row">
          <div className="w-full">
            <Typography
              component="h1"
              className="mb-4 text-xl font-medium md:text-2xl"
            >
              {testData?.title || `Тест: Насколько хорошо вы знаете ВВС РФ?`}
            </Typography>
            <div className="flex justify-between w-full gap-2">
              <div>
                <Tip>
                  <Typography className="text-sm">
                    {testData?.requirements}
                  </Typography>
                </Tip>
              </div>
              <div className="p-5 bg-gray-100 h-fit min-w-max">
                <Typography className="text-sm">
                  Раздел:{' '}
                  <span className="font-medium text-gray-600">
                    {testData?.category}
                  </span>
                </Typography>
                <Typography className="text-sm ">
                  Кол-во вопросов:{' '}
                  <span className="font-medium text-gray-600">
                    {questions?.length || ''}
                  </span>
                </Typography>
              </div>
            </div>
          </div>
        </section>
        <Button className="mb-5 text-indigo-600" onClick={onIntroClick}>
          Назад к началу
        </Button>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(saveQuestion)}>
            <section>
              <QuestionView
                questionData={questions[currentQuestionNum - 1]}
                testRef={testRef}
                sessionRef={sessionRef}
                testData={testData}
                questionNumber={currentQuestionNum}
              />
            </section>
            <div className="flex justify-between gap-2 mt-10">
              <Button
                type="button"
                className="text-indigo-600"
                onClick={goPrevQuestion}
              >
                Назад
              </Button>

              {questions.length !== currentQuestionNum && (
                <Button
                  type="submit"
                  className="px-3 py-2 text-base text-indigo-600"
                >
                  Следующий вопрос
                </Button>
              )}
            </div>

            {questions.length === currentQuestionNum && (
              <div className="flex justify-center w-full mt-10">
                <Button
                  type="submit"
                  variant="contained"
                  className="w-full max-w-md px-3 py-3 text-base text-white normal-case bg-indigo-600"
                >
                  Ответить и завершить тест
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
      </Container>
    </div>
  );
};

export default TestMain;
