import React, { useState } from 'react';

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </>
  );
};

export default Box;
