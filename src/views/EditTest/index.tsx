import { FC, useState } from 'react';
import clsx from 'clsx';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
} from '@mui/material';
import Input from '@/uikit/Input';
import CreateQuestionForm from './CreateQuestionForm';
import { PlusCircleIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import ResultCreate from './CreateResultForm';
import Link from 'next/link';
import { auth } from '@/lib/firebase';

import EditStartForm from './EditStartForm';
import { useUserData } from '@/lib/hooks';

interface IProps {
  className?: string;
}

interface Question {
  id: string;
}

const EditTestView: FC<IProps> = ({ className }) => {
  const router = useRouter();
  const testSlug = router?.query?.slug as string;

  const { username } = useUserData();
  const [results, setResults] = useState([{ id: '1' }]);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
    },
  ]);

  const handleQuestionDelete = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((answer) => answer.id !== id));
    } else {
      toast.error('Упс, нельзя удалить последний вопрос', { id: '1' });
    }
  };

  const handleQuestionAdd = () => {
    setQuestions((prevAnswers) => {
      const id = (
        prevAnswers.length > 0
          ? parseInt(prevAnswers[prevAnswers.length - 1].id) + 1
          : 1
      ).toString();

      return [
        ...prevAnswers,
        {
          id,
          text: '',
        },
      ];
    });
  };

  const handleResultDelete = (id: string) => {
    if (results.length > 1) {
      setResults(results.filter((result) => result.id !== id));
    } else {
      toast.error('Упс, нельзя удалить последний результат', { id: '1' });
    }
  };

  const handleResultAdd = () => {
    setResults((prevResults) => {
      const id = (
        prevResults.length > 0
          ? parseInt(prevResults[prevResults.length - 1].id) + 1
          : 1
      ).toString();

      return [
        ...prevResults,
        {
          id,
          text: '',
        },
      ];
    });
  };

  return (
    <div className={clsx('pt-10 pb-20', className)}>
      <Container maxWidth="md">
        <div className="flex justify-between gap-2">
          <Typography className="text-3xl font-semibold">
            Создание теста
          </Typography>
          <Link href={`/tests/${username}/${testSlug}`}>
            <a target={'_blank'}>
              <Button className="text-indigo-600">Предпросмотр</Button>
            </a>
          </Link>
        </div>
        <div className="mt-10">
          <EditStartForm />
        </div>

        <div className="mt-10">
          <Typography className="mb-4 text-2xl font-semibold text-gray-800">
            Вопросы
          </Typography>
          <div className="flex flex-col gap-10">
            {questions.map((q, index) => (
              <CreateQuestionForm
                id={q.id}
                key={q.id}
                num={index + 1}
                testSlug={testSlug}
                onQuestionDelete={() => handleQuestionDelete(q.id)}
              />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <Typography className="text-sm text-gray-600">
            <span className="font-medium">Всего вопросов:</span>{' '}
            {questions.length}
          </Typography>
        </div>
        <div className="mt-10">
          <button
            className="flex items-center justify-center w-full gap-2 p-3 text-white bg-indigo-600 border border-gray-300 border-solid rounded-md hover:bg-indigo-700"
            onClick={handleQuestionAdd}
          >
            Добавить вопрос{' '}
            <PlusCircleIcon className="w-5 h-5 mt-0.5 text-white stroke-current" />
          </button>
        </div>

        <div className="mt-14">
          <Typography fontSize={24} className="mb-4 font-medium text-gray-700">
            Результаты
          </Typography>

          <div className="flex flex-col mb-4 ">
            <FormControlLabel
              value="checkbox"
              control={<Checkbox className="py-1 text-indigo-600" />}
              label="Показывать количество правильных ответов"
              className="text-base text-gray-800"
            />

            <FormControlLabel
              value="checkbox"
              control={<Checkbox className="py-1 text-indigo-600" />}
              label="Показывать баллы"
              className="text-base text-gray-800"
            />

            <FormControlLabel
              value="checkbox"
              control={<Checkbox className="py-1 text-indigo-600" />}
              label="Показывать правильные/неправильные ответы"
              className="text-base text-gray-800"
            />
          </div>

          <div className="flex flex-col gap-10">
            {results.map((r, index) => (
              <ResultCreate
                id={r.id}
                key={r.id}
                num={index + 1}
                testSlug={testSlug}
                onResultDelete={() => handleResultDelete(r.id)}
              />
            ))}
          </div>

          <Typography className="mt-4 mb-10 text-sm text-gray-600">
            <span className="font-medium">Всего результатов:</span>{' '}
            {results.length}
          </Typography>

          <div className="mt-4">
            <button
              className="flex items-center justify-center w-full gap-2 p-3 text-white bg-indigo-600 border border-gray-300 border-solid rounded-md hover:bg-indigo-700"
              onClick={handleResultAdd}
            >
              Добавить результат{' '}
              <PlusCircleIcon className="w-5 h-5 mt-0.5 text-white stroke-current" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditTestView;
