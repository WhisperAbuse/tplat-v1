import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import moment from 'moment';

interface IProps {
  className?: string;
  post: any;
}

const PostItem: FC<IProps> = ({ className, post }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  const updatedDate = moment(new Date(post.updatedAt)).format('LL');

  return (
    <div className="w-full">
      <Link href={`/${post.username}/${post.slug}`}>
        <a href="#" className="block mt-2">
          <p className="text-xl font-semibold text-gray-900">{post.title}</p>
        </a>
      </Link>
      <div className="flex justify-between ">
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
        <span className="font-semibold">😽 {post.heartCount}</span>
      </div>
      <div className="flex justify-between gap-2 mt-2 "></div>
      <div className="mt-1">
        <Link href={`/${post.username}/${post.slug}`}>
          <a className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
            Читать полностью
          </a>
        </Link>
        <span className="ml-5 text-sm text-gray-500">
          {wordCount} слов, {minutesToRead} мин. чтения
        </span>
      </div>
    </div>
  );
};

export default PostItem;
