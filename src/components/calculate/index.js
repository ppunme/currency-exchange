import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Divider, Button } from '@mui/material';
import Flag from '../Flag';
import NoteIcon from '../../assets/icons/note-icon';
import CoinIcon from '../../assets/icons/coin-icon';
import ExchangeIcon from '../../assets/icons/exchange-icon';
import { formatNumber } from '../../utils/number';
import FormInput from './FormInput';
import { useTranslation } from 'react-i18next';
import SuccessModal from '../SuccessModal';
import { TransactionService, AddressService } from '../../services';
import useStore from '../../store/store';
import { useReactToPrint } from 'react-to-print';
import Receipt from './Receipt';
import PrintModal from './PrintModal';
import ConfirmModal from '../ConfirmModal';

const Calculate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { currency } = useParams();
  const { rates, loading } = useStore();

  const [totalAmount, setTotalAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const [note1000, setNote1000] = useState('');
  const [note500, setNote500] = useState('');
  const [note100, setNote100] = useState('');
  const [note50, setNote50] = useState('');
  const [note20, setNote20] = useState('');
  const [coin10, setCoin10] = useState('');
  const [coin5, setCoin5] = useState('');
  const [coin1, setCoin1] = useState('');

  // MYR
  const [note10, setNote10] = useState('');
  const [note5, setNote5] = useState('');
  const [note1, setNote1] = useState('');

  const [errors, setErrors] = useState({});
  const [confirmModal, setConfirmModal] = useState(false);
  const [printModal, setPrintModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const printRef = useRef();
  const [receiptNo, setReceiptNo] = useState(null);
  const [address, setAddress] = React.useState(null);

  const handleInputChange = (setter, field) => (e) => {
    const value = e.target.value;
    if (value < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: true,
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field]; // Remove error for this field
        return newErrors;
      });
    }
    setter(value);
  };

  useEffect(() => {
    if (!loading && rates) {
      const note1000Value = note1000 === '' ? 0 : Number(note1000);
      const note500Value = note500 === '' ? 0 : Number(note500);
      const note100Value = note100 === '' ? 0 : Number(note100);
      const note50Value = note50 === '' ? 0 : Number(note50);
      const note20Value = note20 === '' ? 0 : Number(note20);
      const coin10Value = coin10 === '' ? 0 : Number(coin10);
      const coin5Value = coin5 === '' ? 0 : Number(coin5);
      const coin1Value = coin1 === '' ? 0 : Number(coin1);

      // Calculate total value in local currency
      const totalAmount =
        note1000Value * 1000 +
        note500Value * 500 +
        note100Value * 100 +
        note50Value * 50 +
        note20Value * 20 +
        coin10Value * 10 +
        coin5Value * 5 +
        coin1Value * 1;

      const conversionRate =
        currency === 'THB' ? rates.sellingRate || 0 : rates.buyingRate || 0;

      // Handle case where conversion rate is 0
      if (conversionRate === 0) {
        console.error('Conversion rate is zero, cannot perform conversion.');
        setTotalAmount(totalAmount);
        setConvertedAmount(0); // Set to 0 or handle as appropriate
        return; // Exit early
      }

      // Convert
      const convertedResult =
        currency === 'THB'
          ? totalAmount / conversionRate
          : totalAmount * conversionRate;

      // Update the result state
      setTotalAmount(totalAmount);
      setConvertedAmount(Number(convertedResult.toFixed(2)));
    }
  }, [
    note1000,
    note500,
    note100,
    note50,
    note20,
    coin10,
    coin5,
    coin1,
    currency,
    rates,
    loading,
  ]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSaveTransaction = async () => {
    try {
      // post transaction to indexedDB
      const response = await TransactionService.saveTransaction(
        currency,
        totalAmount,
        convertedAmount,
      );

      if (response.status === 200) {
        setConfirmModal(false);
        setPrintModal(true);
        setReceiptNo(response.data.receiptNo);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const print = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Currency Exchange Receipt',
    pageStyle: `
      @page {
        size: 80mm 120mm;
        margin: 0;
      }
    `,

    // pageStyle: `
    //   @page {
    //     size: 80mm 120mm;
    //     margin: 0;
    //   }
    //   @media print {
    //     body {
    //       margin: 0;
    //     }
    //   }
    // `,
    onAfterPrint: () => setSuccessModal(true),
    removeAfterPrint: true,
  });

  const handlePrint = () => {
    print();
    setPrintModal(false);
  };

  const closePrintModal = () => {
    setPrintModal(false);
    setSuccessModal(true);
  };

  const closeSuccessfulModal = () => {
    setSuccessModal(false);
    navigate('/');
  };

  useEffect(() => {
    async function fetchAddress() {
      try {
        const address = await AddressService.getAddress();
        setAddress(address);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
    fetchAddress();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!rates) return <div>Error loading rates</div>;

  return (
    <div>
      <p className='text-xl font-bold'>
        {t('calculateFrom')} {currency} {t('calculateTo')}{' '}
        {currency === 'THB' ? 'MYR' : 'THB'}
      </p>
      <div className='sm:flex sm:space-x-6 md:space-x-12 pt-2'>
        <div className='flex-1'>
          <div className='grid grid-cols-2 gap-x-6'>
            <div className='flex flex-col space-y-3'>
              <div className='text-lg font-semibold flex items-center'>
                <span className='mr-2'>{t('notes')}</span>
                <NoteIcon />
              </div>

              {currency === 'THB' && (
                <>
                  <FormInput
                    label='1000'
                    value={note1000}
                    onChange={handleInputChange(setNote1000, 'note1000')}
                    error={!!errors.note1000}
                  />
                  <FormInput
                    label='500'
                    value={note500}
                    onChange={handleInputChange(setNote500, 'note500')}
                    error={!!errors.note500}
                  />
                </>
              )}
              <FormInput
                label='100'
                value={note100}
                onChange={handleInputChange(setNote100, 'note100')}
                error={!!errors.note100}
              />
              <FormInput
                label='50'
                value={note50}
                onChange={handleInputChange(setNote50, 'note50')}
                error={!!errors.note50}
              />
              <FormInput
                label='20'
                value={note20}
                onChange={handleInputChange(setNote20, 'note20')}
                error={!!errors.note20}
              />

              {currency === 'MYR' && (
                <>
                  <FormInput
                    label='10'
                    value={note10}
                    onChange={handleInputChange(setNote10, 'note10')}
                    error={!!errors.note10}
                  />
                  <FormInput
                    label='5'
                    value={note5}
                    onChange={handleInputChange(setNote5, 'note5')}
                    error={!!errors.note5}
                  />
                  <FormInput
                    label='1'
                    value={note1}
                    onChange={handleInputChange(setNote1, 'note1')}
                    error={!!errors.note1}
                  />
                </>
              )}
            </div>

            {/* Coins */}
            {currency === 'THB' && (
              <div className='flex flex-col space-y-3'>
                <p className='text-lg font-semibold flex items-center'>
                  <span className='mr-2'>{t('coins')}</span>
                  <CoinIcon />
                </p>

                <FormInput
                  label='10'
                  value={coin10}
                  onChange={handleInputChange(setCoin10, 'coin10')}
                  error={!!errors.coin10}
                />
                <FormInput
                  label='5'
                  value={coin5}
                  onChange={handleInputChange(setCoin5, 'coin5')}
                  error={!!errors.coin5}
                />
                <FormInput
                  label='1'
                  value={coin1}
                  onChange={handleInputChange(setCoin1, 'coin1')}
                  error={!!errors.coin1}
                />
              </div>
            )}
          </div>

          {/* error msg */}
          {Object.keys(errors).length > 0 && (
            <p className='text-red-500 font-bold mt-2'>
              Value cannot be negative
            </p>
          )}
        </div>

        <div className='mt-4 sm:mt-0 sm:w-1/3'>
          <div className='border p-6 rounded-2xl bg-white shadow-xl'>
            <p>Amount</p>
            <div className='md:flex items-center md:space-x-3 pt-1'>
              <div className='flex items-center'>
                <Flag currency={currency} />
                <p className='w-12 ml-3'>{currency}</p>
              </div>
              <div className='flex-1 bg-[#efefef] rounded-lg p-2 text-end mt-2 md:mt-0'>
                {formatNumber(totalAmount)}
              </div>
            </div>
            <Divider>
              <div className='rounded-full bg-[#FFCC00] w-10 h-10 flex justify-center items-center my-3'>
                <ExchangeIcon />
              </div>
            </Divider>
            <p>Converted To</p>
            <div className='md:flex items-center md:space-x-3 pt-1'>
              <div className='flex items-center'>
                <Flag currency={currency === 'THB' ? 'MYR' : 'THB'} />
                <p className='w-12 ml-3'>
                  {currency === 'THB' ? 'MYR' : 'THB'}
                </p>
              </div>
              <div className='flex-1 bg-[#efefef] rounded-lg p-2 text-end mt-2 md:mt-0'>
                {formatNumber(convertedAmount, 2)}
              </div>
            </div>
          </div>
          <div className='pt-3'>
            <p className='text-neutral-500 font-medium'>{t('exchangeRate')}</p>
            <p className='text-black'>
              1 {currency} ={' '}
              {currency === 'THB' && rates
                ? parseFloat(1 / rates?.sellingRate).toFixed(2)
                : parseFloat(rates?.buyingRate).toFixed(2)}{' '}
              {currency === 'THB' ? 'MYR' : 'THB'}
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-end space-x-2 mt-4'>
        <Button
          variant='outlined'
          onClick={handleCancel}
          size='large'
          className='w-36'
        >
          {t('cancel')}
        </Button>
        <Button
          disableElevation
          variant='contained'
          onClick={() => setConfirmModal(true)}
          size='large'
          className='w-36'
          disabled={totalAmount === 0}
        >
          {t('save')}
        </Button>
      </div>

      <ConfirmModal
        open={confirmModal}
        onClose={() => setConfirmModal(false)}
        onSave={handleSaveTransaction}
      />

      <PrintModal
        open={printModal}
        onClose={closePrintModal}
        handlePrint={handlePrint}
      >
        <Receipt
          ref={printRef}
          currency={currency}
          totalAmount={totalAmount}
          convertedAmount={convertedAmount}
          rates={rates}
          receiptNo={receiptNo}
          address={address}
        />
      </PrintModal>

      <SuccessModal open={successModal} onClose={closeSuccessfulModal} />

      <div className='hidden'></div>
    </div>
  );
};

export default Calculate;
