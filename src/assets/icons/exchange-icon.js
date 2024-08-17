import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function ExchangeIcon() {
  return (
    <SvgIcon sx={{ color: '#FFFFFF' }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1em'
        height='1em'
        viewBox='0 0 24 24'
      >
        <path
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M17 20V8m0 12l-3.5-3.5M17 20l3.5-3.5M7 17V4m0 0L3.5 7.5M7 4l3.5 3.5'
        />
      </svg>
    </SvgIcon>
  );
}
