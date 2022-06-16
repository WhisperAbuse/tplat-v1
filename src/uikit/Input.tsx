import { FC, forwardRef } from 'react';
import clsx from 'clsx';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

interface IProps {
  className?: string;
  error?: string;
  label?: string;
  [restProps: string]: any;
}

const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(
  ({ className, label, error, ...restProps }, ref) => {
    return (
      <div className={clsx('', className)}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            className="block w-full h-10 px-3 text-gray-700 placeholder-gray-300 border border-gray-300 border-solid rounded-md focus:outline-none sm:text-sm"
            {...restProps}
            ref={ref}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ExclamationCircleIcon
                className="w-5 h-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
