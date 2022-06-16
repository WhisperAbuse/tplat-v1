import { FC } from 'react';
import clsx from 'clsx';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { collectionGroup, doc, getDoc, getDocs } from 'firebase/firestore';

import { firestore, getUserWithUsername, postToJSON } from '@/lib/firebase';

import PostContent from '@/shared/PostContent';
import HeartButton from '@/shared/HeartButton';
import AuthCheck from '@/shared/AuthCheck';
import Link from 'next/link';

interface IProps {
  className?: string;
  path: any;
  post: any;
}

const PostPage: FC<IProps> = (props) => {
  const postRef = doc(firestore, props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className={clsx('max-w-3xl mx-auto px-5 mt-10', props.className)}>
      <section>
        <PostContent post={post} />
      </section>
      <div className="">
        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>Sign in</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} heartCount={post.heartCount || 0} />
        </AuthCheck>
      </div>
      <div className="fixed right-5 top-20">
        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>Sign in</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} heartCount={post.heartCount || 0} />
        </AuthCheck>
      </div>
    </main>
  );
};

export async function getStaticPaths() {
  const postsSnapshot = await getDocs(collectionGroup(firestore, 'posts'));

  const paths = postsSnapshot.docs.map((doc) => {
    const { slug, username } = doc.data();

    return {
      params: { slug, username },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(props: any) {
  const { username, slug } = props.params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postsRef = doc(userDoc.ref, 'posts', slug);

    post = postToJSON(await getDoc(postsRef));

    path = postsRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}
export default PostPage;
