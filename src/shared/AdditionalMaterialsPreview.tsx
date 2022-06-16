import { FC } from 'react';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
interface IProps {
  className?: string;
}

const AdditionalMaterialsPreview: FC<IProps> = ({ className }) => {
  return (
    <div className={clsx('"mb-6 md:mb-10', className)}>
      <Typography className="font-medium md:text-lg">
        Дополнительные материалы:
      </Typography>
      <div className="flex gap-5 mt-2 mb-1">
        <div className="relative w-24 h-24">
          <Image
            src="/test/test-material-1.jpg"
            layout="fill"
            objectFit="cover"
            alt="material preview 1"
          />
        </div>
        <div className="relative w-24 h-24">
          <Image
            src="/test/test-material-1.jpg"
            layout="fill"
            objectFit="cover"
            alt="material preview 1"
          />
        </div>

        <div className="flex items-center justify-center w-24 h-24 bg-gray-800">
          <Typography className="text-xl text-white cursor-pointer">
            +5
          </Typography>
        </div>
      </div>
      <Typography className="text-sm font-medium text-blue-700">
        просмотреть все
      </Typography>
    </div>
  );
};

export default AdditionalMaterialsPreview;
