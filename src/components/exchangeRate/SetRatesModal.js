import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import useStore from '../../store/store';
import { useTranslation } from 'react-i18next';
import Title from '../Title';
import { saveRates } from '../../services/rateService';
import { format } from 'date-fns';

const SetRatesModal = ({ open, handleClose, openSuccessModal }) => {
  const { t } = useTranslation();

  const [buyingRate, setBuyingRate] = useState('');
  const [selling, setSelling] = useState('');
  const [buyingError, setBuyingError] = useState(false);
  const [sellingError, setSellingError] = useState(false);

  const { rates, setRates } = useStore();

  const buyingChange = (value) => {
    setBuyingError(false);
    setBuyingRate(value);
  };

  const sellingChange = (value) => {
    setSellingError(false);
    setSelling(value);
  };

  const handleCancel = () => {
    setBuyingRate(rates.buyingRate);
    setSelling(rates.sellingRate);
    setBuyingError(false);
    setSellingError(false);
    handleClose();
  };

  const handleSubmit = async () => {
    setBuyingError(false);
    setSellingError(false);

    let valid = true;

    // Field validation
    if (!buyingRate) {
      setBuyingError(true);
      valid = false;
    }
    if (!selling) {
      setSellingError(true);
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const response = await saveRates(buyingRate, selling);

      if (response.status === 200) {
        setRates({
          date: format(new Date(), 'dd-MM-yyyy'),
          buyingRate: parseFloat(buyingRate).toFixed(2),
          sellingRate: parseFloat(selling).toFixed(2),
        });
        openSuccessModal();
        handleClose();
      }
    } catch (error) {
      console.error('Error setting exchange rates', error);
    }
  };

  useEffect(() => {
    if (rates) {
      setBuyingRate(rates.buyingRate);
      setSelling(rates.sellingRate);
    }
  }, [rates]);

  return (
    <Modal
      open={Boolean(open)}
      onClose={handleClose}
      aria-labelledby='set-rate-modal'
      aria-describedby='set-exchange-rate-modal'
    >
      <Box className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-lg p-6 rounded-xl'>
        <Title>{t('updateExchangeRate')}</Title>
        <div className='grid grid-cols-2 gap-x-4'>
          <TextField
            label='Buying Rate'
            value={buyingRate}
            onChange={(e) => buyingChange(e.target.value)}
            fullWidth
            margin='normal'
            type='number'
            error={buyingError}
          />
          <TextField
            label='Selling Rate'
            value={selling}
            onChange={(e) => sellingChange(e.target.value)}
            fullWidth
            margin='normal'
            type='number'
            error={sellingError}
          />
        </div>
        {buyingError || sellingError ? (
          <p className='text-red-500 text-sm'>
            Please enter both buying and selling rate
          </p>
        ) : null}

        <div className='flex justify-end mt-2 space-x-2'>
          <Button
            disableElevation
            onClick={handleCancel}
            variant='outlined'
            color='primary'
          >
            {t('cancel')}
          </Button>
          <Button
            disableElevation
            onClick={handleSubmit}
            variant='contained'
            color='primary'
            className='hover:!bg-blue-600'
          >
            {t('save')}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default SetRatesModal;
