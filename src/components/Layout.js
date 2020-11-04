import React from 'react';

import './Layout.css';

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex">
        <div className="sidebar flex-col bg-teal-500 border-solid">
          <div className="sidebar-brand flex items-center justify-center border-b-2 border-teal-300">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <span className="font-semibold text-xl tracking-tight">
                Learnify
              </span>
            </div>
          </div>
        </div>
        <div className="content flex-1 flex flex-col">
          <nav className="flex items-center justify-between flex-wrap bg-white p-6 border-solid border-b-2 border-gray-300">
            <div className="block">
              <button className="flex items-center px-3 py-2 border rounded text-white bg-teal-500 hover:text-white">
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </nav>
          <div className="main flex-1">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
