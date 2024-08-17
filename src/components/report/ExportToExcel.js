import React from 'react';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { Button, Tooltip } from '@mui/material';
import { DownloadRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ExportToExcel = ({ selectedDate, transactions, summary }) => {
  const { t } = useTranslation();

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return format(date, 'HH:mm:ss');
  };

  // Prepare data with custom columns and formats
  const prepareDataForExport = (data) => {
    return data.map((item) => ({
      id: item.id,
      amount: item.currency === 'THB' ? item.amount : -item.toAmount,
      convertedAmount: item.currency === 'THB' ? -item.toAmount : item.amount,
      date: item.date,
      time: formatTime(item.time),
      currency: item.currency,
      convertedTo: item.currency === 'THB' ? 'MYR' : 'THB',
    }));
  };

  // Prepare summary data for export
  const prepareSummaryForExport = (data) => {
    const rows = [];
    for (const [currency, values] of Object.entries(data)) {
      rows.push({
        currency: currency === 'thb' ? 'THB' : 'MYR',
        startAmount: values.startAmount,
        received: values.received,
        paid: -values.paid,
        leftAmount: values.leftAmount,
      });
    }
    return rows;
  };

  // Function to export the data to Excel
  const handleExport = () => {
    // Format the transactions data
    const formattedTransactions = prepareDataForExport(transactions);
    const transactionsWorksheet = XLSX.utils.json_to_sheet(
      formattedTransactions,
      {
        header: [
          'id',
          'currency',
          'convertedTo',
          'amount',
          'convertedAmount',
          'date',
          'time',
        ],
      },
    );

    // Apply custom column titles and formats to the transactions sheet
    transactionsWorksheet['!cols'] = [
      { width: 10 }, // Column for 'id'
      { width: 12 }, // Column for 'currency'
      { width: 12 }, // Column for 'convertedTo'
      { width: 15 }, // Column for 'amount'
      { width: 15 }, // Column for 'convertedAmount'
      { width: 15 }, // Column for 'date'
      { width: 10 }, // Column for 'time'
    ];

    // Set custom headers
    transactionsWorksheet['A1'] = { v: 'ID' };
    transactionsWorksheet['B1'] = { v: 'From' };
    transactionsWorksheet['C1'] = { v: 'To' };
    transactionsWorksheet['D1'] = { v: 'THB' };
    transactionsWorksheet['E1'] = { v: 'MYR' };
    transactionsWorksheet['F1'] = { v: 'Date' };
    transactionsWorksheet['G1'] = { v: 'Time' };

    // Format the summary data
    const formattedSummary = prepareSummaryForExport(summary);
    const summaryWorksheet = XLSX.utils.json_to_sheet([], { skipHeader: true });

    // Place the selected date in cell A1
    summaryWorksheet['A1'] = { v: `Date: ${selectedDate}`, t: 's' };

    // Shift the summary data to start from C1
    XLSX.utils.sheet_add_json(summaryWorksheet, formattedSummary, {
      header: ['currency', 'startAmount', 'received', 'paid', 'leftAmount'],
      origin: 'A3',
    });

    // Apply custom column widths for the summary sheet
    summaryWorksheet['!cols'] = [
      { width: 10 }, // Column for 'A' (currency)
      { width: 12 }, // Column for 'B' (startAmount)
      { width: 12 }, // Column for 'C' (received)
      { width: 12 }, // Column for 'D' (paid)
      { width: 12 }, // Column for 'E' (leftAmount)
    ];

    // Set custom headers
    summaryWorksheet['A3'] = { v: 'Currency' };
    summaryWorksheet['B3'] = { v: 'Cash Float' };
    summaryWorksheet['C3'] = { v: 'Received' };
    summaryWorksheet['D3'] = { v: 'Paid' };
    summaryWorksheet['E3'] = { v: 'Amount' };

    // Create a new workbook and add both worksheets to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Summary');
    XLSX.utils.book_append_sheet(
      workbook,
      transactionsWorksheet,
      'Transactions',
    );

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `exchange-report-${selectedDate}.xlsx`);
  };

  return (
    <Tooltip title='Export to Excel' placement='top'>
      <Button
        disableElevation
        variant='contained'
        startIcon={<DownloadRounded />}
        onClick={handleExport}
        className='hover:!bg-teal-600 !bg-teal-500'
      >
        {t('download')}
      </Button>
    </Tooltip>
  );
};

export default ExportToExcel;
