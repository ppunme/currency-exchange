import React from 'react';
import { TextField } from '@mui/material';

const FormInput = ({ label, value, onChange, error }) => (
  <div className='flex items-center space-x-4'>
    <label className='font-medium w-12 text-end'>{label}</label>
    <TextField
      hiddenLabel
      variant='outlined'
      type='number'
      value={value}
      onChange={onChange}
      error={error}
      inputProps={{ min: 0, step: 1 }}
      className='flex-1'
      size='small'
    />
  </div>
);

export default FormInput;
