import { FC, forwardRef } from 'react';
import clsx from 'clsx';
import Input from '@/uikit/Input';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography } from '@mui/material';

interface IProps {
  className?: string;
  onDelete: () => void;
  onChangeType: () => void;
  [restProps: string]: any;
}

const AnswerCreate: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ className, onDelete, onChangeType, ...restProps }, ref) => {
    return (
      <div
        className={clsx(
          'py-2 flex items-start gap-2 w-full relative group',
          className
        )}
      >
        <div className="w-full">
          <Typography className="inline-block text-sm font-medium text-gray-700">
            Поле ответа (
            <button
              type="button"
              className="text-gray-500 border-b border-gray-400 border-dashed"
              onClick={onChangeType}
            >
              текстовое
            </button>
            )
          </Typography>
          <Input label="" {...restProps} ref={ref} className="w-full" />
        </div>
        <div className="absolute right-0 hidden group-hover:block top-1">
          <button type="button" onClick={onDelete}>
            <CancelIcon className="w-5 h-5 text-red-500 fill-current" />
          </button>
        </div>
      </div>
    );
  }
);

AnswerCreate.displayName = 'AnswerCreate';

export default AnswerCreate;
