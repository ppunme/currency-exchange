import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Title from '../Title';
import useStore from '../../store/store';
import { saveCashFloat } from '../../services/cashFloatService';
import { useCashFloat } from '../../hooks/useCashFloat';
import { format } from 'date-fns';

const CashFloatModal = ({ open, handleClose, openSuccessModal }) => {
  const { t } = useTranslation();

  const [amountTHB, setAmountTHB] = useState('');
  const [amountMYR, setAmountMYR] = useState('');
  const [amountTHBError, setAmountTHBError] = useState(false);
  const [AmountMYRError, setAmountMYRError] = useState(false);

  const { setCashFloat } = useStore();

  const { cashFloat, loading } = useCashFloat(format(new Date(), 'yyyy-MM-dd'));

  const thbChange = (value) => {
    setAmountTHBError(false);
    setAmountTHB(value);
  };

  const myrChange = (value) => {
    setAmountMYRError(false);
    setAmountMYR(value);
  };

  const handleCancel = () => {
    if (cashFloat) {
      setAmountTHB(cashFloat.thb);
      setAmountMYR(cashFloat.myr);
    }

    setAmountTHBError(false);
    setAmountMYRError(false);
    handleClose();
  };

  const handleSubmit = async () => {
    setAmountTHBError(false);
    setAmountMYRError(false);

    let valid = true;

    // Field validation
    if (!amountTHB) {
      setAmountTHBError(true);
      valid = false;
    }
    if (!amountMYR) {
      setAmountMYRError(true);
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const response = await saveCashFloat(amountTHB, amountMYR);

      if (response.status === 200) {
        setCashFloat({ thb: amountTHB, myr: amountMYR });
        openSuccessModal();
        handleClose();
      }
    } catch (err) {
      console.error('Error updating cash float', err);
    }
  };

  useEffect(() => {
    if (cashFloat) {
      setAmountTHB(cashFloat.thb);
      setAmountMYR(cashFloat.myr);
    }
  }, [cashFloat]);

  return (
    <Modal
      open={Boolean(open)}
      onClose={handleClose}
      aria-labelledby='set-rate-modal'
      aria-describedby='set-exchange-rate-modal'
    >
      <Box className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-lg p-6 rounded-xl'>
        {loading ? (
          <div>loading...</div>
        ) : (
          <>
            <Title>{t('addCashFloat')}</Title>
            <div className='grid grid-cols-2 gap-x-4'>
              <TextField
                label='THB'
                value={amountTHB}
                onChange={(e) => thbChange(e.target.value)}
                fullWidth
                margin='normal'
                type='number'
                error={amountTHBError}
              />
              <TextField
                label='MYR'
                value={amountMYR}
                onChange={(e) => myrChange(e.target.value)}
                fullWidth
                margin='normal'
                type='number'
                error={AmountMYRError}
              />
            </div>
            {amountTHBError || AmountMYRError ? (
              <p className='text-red-500 text-sm'>
                Please enter both THB and MYR
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
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CashFloatModal;
