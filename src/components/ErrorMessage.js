import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className='error'>
      <h3>{error}</h3>
      <p>⛔</p>
    </div>
  );
};

export default ErrorMessage;
