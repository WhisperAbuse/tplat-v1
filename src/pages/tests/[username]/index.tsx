import { FC } from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;
}

const UserTestListPage: FC<IProps> = ({ className }) => {
  return <div className={clsx('', className)}>User tests</div>;
};

export default UserTestListPage;
