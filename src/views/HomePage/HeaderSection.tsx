import { FC } from 'react';
import clsx from 'clsx';

interface IProps {
  className?: string;
}

const HeaderSection: FC<IProps> = ({ className }) => {
  return (
    <div className={clsx('relative bg-indigo-800 w-full', className)}>
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169"
          alt=""
        />
        <div
          className="absolute inset-0 bg-indigo-800 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div className="relative px-4 py-24 mx-auto max-w-7xl sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Современная платформа
          <br />
          для тестирования знаний
        </h1>
        <p className="max-w-3xl mt-6 text-xl text-indigo-100">
          Объединяет в себе функционал для гибкого создания тестов и обработки
          результатов.
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;
