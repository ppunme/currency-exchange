import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import CashFloatModal from '../summary/CashFloatModal';
import { AttachMoneyRounded } from '@mui/icons-material';
import SummaryTable from './SummaryTable';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { th } from 'date-fns/locale'; // Import locales
import Title from '../Title';
import { useSummary } from '../../hooks/useSummary';
import SuccessModal from '../../components/SuccessModal';
import useStore from '../../store/store';

const Summary = () => {
  const { t, i18n } = useTranslation();
  const { cashFloat } = useStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [today, setToday] = useState();
  const [successModal, setSuccessModal] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  const openSuccessModal = (open) => {
    setSuccessModal(true);
  };
  const closeSuccessModal = () => {
    setSuccessModal(false);
  };

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd');
  const { summary, loading: summaryLoading } = useSummary(formattedDate);

  const formatThaiDate = (date) => {
    const day = format(date, 'd', { locale: th });
    const month = format(date, 'MMMM', { locale: th });
    const year = date.getFullYear() + 543; // Convert to Buddhist Era (BE)
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedToday =
      i18n.language === 'th'
        ? formatThaiDate(currentDate)
        : format(currentDate, 'dd MMM yyyy');

    setToday(formattedToday);
  }, [i18n.language, cashFloat]); // Re-run effect when language changes

  return (
    <div>
      <div className='flex justify-between items-end mb-4'>
        <div>
          <Title>Summary</Title>
          <p>{today}</p>
        </div>
        <div>
          <Button
            disableElevation
            variant='contained'
            startIcon={<AttachMoneyRounded />}
            onClick={() => setModalOpen(true)}
            className='hover:!bg-teal-600 !bg-teal-500'
          >
            {t('addCashFloat')}
          </Button>
        </div>
      </div>
      <SummaryTable loading={summaryLoading} summary={summary} />
      <CashFloatModal
        open={modalOpen}
        handleClose={handleClose}
        openSuccessModal={openSuccessModal}
      />
      <SuccessModal
        open={successModal}
        onClose={closeSuccessModal}
        title={t('exchangeRateUpdated')}
        message={t('cashFloatUpdatedSuccessfully')}
      />
    </div>
  );
};

export default Summary;
