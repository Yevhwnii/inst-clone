import React from 'react';
import SpinnerSvg from './spinner.svg';

const Spinner = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <img className='w-12 h-12' src={SpinnerSvg} alt='Spinner' />
    </div>
  );
};

export default Spinner;
