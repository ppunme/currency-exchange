import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ConfirmModal = ({ open, onClose, onSave, children }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={Boolean(open)}
      onClose={onClose}
      aria-labelledby='set-rate-modal'
      aria-describedby='set-exchange-rate-modal'
    >
      <Box className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-lg p-6 rounded-xl'>
        <p>Are you sure you want to save this transaction</p>
        <div className='flex mt-2 space-x-2'>
          <Button
            disableElevation
            onClick={onClose}
            variant='outlined'
            color='primary'
            className='w-full'
          >
            {t('cancel')}
          </Button>
          <Button
            disableElevation
            onClick={onSave}
            variant='contained'
            color='primary'
            className='hover:!bg-blue-600 w-full'
          >
            {t('save')}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
