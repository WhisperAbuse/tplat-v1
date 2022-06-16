import { FC, useEffect } from 'react';
import clsx from 'clsx';
import { Box, Button, Typography } from '@mui/material';
import AdditionalMaterialsPreview from '@/shared/AdditionalMaterialsPreview';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { useFormContext, useWatch } from 'react-hook-form';

interface IProps {
  className?: string;
  testRef: DocumentReference;
  sessionRef: DocumentReference;
  testData: DocumentData;
  questionData: DocumentData;
  questionNumber: number;
}

const QuestionView: FC<IProps> = ({
  className,
  testRef,
  sessionRef,
  testData,
  questionData,
  questionNumber,
}) => {
  console.log({ testData, questionData, questionNumber });

  const { register, getValues, watch } = useFormContext();

  const answersRef = collection(
    doc(collection(testRef, 'questions'), questionData.id),
    'answers'
  );

  const [answersCollection] = useCollectionData(answersRef);
  console.log('answersCollection', answersCollection);

  const registeredRadioAnswer = register('answer', { required: true });
  const formValues = getValues();

  useWatch({ name: 'answer' });

  useEffect(() => {
    updateDoc(sessionRef, { currentQuestion: questionData.id });
  }, []);

  return (
    <div className={clsx('', className)}>
      <Box className="p-5 bg-gray-100 md:p-10">
        <Typography
          component="h2"
          className="mb-2 text-xl font-medium md:text-2xl"
        >
          Вопрос {questionNumber}:{' '}
          {questionData?.questionText || `Сколько было истребителей?`}
        </Typography>
        <div className="mb-5">
          <Typography className="mb-2 text-base">
            {questionData?.description ||
              `Более детальное описание теста, которое может занимать несколько
              строчек. But I must explain to you how all this mistaken idea of
              denouncing pleasure and praising pain was born and I will give you
              a complete account of the system, and expound the actual teachings
              of the great explorer of the truth, the master-builder of human
              happiness. No one rejects, dislikes, or avoids pleasure itself`}
          </Typography>
          <Typography className="text-sm text-gray-600">
            Кол-во баллов: {questionData?.score || 1}
          </Typography>
        </div>
        <AdditionalMaterialsPreview />
      </Box>
      <Box className="mt-10">
        <Typography
          component="h2"
          className="mb-3 text-base font-medium md:text-2xl"
        >
          Выберите ответ:
        </Typography>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
          {answersCollection
            ?.filter((ans) => ans.text)
            .map((ans) => (
              <div className="h-full" key={ans.id}>
                <label
                  className={clsx(
                    'flex items-center h-full max-w-md gap-3 px-4 py-6 text-base border border-solid border-stone-200 bg-stone-100 text-gray-700 rounded-md cursor-pointer ',
                    ans.id.toString() === formValues.answer
                      ? 'shadow-lg bg-indigo-500 text-white'
                      : 'shadow-md'
                  )}
                >
                  <input
                    type="radio"
                    {...registeredRadioAnswer}
                    value={ans.id}
                  />
                  <span className="font-medium">{ans.text}</span>
                </label>
              </div>
            ))}
        </div>
      </Box>
    </div>
  );
};

export default QuestionView;
