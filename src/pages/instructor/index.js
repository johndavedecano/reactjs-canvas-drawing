import React, { useContext, useState } from 'react';

import cx from 'classnames'

import { X, Phone, Monitor, ChevronLeft, ChevronRight, User, MessageSquare } from 'react-feather';

import Student from './student';

import Preview from './preview'

import { SocketContext } from '../../SocketContext';

import './instructor.css';

const Header = ({ onClick }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-bold flex-1">Live Classroom</h3>
        <div className="text-sm text-gray-500">
          Started at November 20, 2020 12:00AM CST
        </div>
      </div>
      <a href="/" onClick={onClick}>
        <X />
      </a>
    </div>
  );
};

const NoPreview = () => <div className="flex items-center justify-center flex-col">
  <User size={64} />
  <p className="pt-5">No Preview Available</p>
</div>

const Component = () => {

  const socket = useContext(SocketContext)

  const [roomId, setRoomId] = useState(null)

  const [roomName, setRoomName] = useState(null)

  const [isOpen, setOpen] = useState(true);

  const handleToggle = (evt) => {
    evt.preventDefault()
    setOpen(!isOpen)
  }

  const handlePreview = ({ id, name }) => {
    setRoomId(id)
    setRoomName(name)
  }

  return (
    <div className="instructor flex flex-row items-stretch">
      <div className={cx('w-1/3 bg-white overflow-auto students-lists border-r border-gray-400 animate__animated', {
        'block': isOpen,
        'hidden': !isOpen,
        'animate__fadeIn': isOpen,
      })}>
        <div className="p-4 flex flex-col">
          <Header onClick={handleToggle} />
          <div className="grid grid-flow-row-dense grid-cols-2 gap-2">
            <Student onClick={handlePreview} id={1} avatar="/boy1.jpg" name={'James F.'} />
            <Student onClick={handlePreview} id={2} avatar="/girl1.jpg" name={'Christine J.'} />
            <Student onClick={handlePreview} id={3} avatar="/girl2.jpg" name={'Michelle O.'} />
            <Student onClick={handlePreview} id={4} avatar="/boy3.jpg" name={'Tet A.'} />
            <Student onClick={handlePreview} id={5} avatar="/girl3.jpg" name={'Mary Jane H.'} />
            <Student onClick={handlePreview} id={6} avatar="/boy4.jpg" name={'Justine Carl X.'} />
            <Student onClick={handlePreview} id={7} avatar="/girl5.jpg" name={'Caroline F.'} />
            <Student onClick={handlePreview} id={8} avatar="/girl6.jpg" name={'Chase A.'} />
            <Student onClick={handlePreview} id={9} avatar="/girl3.jpg" name={'Mary Jane H.'} />
            <Student onClick={handlePreview} id={10} avatar="/boy4.jpg" name={'Justine Carl X.'} />
          </div>
        </div>
      </div>
      <div className="flex-1 flex-col right flex">
        <div className="toolbar flex items-center border-b border-gray-400">
          <div className="flex-1 pl-3">
            <a
              href="#/"
              className="h-10 w-10 flex items-center justify-center mr-2"
              onClick={handleToggle}
            >
              {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </a>
          </div>
          {roomId ? <h3 className="text-lg font-bold pr-5">#{roomId} {roomName}</h3> : null}
        </div>

        <div className="preview bg-gray-200 flex-1 flex-col flex items-center justify-center">
          {roomId ? <Preview roomId={roomId} socketRef={socket} /> : <NoPreview />}
        </div>
        <div className="toolbar flex items-center justify-center border-t border-gray-400">
          <div className="flex pr-3">
            <a
              href="#/"
              className="rounded-full border border-gray-400  h-10 w-10 flex items-center justify-center mr-2"
            >
              <Phone size={16} />
            </a>
            <a
              href="#/"
              className="rounded-full border border-gray-400  h-10 w-10 flex items-center justify-center mr-2"
            >
              <Monitor size={16} />
            </a>

            <a
              href="#/"
              className="rounded-full border border-gray-400  h-10 w-10 flex items-center justify-center"
            >
              <MessageSquare size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Component;
