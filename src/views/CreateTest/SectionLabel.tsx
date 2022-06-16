import { FC } from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;
  children: any;
}

const SectionLabel: FC<IProps> = ({ className, children }) => {
  return (
    <div className={clsx('text-base text-gray-700', className)}>{children}</div>
  );
};

export default SectionLabel;
