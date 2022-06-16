import { FC } from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;
  completed: number;
  total: number;
}

const TestProgressBar: FC<IProps> = ({ className, completed, total }) => {
  const percentagesFull = ((completed * 100) / total).toFixed(0);

  return (
    <div className={clsx('w-full h-2', className)}>
      <div className="w-full h-full bg-gray-100">
        <div
          style={{ width: `${percentagesFull}%` }}
          className="h-full transition-all duration-150 ease-in-out bg-green-500"
        />
      </div>
    </div>
  );
};

export default TestProgressBar;
