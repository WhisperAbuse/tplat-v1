import { FC, useState } from 'react';
import clsx from 'clsx';
import { useFieldArray, useForm } from 'react-hook-form';
import Input from '@/uikit/Input';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Textarea from '@/uikit/Textarea';
import AnswerCreate from './AnswerCreate';
import toast from 'react-hot-toast';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { auth, firestore } from '@/lib/firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';

interface Answer {
  answerId: number;
  text: string;
}

interface FormValues {
  questionText: string;
  type: string;
  description: string;
  reward: number;
  answers: Answer[];
  image: null | string;
}

const defaultValues: FormValues = {
  questionText: '',
  type: 'radio',
  description: '',
  reward: 1,
  answers: [{ answerId: 1, text: '' }],
  image: null,
};

interface IProps {
  id: string;
  className?: string;
  num?: number;
  testSlug: string;
  onQuestionDelete: () => void;
}

const CreateQuestionForm: FC<IProps> = ({
  id,
  className,
  num = 1,
  testSlug,
  onQuestionDelete,
}) => {
  const { formState, control, register, handleSubmit, setValue } =
    useForm<FormValues>({
      defaultValues,
    });

  const {
    fields: answers,
    append,
    remove,
  } = useFieldArray<FormValues>({
    control,
    name: 'answers',
  });

  const handleAnswerDelete = (index: number) => {
    if (answers.length > 1) {
      remove(index);
    } else {
      toast.error('Упс, нельзя удалить последний ответ', { id: '1' });
    }
  };

  const handleAnswerAdd = () => {
    const id =
      answers.length > 0 ? answers[answers.length - 1].answerId + 1 : 1;
    const answer = {
      answerId: id,
      text: '',
    };

    append(answer);
  };

  const handleChangeAnswerType = () => {};

  const handleSaveQuestion = async (values: any) => {
    console.log({ values, answers });

    const uid = auth.currentUser?.uid;

    const batch = writeBatch(firestore);

    const testRef = doc(
      collection(
        doc(
          collection(doc(collection(firestore, 'users'), uid), 'tests'),
          testSlug
        ),
        'questions'
      ),
      id
    );

    const { reward, description, image, type, questionText } = values;
    const questionDocData = {
      id,
      questionText,
      type,
      image,
      description,
      reward,
    };

    batch.set(testRef, questionDocData);
    answers.forEach((ans: any) => {
      const answerRef = doc(
        collection(testRef, 'answers'),
        ans.answerId.toString()
      );
      batch.set(answerRef, { id: ans.answerId, text: ans?.text || '' });
    });

    await batch.commit();

    toast.success(`Вопрос сохранен`);
  };

  const handleChangeQuestionType = (type: string) => {
    setValue('type', type);
  };

  return (
    <form
      className={clsx(
        'border border-solid  border-gray-100 shadow-md rounded-md',
        className
      )}
      onSubmit={handleSubmit(handleSaveQuestion)}
    >
      <div className="px-5 pt-5 pb-10 bg-stone-50">
        <div className="flex items-center justify-between mb-5">
          <Typography className="text-xl font-semibold text-gray-600">
            Вопрос #{num}
          </Typography>
          <button type="button" onClick={onQuestionDelete}>
            <CancelIcon className="w-10 h-10 text-red-200 fill-current hover:text-red-500" />
          </button>
        </div>
        <Input label="Текст вопроса" {...register('questionText')} />

        <FormControl className="mt-3">
          <FormLabel className="text-sm font-medium text-gray-700">
            Тип вопроса
          </FormLabel>
          <RadioGroup
            aria-labelledby="test-type-radio-group"
            defaultValue="radio"
            onChange={(e) => handleChangeQuestionType(e.target.value)}
          >
            <FormControlLabel
              value="radio"
              control={<Radio className="py-1 text-indigo-600" />}
              label="Только один вариант ответа"
              className="text-base text-gray-800 "
            />
            <FormControlLabel
              value="checkbox"
              control={<Radio className="py-1 text-indigo-600" />}
              label="Возможны несколько вариантов ответа"
              className="text-base text-gray-800"
            />
          </RadioGroup>
        </FormControl>
        <Textarea
          rows={1}
          className="mt-5"
          label="Подробное описание (Необязательно)"
          {...register('description')}
        />
      </div>
      <div className="px-5 py-5 bg-stone-100">
        <Typography className="mb-1 text-base font-semibold text-gray-700">
          Варианты ответа
        </Typography>
        <div className="divide-y-2 divide divide-stone-300 divide-dashed">
          {answers.map((answer, index) => (
            <AnswerCreate
              answer={answer}
              key={index}
              onDelete={() => handleAnswerDelete(index)}
              onChangeType={() => handleChangeAnswerType()}
              {...register(`answers.${index}.text`)}
            />
          ))}
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="px-5 py-2 text-white bg-indigo-500 border border-gray-300 border-solid rounded-md hover:bg-indigo-600"
            onClick={handleAnswerAdd}
          >
            Добавить вариант ответа
          </button>
        </div>
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 text-white bg-green-500 border border-gray-300 border-solid rounded-md hover:bg-green-600"
          >
            <SaveIcon className="w-5 h-5" />
            Сохранить вопрос
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateQuestionForm;
