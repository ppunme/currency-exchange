import React, { useState } from 'react';
import { Button } from '@mui/material';
import { deleteDB } from '../../services/db';
import Title from '../Title';
import { WarningRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '../ConfirmModal';
import { DeleteRounded } from '@mui/icons-material';

const DeleteDB = () => {
  const { t } = useTranslation();

  const [confirmModal, setConfirmModal] = useState(false);

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
        <Button
          disableElevation
          startIcon={<DeleteRounded />}
          onClick={() => setConfirmModal(true)}
          variant='contained'
          color='error'
        >
          {t('deleteDBTitle')}
        </Button>
      </div>
      <ConfirmModal
        open={confirmModal}
        onClose={() => setConfirmModal(false)}
        onSave={handleDeleteDB}
        title={t('confirmToDeleteTitle')}
        text={t('confirmToDeleteText')}
        color='error'
      />
    </div>
  );
};

export default DeleteDB;
