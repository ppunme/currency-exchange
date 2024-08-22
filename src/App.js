import { useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { Container, ThemeProvider } from '@mui/material';
import { CurrencyExchangeRounded } from '@mui/icons-material';
import ExchangeRates from './components/exchangeRate';
import SetRatesModal from './components/exchangeRate/SetRatesModal';
import SelectCurrency from './components/SelectCurrency';
import Calculate from './components/calculate';
import Report from './components/report';
import Settings from './components/settings';
import theme from './theme';
import { Button, Tooltip, IconButton } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import ReportIcon from './assets/icons/report-icon';
import LangSwitch from './components/LangSwitch';
import Summary from './components/summary';
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.css';
import SuccessModal from './components/SuccessModal';
import SettingIcon from './assets/icons/setting-icon';

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

  const handleSettings = () => {
    navigate('/settings');
  };

  const openSuccessModal = (open) => {
    setSuccessModal(true);
  };
  const closeSuccessModal = () => {
    setSuccessModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='md' className='space-y-6 min-h-screen'>
        <div className='flex flex-col min-h-screen'>
          {/* Header */}
          <header className='flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0 pt-8'>
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
              <div className='flex items-center sm:mt-2'>
                <LangSwitch />
                <div className='sm:hidden'>
                  <Tooltip title={t('settings')}>
                    <IconButton
                      onClick={handleSettings}
                      className='!text-gray-900 !p-1'
                    >
                      <SettingIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div>
              <div className='flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-2 sm:items-center'>
                <div className='hidden sm:block'>
                  <Tooltip title={t('settings')}>
                    <IconButton
                      onClick={handleSettings}
                      className='!text-gray-900 !p-1'
                    >
                      <SettingIcon />
                    </IconButton>
                  </Tooltip>
                </div>
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
          </header>

          <div className='grow py-6'>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <SelectCurrency />
                    <Summary className='pt-6' />
                  </>
                }
              />
              <Route path='/calculate/:currency' element={<Calculate />} />
              <Route path='/report' element={<Report />} />
              <Route path='/settings/*' element={<Settings />} />
            </Routes>
          </div>
        </div>

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
