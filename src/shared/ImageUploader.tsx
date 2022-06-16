import { FC, useState } from 'react';
import clsx from 'clsx';
import Loader from './Loader';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '@/lib/firebase';
import useImageUpload from 'hooks/useImageUpload';

interface IProps {
  className?: string;
}

const ImageUploader: FC<IProps> = ({ className }) => {
  const { uploading, downloadURL, handleUploadFile } = useImageUpload();

  const uploadImage = async (e: any) => {
    const file = Array.from(e.target.files)[0] as File;
    handleUploadFile(file);
  };

  return (
    <div className={clsx('box', className)}>
      <Loader show={uploading} />

      {!uploading && (
        <label className="btn">
          📷 Upload img
          <input
            type="file"
            onChange={uploadImage}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </label>
      )}

      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
};

export default ImageUploader;
