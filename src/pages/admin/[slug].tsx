import { FC, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import ImageUploader from '@/shared/ImageUploader';

import styles from '@/styles/Admin.module.css';

export async function getServerSideProps() {
  return {
    props: {},
  };
}

interface IProps {
  className?: string;
}

const PostEditPage: FC<IProps> = ({ className }) => {
  return (
    <main className={clsx('', className)}>
      <h1>Edit Post</h1>
      <PostManager />
    </main>
  );
};

const PostManager = () => {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const postRef = doc(
    collection(
      doc(collection(firestore, 'users'), auth.currentUser?.uid),
      'posts'
    ),
    slug as string
  );

  const [post] = useDocumentData(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>
              {preview ? 'Edit' : 'Preview'}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
};

interface IPostForm {
  postRef: DocumentReference<DocumentData>;
  defaultValues: DocumentData;
  preview: boolean;
}

const PostForm: FC<IPostForm> = ({ postRef, defaultValues, preview }) => {
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const { errors, isDirty, isValid } = formState;

  const updatePost = async ({ content, published }: DocumentData) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });
    toast.success('Post updated');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        <ImageUploader />
        <textarea
          {...register('content', {
            maxLength: { value: 20000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: { value: true, message: 'content is required' },
          })}
          className={styles.textarea}
        ></textarea>
        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}

        <fieldset>
          <label>
            <input
              {...register('published')}
              type="checkbox"
              className={styles.checkbox}
            />
            Published
          </label>
        </fieldset>

        <button
          type="submit"
          className="btn-green"
          disabled={!isDirty || !isValid}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default PostEditPage;
