import { FC } from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;
  imgSrc: string;
}

const MaterialImageLoadPreview: FC<IProps> = ({ className, imgSrc }) => {
  return (
    <div
      className={clsx(
        'h-[140px] w-full border-2 border-gray-300 border-dashed rounded-md mt-1',
        className
      )}
    >
      <img src={imgSrc} className="object-contain w-full h-full" />
    </div>
  );
};

export default MaterialImageLoadPreview;
