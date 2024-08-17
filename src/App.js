import { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { Container, ThemeProvider } from '@mui/material';
import { CurrencyExchangeRounded } from '@mui/icons-material';
import ExchangeRates from './components/exchangeRate/ExchangeRates';
import SetRatesModal from './components/exchangeRate/SetRatesModal';
import SelectCurrency from './components/SelectCurrency';
import Calculate from './components/calculate/Calculate';
import Report from './components/report/Report';
import theme from './theme';
import { Button, Tooltip } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import ReportIcon from './assets/icons/report-icon';
import LangSwitch from './components/LangSwitch';
import Summary from './components/summary/Summary';
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.css';
import SuccessModal from './components/SuccessModal';

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const handleReport = () => {
    navigate('/report');
  };

  const openSuccessModal = (open) => {
    setSuccessModal(true);
  };
  const closeSuccessModal = () => {
    setSuccessModal(false);
  };

  useEffect(() => {
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='md' className='py-8 space-y-6'>
        <div className='flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0'>
          <div className='flex sm:flex-col justify-between items-center sm:justify-start sm:items-start'>
            <Tooltip title={t('home')} placement='right'>
              <div
                className='flex items-center space-x-2 cursor-pointer hover:!bg-transparent hover:!text-gray-700'
                onClick={handleBackHome}
              >
                <CurrencyExchangeRounded />
                <p className='text-xl text-center font-semibold'>
                  Pooppup Exchange
                </p>
              </div>
            </Tooltip>
            <LangSwitch />
          </div>
          <div>
            <div className='flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-2'>
              <Button
                disableElevation
                variant='outlined'
                startIcon={<ReportIcon />}
                onClick={handleReport}
                className='w-full sm:w-32'
              >
                {t('report')}
              </Button>
              <Button
                disableElevation
                variant='contained'
                startIcon={<AddRounded />}
                onClick={setModalOpen}
                color='primary'
                className='hover:!bg-blue-600 w-full sm:w-auto'
              >
                {t('updateExchangeRate')}
              </Button>
            </div>
            <ExchangeRates />
          </div>
        </div>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <SelectCurrency />
                <Summary />
              </>
            }
          />
          <Route path='/calculate/:currency' element={<Calculate />} />
          <Route path='/report' element={<Report />} />
        </Routes>
        <SetRatesModal
          open={modalOpen}
          handleClose={handleClose}
          openSuccessModal={openSuccessModal}
        />
        <SuccessModal
          open={successModal}
          onClose={closeSuccessModal}
          title={t('exchangeRateUpdated')}
          message={t('exchangeRatesUpdatedSuccessfully')}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
