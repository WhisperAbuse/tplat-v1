import { FC } from 'react';
import clsx from 'clsx';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

interface IProps {
  className?: string;
  postRef: DocumentReference<DocumentData>;
  heartCount: number;
}

const HeartButton: FC<IProps> = ({ className, postRef, heartCount }) => {
  const heartRef = doc(collection(postRef, 'hearts'), auth.currentUser?.uid);

  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    const uid = auth.currentUser?.uid;

    const batch = writeBatch(firestore);
    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  const removeHeart = async () => {
    const uid = auth.currentUser?.uid;

    const batch = writeBatch(firestore);
    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  const cxClassName = clsx(
    'px-2 py-1 mt-10 bg-gray-100 rounded-md w-fit font-semibold text-xl',
    className
  );

  return (
    <button
      className={clsx(
        'px-2 py-1 mt-10  rounded-md w-fit font-semibold text-xl',
        heartDoc?.exists() ? 'bg-red-500 text-white' : 'bg-gray-100',
        className
      )}
      onClick={!heartDoc?.exists() ? addHeart : removeHeart}
    >
      {heartCount || ''} 😻
    </button>
  );
};

export default HeartButton;
