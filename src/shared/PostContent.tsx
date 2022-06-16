import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';

interface IProps {
  className?: string;
  post: any;
}

const PostContent: FC<IProps> = ({ className, post }) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.updatedAt)
      : post.createdAt.toDate();

  const updatedDate = moment(createdAt).format('LL');

  return (
    <div className={clsx('', className)}>
      <h1 className="text-2xl font-semibold text-gray-900">{post?.title}</h1>
      <div className="flex items-baseline gap-6">
        <p className="text-base text-gray-800">
          by{' '}
          <Link href={`/${post.username}`}>
            <a className="text-blue-700">@{post.username}</a>
          </Link>
        </p>

        <p className="text-sm text-gray-500">
          <time dateTime={updatedDate}>{updatedDate}</time>
        </p>
      </div>

      <div className="pt-5 mt-5 border-t-2 border-gray-100 post">
        <ReactMarkdown>{post?.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PostContent;
