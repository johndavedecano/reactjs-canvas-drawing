import React from 'react';

import { Link } from 'wouter';

const User = ({ id }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg mb-6">
      <img
        className="w-full"
        src="http://www.radfaces.com/images/avatars/chris-chambers.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-6">
        <div className="font-bold text-xl mb-2">
          <Link to={`/student/${id + 1}`}>Student #{id + 1} </Link>
        </div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
};

export default User;
