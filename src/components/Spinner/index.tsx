import React from 'react';
import CSS from 'csstype';
import SpinnerSvg from './spinner.svg';

interface SpinnerProps {
  spinnerStyles?: CSS.Properties;
}

const Spinner: React.FC<SpinnerProps> = ({ spinnerStyles }) => {
  return (
    <div
      style={spinnerStyles}
      className='w-full h-full flex items-center justify-center'>
      <img className='w-12 h-12' src={SpinnerSvg} alt='Spinner' />
    </div>
  );
};

export default Spinner;
