import { FC } from 'react';
import clsx from 'clsx';
import { StarIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface IProps {
  className?: string;
}

const TestPreviewCard: FC<IProps> = ({ className }) => {
  return (
    <div className="bg-white divide-y divide-gray-200 rounded-lg shadow">
      <div className="flex items-center justify-between w-full p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-sm font-medium text-gray-900 truncate">Тест</h3>
            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              XX век
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 truncate">Знание ВС РФ</p>
        </div>
      </div>
      <div>
        <div className="flex -mt-px divide-x divide-gray-200">
          <div className="flex flex-1 w-0">
            <Link href="/tests/igoryan/any/">
              <a className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500">
                <span className="">Пройти тест</span>
              </a>
            </Link>
          </div>
          <div className="flex flex-1 w-0 -ml-px">
            <a className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500">
              <StarIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">В избранное</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPreviewCard;
