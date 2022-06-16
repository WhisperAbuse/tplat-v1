import { FC } from 'react';
import clsx from 'clsx';
import CreateTestStart from '@/views/CreateTest/CreateTestStart';

interface IProps {
  className?: string;
}

const CreateTestPage: FC<IProps> = ({ className }) => {
  return (
    <div className={clsx('', className)}>
      <CreateTestStart />
    </div>
  );
};

export default CreateTestPage;
