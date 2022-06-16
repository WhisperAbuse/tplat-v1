import { FC } from 'react';
import clsx from 'clsx';
import PostItem from './PostItem';

interface IProps {
  className?: string;
  posts: any[];
  admin: boolean;
}

const PostFeed: FC<IProps> = ({ className, posts, admin }) => {
  return posts ? (
    <div className={clsx('max-w-xl', className)}>
      {posts.map((post, index) => (
        <>
          <PostItem post={post} key={index} />
          <div className="w-full h-0.5 bg-gray-200 my-3" />
        </>
      ))}
    </div>
  ) : null;
};

export default PostFeed;
