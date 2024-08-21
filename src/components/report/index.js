import React, { useState, useMemo } from 'react';
import { TextField, Paper } from '@mui/material';
import { formatNumber } from '../../utils/number';
import { useTranslation } from 'react-i18next';
import SummaryTable from '../summary/SummaryTable';
import Title from '../Title';
import { useTransactions } from '../../hooks/useTransaction';
import { useSummary } from '../../hooks/useSummary';
import { format } from 'date-fns';
import ExportToExcel from './ExportToExcel';

const TransactionRow = ({ transaction }) => {
  const { currency, amount, toAmount, time } = transaction;
  const isTHB = currency === 'THB';

  return (
    <tr>
      <td className='border p-2'>
        {currency} to {isTHB ? 'MYR' : 'THB'}
      </td>
      <td className='border p-2 text-right'>
        {formatNumber(isTHB ? amount : -toAmount, 2)}
      </td>
      <td className='border p-2 text-right'>
        {formatNumber(isTHB ? -toAmount : amount, 2)}
      </td>
      <td className='border p-2 text-center'>
        {new Date(time).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </td>
    </tr>
  );
};

const Report = () => {
  const { t } = useTranslation();

  const currentDateFormatted = useMemo(() => {
    const currentDate = new Date();
    return format(currentDate, 'yyyy-MM-dd');
  }, []);

  const [selectedDate, setSelectedDate] = useState(currentDateFormatted);
  const { transactions, loading: transactionsLoading } =
    useTransactions(selectedDate);
  const { summary, loading: summaryLoading } = useSummary(selectedDate);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <Title className='mb-4'>Transaction Report</Title>
      <div className='flex justify-between items-center mb-4'>
        <TextField
          label={t('selectDate')}
          type='date'
          InputLabelProps={{ shrink: true }}
          size='small'
          className='!mr-2'
          value={selectedDate}
          onChange={handleDateChange}
        />
        <ExportToExcel
          selectedDate={selectedDate}
          transactions={transactions}
          summary={summary}
        />
      </div>
      <div>
        {transactionsLoading ? (
          <p>Loading...</p>
        ) : (
          <Paper className='p-4 !rounded-xl !shadow-lg border'>
            {transactions.length > 0 ? (
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='border p-2 text-left'>{t('transaction')}</th>
                    <th className='border p-2'>THB</th>
                    <th className='border p-2'>MYR</th>
                    <th className='border p-2'>{t('time')}</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <TransactionRow key={index} transaction={transaction} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p>{t('noTransactionsForThisDate')}</p>
            )}
          </Paper>
        )}

        {summaryLoading ? (
          <p>Loading</p>
        ) : (
          <Paper className='p-4 !rounded-xl mt-6 !shadow-lg border'>
            <Title className='mb-4'>Summary</Title>
            <SummaryTable loading={summaryLoading} summary={summary} />
          </Paper>
        )}
      </div>
    </div>
  );
};

export default Report;
