import { FC, Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useUserContext } from '@/lib/context';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { PlusSmIcon } from '@heroicons/react/solid';
import { auth, signOut } from '@/lib/firebase';
import AuthCheck from './AuthCheck';

interface IProps {
  className?: string;
}

const Navbar: FC<IProps> = ({ className }) => {
  const { user, username } = useUserContext();

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex items-center mr-2 -ml-2 md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center flex-shrink-0">
                  <Link href="/">
                    <a className="px-4 py-2 text-lg font-medium text-white rounded-lg bg-gradient-to-br from-blue-800 to-gray-900">
                      TPLAT
                    </a>
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <a
                    href="#"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-indigo-500"
                  >
                    Пройти тесты
                  </a>
                  <AuthCheck fallback={null}>
                    <Link href="/tests/">
                      <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700">
                        Мои тесты
                      </a>
                    </Link>
                  </AuthCheck>
                  <AuthCheck fallback={null}>
                    <a
                      href="#"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                    >
                      Календарь
                    </a>
                  </AuthCheck>
                </div>
              </div>
              <div className="flex items-center">
                {username && (
                  <div className="flex-shrink-0">
                    <Link href="/tests/create/">
                      <a
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <PlusSmIcon
                          className="w-5 h-5 mr-2 -ml-1"
                          aria-hidden="true"
                        />
                        <span>Создать тест</span>
                      </a>
                    </Link>
                  </div>
                )}
                {username && (
                  <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                    <button
                      type="button"
                      className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative z-10 ml-3">
                      <div>
                        <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="w-8 h-8 rounded-full"
                            src={user?.photoURL}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link href={`/${username}`}>
                                <a
                                  className={clsx(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Профиль
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={clsx(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Настройки
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={signOut}
                                className={clsx(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Выйти
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
                {!username && (
                  <div className="ml-4">
                    <Link href="/enter">
                      <a className="">Войти</a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block py-2 pl-3 pr-4 text-base font-medium text-indigo-700 border-l-4 border-indigo-500 bg-indigo-50 sm:pl-5 sm:pr-6"
              >
                Пройти тесты
              </Disclosure.Button>
              <AuthCheck fallback={null}>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Мои тесты
                </Disclosure.Button>
              </AuthCheck>
              <AuthCheck fallback={null}>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Календарь
                </Disclosure.Button>
              </AuthCheck>
            </div>
            {username && (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {username}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                  >
                    Профиль
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                  >
                    Настройки
                  </Disclosure.Button>
                  <Disclosure.Button
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                    onClick={signOut}
                  >
                    Выйти
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
