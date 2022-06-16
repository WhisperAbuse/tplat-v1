import { FC } from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;
  show: boolean;
}

const Loader: FC<IProps> = ({ className, show }) => {
  return show ? <div className={clsx('loader', className)}></div> : null;
};

export default Loader;
