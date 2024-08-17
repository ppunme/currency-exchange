import React from 'react';
import { formatNumber } from '../../utils/number';
import { useTranslation } from 'react-i18next';

const SummaryTable = ({ loading, summary }) => {
  const { t } = useTranslation();

  const tableCell = 'border px-4 py-2 text-right';
  const tableCellCenter = 'border px-4 py-2 text-center';
  const tableCol = 'border px-4 py-2';

  return (
    <>
      {loading ? (
        <p>Loading summary...</p>
      ) : summary ? (
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th></th>
              <th className={tableCellCenter}>{t('THB')}</th>
              <th className={tableCellCenter}>{t('MYR')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={tableCol}>{t('cashAtStart')}</td>
              <td className={tableCell}>
                {formatNumber(summary.thb.startAmount, 2)}
              </td>
              <td className={tableCell}>
                {formatNumber(summary.myr.startAmount, 2)}
              </td>
            </tr>
            <tr>
              <td className={tableCol}>{t('cashReceived')}</td>
              <td className={tableCell}>
                {formatNumber(summary.thb.received, 2)}
              </td>
              <td className={tableCell}>
                {formatNumber(summary.myr.received, 2)}
              </td>
            </tr>
            <tr>
              <td className={tableCol}>{t('cashPaid')}</td>
              <td className={tableCell}>
                {formatNumber(-summary.thb.paid, 2)}
              </td>
              <td className={tableCell}>
                {formatNumber(-summary.myr.paid, 2)}
              </td>
            </tr>
            <tr className='bg-gray-700 text-white'>
              <td className={tableCol}>{t('leftAmount')}</td>
              <td className={tableCell}>
                {formatNumber(summary.thb.leftAmount, 2)}
              </td>
              <td className={tableCell}>
                {formatNumber(summary.myr.leftAmount, 2)}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No summary available for this date.</p>
      )}
    </>
  );
};

export default SummaryTable;
