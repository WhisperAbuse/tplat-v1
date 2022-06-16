import { StatusKey, statusNamesMap } from '@/constants/statuses';
import { Typography } from '@mui/material';
import { DocumentData } from 'firebase/firestore';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface IProps {
  testData: DocumentData;
}

const TestTemplateCard: FC<IProps> = ({ testData }) => {
  const createdAt =
    typeof testData?.updatedAt === 'number'
      ? new Date(testData.updatedAt)
      : testData?.updatedAt?.toDate();

  const updatedDate = moment(createdAt).format('LL');

  return (
    <div className="overflow-hidden border border-gray-200 border-solid rounded-md shadow-sm bg-gray-50">
      {testData.titleImage && (
        <div className="relative w-full h-48">
          <Image src={testData.titleImage} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="flex flex-col justify-between px-4 py-3">
        <div>
          <Link href={`/tests/create/${testData.slug}`}>
            <a className="inline cursor-pointer">
              <Typography
                component="h2"
                className="inline text-lg text-gray-900 hover:text-blue-600"
              >
                {testData.title}
              </Typography>
            </a>
          </Link>
          <Typography component="p" className="mt-1 text-sm text-gray-400">
            Обновлено: {updatedDate}
          </Typography>
          {testData.status && (
            <div className="px-4 bg-blue-100 py-0.5 mt-2 rounded-full w-fit shadow-sm">
              <Typography
                component="p"
                className="text-sm font-medium text-gray-700"
              >
                {statusNamesMap[testData.status as StatusKey]}
              </Typography>
            </div>
          )}
        </div>

        <div className="mt-6">
          {testData.status === 'to_be_filled' && (
            <Link href={`/tests/create/${testData.slug}`}>
              <a className="inline-block px-5 py-2 text-white bg-indigo-600 rounded-md w-fit hover:bg-indigo-700">
                Заполнить
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestTemplateCard;
