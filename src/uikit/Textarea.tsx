import { FC, forwardRef } from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;
  label?: string;
  hint?: string;
  rows?: number;
  [restProps: string]: any;
}

const Textarea: FC<IProps> = forwardRef<HTMLTextAreaElement, IProps>(
  ({ className, label, hint, rows, ...restProps }, ref) => {
    return (
      <div className={clsx('', className)}>
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="mt-1">
          <textarea
            rows={rows ?? 5}
            className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:shadow-md sm:text-sm"
            {...restProps}
            ref={ref}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">{hint}</p>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
