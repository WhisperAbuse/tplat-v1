import { FC } from 'react';
import clsx from 'clsx';
import Dropzone from './Dropzone';

interface IProps {
  className?: string;
  uploadImage: (e: any) => any;
  [restProps: string]: any;
}

const ImageDropzone: FC<IProps> = ({
  className,
  uploadImage,
  ...restProps
}) => {
  return (
    <div className={clsx('', className)}>
      <Dropzone
        onFileChange={uploadImage}
        accept="image/x-png,image/gif,image/jpeg"
        {...restProps}
      />
    </div>
  );
};

export default ImageDropzone;
