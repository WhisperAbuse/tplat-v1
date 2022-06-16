import { FC } from 'react';
import clsx from 'clsx';
import { User } from 'firebase/auth';

interface IProps {
  className?: string;
  user: any;
}

const UserProfile: FC<IProps> = ({ className, user }) => {
  return (
    <div className={clsx('mt-10', className)}>
      <div className="overflow-hidden border-4 border-gray-300 border-solid rounded-full shadow-2xl w-fit">
        <img src={user.photoURL} alt="user profile" className="w-40 h-40" />
      </div>
      <div className="flex items-center mt-6">
        <h1 className="text-xl font-semibold">{user.displayName}</h1>

        <p className="pl-3 ml-3 border-l border-gray-300 border-solid">
          <i>@{user.username}</i>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
