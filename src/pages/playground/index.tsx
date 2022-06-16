import { FC } from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;
}

const PlaygroundPage: FC<IProps> = ({ className }) => {
  return <div className={clsx('', className)}></div>;
};

export default PlaygroundPage;
