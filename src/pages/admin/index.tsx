import { FC, FormEventHandler, useState } from 'react';
import clsx from 'clsx';
import kebabcase from 'lodash.kebabcase';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import AuthCheck from '@/shared/AuthCheck';
import PostFeed from '@/shared/PostFeed';

import { auth, firestore } from '@/lib/firebase';
import { useUserContext } from '@/lib/context';
import toast from 'react-hot-toast';

interface IProps {
  className?: string;
}

const AdminPostsPage: FC<IProps> = ({ className }) => {
  return (
    <main className={clsx('', className)}>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
};

const PostList = () => {
  const ref = doc(firestore, 'users', auth.currentUser?.uid || '');
  const postsCollection = collection(ref, 'posts');
  const q = query(postsCollection, orderBy('createdAt', 'desc'));

  const [querySnapshot] = useCollection(q);

  const posts = querySnapshot?.docs.map((doc) => doc.data()) || [];

  return (
    <div>
      <h1>Manage yout Posts</h1>
      <PostFeed posts={posts} admin />
    </div>
  );
};

const CreateNewPost = () => {
  const router = useRouter();
  const { username } = useUserContext();
  const [title, setTitle] = useState('');

  const slug = encodeURI(kebabcase(title));

  const isValid = title.length > 3 && title.length < 100;

  const createPost: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;

    const ref = doc(firestore, 'users', auth.currentUser?.uid || '');
    const postsCollection = collection(ref, 'posts');
    const post = doc(postsCollection, slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: 'Empty content',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartsCount: 0,
    };

    await setDoc(post, data);

    toast.success('Post created!');

    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New article"
        className="input"
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button className="btn-green" type="submit" disabled={!isValid}>
        Create New Post
      </button>
    </form>
  );
};

export default AdminPostsPage;
