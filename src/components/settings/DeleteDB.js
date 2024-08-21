import React from 'react';
import { Button } from '@mui/material';
import { deleteDB } from '../../services/db';

const DeleteDB = () => {
  const handleDeleteDB = () => {
    // Call the function to delete the database
    deleteDB()
      .then(() => {
        console.log('Database deletion complete');
      })
      .catch((error) => {
        console.error('Database deletion failed', error);
      });
  };

  return <Button onClick={handleDeleteDB}>Delete DB</Button>;
};

export default DeleteDB;
