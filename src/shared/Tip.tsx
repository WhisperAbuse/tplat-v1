import { FC } from 'react';
import clsx from 'clsx';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface IProps {
  className?: string;
  children: any;
}

const Tip: FC<IProps> = ({ className, children }) => {
  return (
    <div className={clsx('bg-blue-50 flex gap-2 p-3 rounded-md', className)}>
      <ErrorOutlineIcon className="text-blue-600 fill-current" />
      {children}
    </div>
  );
};

export default Tip;
