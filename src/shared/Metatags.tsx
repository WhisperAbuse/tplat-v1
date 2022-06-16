import Head from 'next/head';
import { FC } from 'react';

interface IProps {
  title: string;
  description: string;
  image: string;
}

const MetaTags: FC<IProps> = ({ title, description, image }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default MetaTags;
