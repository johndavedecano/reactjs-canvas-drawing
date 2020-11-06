import React from 'react';

import { Edit } from 'react-feather'

import './student.css';

const noop = () => { }

const User = ({ id, name, avatar, onClick = noop }) => {
  return (
    <div
      onClick={() => onClick({ id, name })}
      className="student animate__animated animate__fadeIn"
      style={{
        backgroundImage:
          `url("${avatar}")`,
      }}
    >
      <div className="student-tools flex py-1 px-2 items-center absolute bottom-0 left-0 w-full">
        <div className="flex-1 text-white text-sm">{name}</div>
        <a href="/"><Edit color="#FFFFFF" size={16} /></a>
      </div>
    </div>
  );
};

export default User;
