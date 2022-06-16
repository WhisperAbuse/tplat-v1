import { FC } from 'react';

import { useUserContext } from '@/lib/context';
import Link from 'next/link';

interface IProps {
  className?: string;
  fallback?: any;
  children?: any;
}

const AuthCheck: FC<IProps> = (props) => {
  const { username } = useUserContext();

  return username ? (
    props.children
  ) : props.fallback === undefined ? (
    <Link href="/enter">
      <a>You must be signed in</a>
    </Link>
  ) : (
    props.fallback
  );
};

export default AuthCheck;
