import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import TestPreviewCard from '@/shared/TestPreviewCard';

import HeaderSection from '@/views/HomePage/HeaderSection';

import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';

import { firestore, postToJSON } from '@/lib/firebase';

import styles from '@/styles/Home.module.css';

const LIMIT = 1;

interface IProps {
  posts: any;
}

const Home: NextPage<IProps> = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);

    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === 'number'
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;

    const postsQuery = query(
      collectionGroup(firestore, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    );

    const morePosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());
    setPosts(posts.concat(morePosts));
    setLoading(false);

    if (morePosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Tplat | Homepage</title>
        <meta
          name="description"
          content="Tplat - is a test platform for everyone"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-5">
        <HeaderSection />

        <section className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3">
          <TestPreviewCard />
        </section>
      </main>
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: {
      posts,
    },
  };
}

export default Home;
