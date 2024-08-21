import React from 'react';
import { Button } from '@mui/material';
import { deleteDB } from '../../services/db';
import Title from '../Title';
import { WarningRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const DeleteDB = () => {
  const { t } = useTranslation();

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

  return (
    <div className='flex flex-col space-y-4'>
      <Title>{t('deleteDBTitle')}</Title>
      <p>
        <WarningRounded className='-mt-1 mr-1' />
        <span>{t('deleteDBDesc')}</span>
      </p>
      <div>
        <Button onClick={handleDeleteDB} variant='contained' color='error'>
          {t('deleteDBTitle')}
        </Button>
      </div>
    </div>
  );
};

export default DeleteDB;
