import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Title from '../Title';
import { PrintRounded } from '@mui/icons-material';

const PrintModal = ({ open, onClose, handlePrint, children }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={Boolean(open)}
      onClose={onClose}
      aria-labelledby='set-rate-modal'
      aria-describedby='set-exchange-rate-modal'
    >
      <Box className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-6 rounded-xl'>
        <Title className='mb-1'>{t('receipt')}</Title>
        <div className='border'>{children}</div>
        <div className='flex justify-end mt-2 space-x-2'>
          <Button
            disableElevation
            onClick={onClose}
            variant='outlined'
            color='primary'
            className='w-full'
          >
            {t('close')}
          </Button>
          <Button
            disableElevation
            onClick={handlePrint}
            variant='contained'
            color='primary'
            className='hover:!bg-blue-600 w-full'
            endIcon={<PrintRounded />}
          >
            {t('print')}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default PrintModal;
