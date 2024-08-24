import React, { useState } from 'react';
import { Button } from '@mui/material';
import { deleteDB } from '../../services/db';
import Title from '../Title';
import { WarningRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '../ConfirmModal';
import { DeleteOutlined } from '@mui/icons-material';
import SuccessModal from '../SuccessModal';

const DeleteDB = () => {
  const { t } = useTranslation();

  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleDeleteDB = async () => {
    try {
      const response = await deleteDB();

      if (response.status === 200) {
        setSuccessModal(true);
        setConfirmModal(false);
      } else {
        console.error(response.status, response.message);
      }
    } catch (err) {
      console.error('Database deletion failed', err);
    }
  };

  const closeSuccessModal = () => {
    setSuccessModal(false);
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
          startIcon={<DeleteOutlined />}
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
      <SuccessModal
        open={successModal}
        onClose={closeSuccessModal}
        title={t('deleteSuccessTitle')}
        message={t('deleteSuccessText')}
      />
    </div>
  );
};

export default DeleteDB;
