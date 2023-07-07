import React, { FC, useState } from 'react';

interface HeaderProps {
  hasSearchBar?: boolean;
}

const Header: FC<HeaderProps> = ({ hasSearchBar }) => {
  const [displayModal, setDisplayModal] = useState<boolean>(true);
  const [address, setAddress] = useState<string>('');

  const handleSubmit = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter') return;
    if (address === '' || address.length !== 42 || !address.startsWith('0x')) {
      alert('Please enter valid address');
      return;
    }
    window.location.search = '?address=' + address;
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  return (
    <nav className="z-10 bg-white border-b border-gray-700 dark:bg-gray-800 fixed top-0 left-0 w-full">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a className="flex items-center bg" href="/zk-flow/">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">zkFlow</span>
        </a>
        {hasSearchBar && (
          <div className="flex md:order-2">
            <div className="relative md:block sm:w-9/12 md:w-96">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg">
                <svg
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={handleSubmit}
              />
            </div>
          </div>
        )}
        <div className="items-center justify-between hidden w-full md:flex sm:w-auto" id="navbar-search">
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      {displayModal && hasSearchBar && (
        <div
          id="sticky-banner"
          className="fixed bottom-0 left-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        >
          <div className="flex items-center mx-auto">
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              <span className="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
                </svg>
                <span className="sr-only">Light bulb</span>
              </span>
              <div>
                <div>
                  <span>If you want to tip me a beer for my work (or make one more transaction) you can on</span>
                  <span
                    onClick={() =>
                      window.open(
                        'https://explorer.zksync.io/address/0xF859dE92A63070C54d05E33a4e99D707a34FDb12',
                        '_blank',
                      )
                    }
                    className="text-white font-bold whitespace-pre-wrap cursor-pointer"
                  >
                    {' '}
                    0xF859dE92A63070C54d05E33a4e99D707a34FDb12
                  </span>
                </div>
                <div>
                  <span>You can also support me by using my referral code on goal3:</span>
                  <span
                    onClick={() => window.open('https://beta.goal3.xyz?r=zkflow', '_blank')}
                    className="text-white font-bold whitespace-pre-wrap cursor-pointer"
                  >
                    {' '}
                    zkflow
                  </span>
                </div>
              </div>
            </p>
          </div>
          <div className="flex items-center">
            <button
              data-dismiss-target="#sticky-banner"
              type="button"
              onClick={closeModal}
              className="flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close banner</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
