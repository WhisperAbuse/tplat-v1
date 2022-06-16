import { FC } from 'react';
import clsx from 'clsx';
import toast from 'react-hot-toast';

import { auth, firestore } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

import Input from '@/uikit/Input';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography } from '@mui/material';
import Textarea from '@/uikit/Textarea';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';

interface IProps {
  className?: string;
  id: string;
  num: number;
  testSlug: string;
  onResultDelete: () => void;
  onChangeType?: () => void;
  [restProps: string]: any;
}

const defaultValues = {
  resultHeading: '',
  resultDescription: '',
  answersPercent: '',
};

const ResultCreate: FC<IProps> = ({
  className,
  id,
  num = 1,
  testSlug,
  onResultDelete,
  restProps,
}) => {
  const { formState, register, handleSubmit, setValue } = useForm({
    defaultValues,
  });

  const handleSaveResult = async (values: any) => {
    console.log({ values });

    const uid = auth.currentUser?.uid;

    const testRef = doc(
      collection(
        doc(
          collection(doc(collection(firestore, 'users'), uid), 'tests'),
          testSlug
        ),
        'results'
      ),
      id
    );

    const { reward, description, image, type, questionText } = values;
    const resultDocData = { questionText, type, image, description, reward };

    await setDoc(testRef, resultDocData);

    toast.success(`Результат сохранен`);
  };
  return (
    <form onSubmit={handleSubmit(handleSaveResult)}>
      <div
        className={clsx(
          'flex flex-col items-start gap-4  w-full relative group',
          className
        )}
      >
        <div className="relative w-full p-5 bg-stone-50 border border-solid border-gray-100 shadow-md rounded-md">
          <div className="flex items-center justify-between mb-5">
            <Typography className="text-xl font-semibold text-gray-600 ">
              Результат #{num}
            </Typography>

            <button type="button" onClick={onResultDelete}>
              <CancelIcon className="w-10 h-10 text-red-200 fill-current hover:text-red-500" />
            </button>
          </div>

          <div className="flex flex-col gap">
            <Input
              label="Заголовок результата (максимум 50 символов)"
              {...register('resultHeading')}
              className="w-full"
            />
            <Textarea
              rows={4}
              className="mt-5"
              label="Описание результата (максимум 300 символов)"
              {...register('resultDescription')}
            />

            <div>
              <Input
                label="Процент правильных ответов для получения"
                {...register('answersPercent')}
                className="mt-5 max-w-[320px]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center  gap-2 px-5 py-2 text-white bg-green-500 border border-gray-300 border-solid rounded-md hover:bg-green-600"
            >
              <SaveIcon className="w-5 h-5" />
              Сохранить Результат
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ResultCreate;
