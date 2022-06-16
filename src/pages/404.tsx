import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface IProps {
  className?: string;
}

const Page404: FC<IProps> = ({ className }) => {
  return (
    <main className={clsx('', className)}>
      <h1>404 - Page not found</h1>
      <img
        src="https://c.tenor.com/WDAqsKrjjRkAAAAC/error-404.gif"
        width="833"
        height="506.8253012048193"
        alt="Error 404 GIF - Error 404 GIFs"
        style={{ maxWidth: 833 }}
      />
      <Link href="/">
        <button className="btn-blue">Go home</button>
      </Link>
    </main>
  );
};

export default Page404;
