import { FC } from 'react';
import clsx from 'clsx';
import UserTestView from '@/views/UserTest';
import { GetServerSideProps } from 'next';
import AuthCheck from '@/shared/AuthCheck';

interface IProps {
  className?: string;
}

const UserTestPage: FC<IProps> = ({ className }) => {
  return (
    <div className={clsx('', className)}>
      <AuthCheck>
        <UserTestView />
      </AuthCheck>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  return {
    props: {},
  };
};

export default UserTestPage;
