import React, { forwardRef } from 'react';
import { formatNumber } from '../../utils/number';
import { format } from 'date-fns';

const Receipt = forwardRef(
  (
    { currency, totalAmount, convertedAmount, rate, receiptNo, address },
    ref,
  ) => {
    const currentDate = format(new Date(), 'dd-MM-yyyy HH:mm:ss');

    return (
      <div
        ref={ref}
        style={{ width: '80mm', height: '120mm' }}
        className='text-sm pt-10 px-6 pb-6'
      >
        <p className='text-xl text-center font-semibold'>
          {address && address.companyName
            ? address.companyName
            : 'Pooppup Exchange Co., Ltd.'}
        </p>
        <div className='flex flex-col space-y-1'>
          <p className='text-center text-lg'>Receipt</p>
          {address ? (
            <>
              <p className='mt-3'>
                {address.street}, {address.district}, {address.province},{' '}
                {address.zipcode}
              </p>
              {address.phone ? <p>Telephone : {address.phone}</p> : null}
              {address.licenseNo ? (
                <p>Telephone : {address.licenseNo}</p>
              ) : null}
            </>
          ) : null}
          <p>Receipt no : {receiptNo}</p>
          <p>Date & Time : {currentDate} </p>
        </div>

        <div className='grid grid-cols-1 divide-y'>
          <div className='flex justify-between text-lg mt-3 py-1'>
            <div>We buy</div>
            <div>
              {currency} {formatNumber(totalAmount)}
            </div>
          </div>
          <div className='flex justify-between text-lg py-1'>
            <div>Rate</div>
            <div>{rate}</div>
          </div>
          <div className='flex justify-between text-lg py-1'>
            <div>Get</div>
            <div>
              {currency === 'THB' ? 'MYR' : 'THB'}{' '}
              {formatNumber(convertedAmount, 2)}
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <div className='pt-3'>
            <p className='text-black'>
              1 {currency} ={' '}
              {currency === 'THB' && rate
                ? parseFloat(1 / rate).toFixed(2)
                : parseFloat(rate).toFixed(2)}{' '}
              {currency === 'THB' ? 'MYR' : 'THB'}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

export default Receipt;
