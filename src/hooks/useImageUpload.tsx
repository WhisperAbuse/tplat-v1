import { useState } from 'react';

import { uploadFile } from '@/utils/uploadImage';

type UploadFileFunc = (file: File) => Promise<void>;

interface IReturn {
  uploading: boolean;
  downloadURL: string | null;
  handleUploadFile: UploadFileFunc;
}

const useImageUpload = (): IReturn => {
  const [uploading, setUploading] = useState<boolean>(false);

  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const handleStart = () => {
    setUploading(true);
  };

  const handleFinish = () => {
    setUploading(false);
  };

  const handleUploadFile: UploadFileFunc = async (file: File) => {
    const downloadURL = await uploadFile(file, handleStart, handleFinish);
    setDownloadURL(downloadURL);
  };

  return { uploading, downloadURL, handleUploadFile };
};

export default useImageUpload;
