import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '@/lib/firebase';

type UploadFileFunc = (
  file: File,
  onStart: () => void,
  onFinish: () => void
) => Promise<string>;

export const uploadFile: UploadFileFunc = async (file, onStart, onFinish) => {
  const extension = file.type.split('/')[1];

  const docRef = ref(
    storage,
    `uploads/${auth.currentUser?.uid}/${Date.now()}.${extension}`
  );
  onStart();

  return new Promise((res, rej) => {
    uploadBytes(docRef, file)
      .then((uploadResult) => {
        if (uploadResult.metadata.ref) {
          getDownloadURL(uploadResult.metadata.ref).then((url: string) => {
            res(url);
          });
        }
      })
      .catch((reason: string) => {
        console.log(reason);
        rej(reason);
      })
      .finally(() => {
        onFinish();
      });
  });
};
