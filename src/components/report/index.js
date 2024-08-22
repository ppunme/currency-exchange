import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  TextField,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { formatNumber } from '../../utils/number';
import { useTranslation } from 'react-i18next';
import SummaryTable from '../summary/SummaryTable';
import Title from '../Title';
import { useTransactions } from '../../hooks/useTransaction';
import { useSummary } from '../../hooks/useSummary';
import { format } from 'date-fns';
import ExportToExcel from './ExportToExcel';
import PrintModal from '../calculate/PrintModal';
import Receipt from '../calculate/Receipt';
import { useReactToPrint } from 'react-to-print';
import { AddressService, TransactionService } from '../../services';
import { MoreVert, ArticleRounded, DeleteRounded } from '@mui/icons-material';

const TransactionRow = ({ transaction, onRowSelect, onDelete }) => {
  const { currency, amount, toAmount, time, receiptNo } = transaction;
  const isTHB = currency === 'THB';

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(transaction.id);
    handleClose();
  };

  return (
    <tr>
      <td className='border pt-2 px-1 text-center'>
        {receiptNo ? receiptNo : '-'}
      </td>
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
      <td className='border p-2 text-center'>
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => onRowSelect(transaction)}>
            <ListItemIcon>
              <ArticleRounded fontSize='small' />
            </ListItemIcon>
            View
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteRounded fontSize='small' />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </td>
    </tr>
  );
};

const Report = () => {
  const { t } = useTranslation();
  const [printModal, setPrintModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const currentDateFormatted = useMemo(() => {
    const currentDate = new Date();
    return format(currentDate, 'yyyy-MM-dd');
  }, []);

  const [selectedDate, setSelectedDate] = useState(currentDateFormatted);
  const [address, setAddress] = React.useState(null);

  const {
    transactions,
    setTransactions,
    loading: transactionsLoading,
  } = useTransactions(selectedDate);
  const { summary, loading: summaryLoading } = useSummary(selectedDate);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const response = await TransactionService.deleteTransaction(id);
      if (response.status === 200) {
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.id !== id),
        );
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error.message);
    }
  };

  const printRef = useRef();

  const print = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Currency Exchange Receipt',
    pageStyle: `
      @page {
        size: 80mm 120mm;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          font-family: sans-serif;
        }
      }
      body {
        font-family: sans-serif;
      }
    `,
    onAfterPrint: () => {
      setPrintModal(false);
    },
    removeAfterPrint: true,
  });

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
                    <th className='border pt-2 px-1'>Receipt No.</th>
                    <th className='border p-2 text-left'>{t('transaction')}</th>
                    <th className='border p-2'>THB</th>
                    <th className='border p-2'>MYR</th>
                    <th className='border p-2'>{t('time')}</th>
                    <th className='border p-2 text-center w-6'></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <TransactionRow
                      key={index}
                      transaction={transaction}
                      onRowSelect={(selectedTransaction) => {
                        setSelectedTransaction(selectedTransaction);
                        setPrintModal(true);
                      }}
                      onDelete={handleDelete}
                    />
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
      {selectedTransaction && (
        <PrintModal
          open={printModal}
          onClose={() => setPrintModal(false)}
          handlePrint={() => print()}
        >
          <Receipt
            ref={printRef}
            currency={selectedTransaction.currency}
            totalAmount={selectedTransaction.amount}
            convertedAmount={selectedTransaction.toAmount}
            rate={selectedTransaction.rate}
            receiptNo={selectedTransaction.receiptNo}
            address={address}
          />
        </PrintModal>
      )}
    </div>
  );
};

export default Report;
