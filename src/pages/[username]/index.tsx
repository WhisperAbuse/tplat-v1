import { FC } from 'react';
import clsx from 'clsx';
import UserProfile from '@/views/UserProfile';
import PostFeed from '@/shared/PostFeed';
import { getUserWithUsername, postToJSON } from '@/lib/firebase';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

interface IProps {
  className?: string;
  user: any;
  posts: any;
}

const UsernamePage: FC<IProps> = ({ className, user, posts }) => {
  return (
    <main className={clsx('mx-auto max-w-6xl px-5', className)}>
      <UserProfile user={user} />
      <div className="mt-14">
        <PostFeed posts={posts} admin={false} />
      </div>
    </main>
  );
};

export async function getServerSideProps(ctx: any) {
  const { username } = ctx.query;
  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  const user = userDoc.data();
  const postsQuery = query(
    collection(userDoc.ref, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(5)
  );

  const querySnapshot = await getDocs(postsQuery);

  const posts = querySnapshot.docs.map(postToJSON);

  return {
    props: { user, posts },
  };
}
export default UsernamePage;
