import React, { forwardRef } from 'react';
import { formatNumber } from '../../utils/number';
import { format } from 'date-fns';

const Receipt = forwardRef(
  ({ currency, totalAmount, convertedAmount, rates, receiptNo }, ref) => {
    const currentDate = format(new Date(), 'dd-MM-yyyy HH:mm:ss');

    return (
      <div
        ref={ref}
        style={{ width: '80mm', height: '120mm' }}
        className='text-sm pt-10 px-6 pb-6'
      >
        <p className='text-xl text-center font-semibold'>
          Pooppup Exchange Co., Ltd.
        </p>
        <div className='flex flex-col space-y-1'>
          <p className='text-center text-lg'>Receipt</p>
          <p className='mt-3'>
            No 6 Charon Khet Road, 96120 Sungai Kolok, Thailand
          </p>
          <p>Telephone : +66-73-530557</p>
          <p>License no : MC225620099</p>
          <p>Receipt no : {receiptNo}</p>
          <p>Date & Time: {currentDate} </p>
        </div>

        <div class='grid grid-cols-1 divide-y'>
          <div className='flex justify-between text-lg mt-3 py-1'>
            <div>We buy</div>
            <div>
              {currency} {formatNumber(totalAmount)}
            </div>
          </div>
          <div className='flex justify-between text-lg py-1'>
            <div>Rate</div>
            <div>
              {currency === 'THB'
                ? parseFloat(rates?.sellingRate).toFixed(2)
                : parseFloat(rates?.buyingRate).toFixed(2)}
            </div>
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
              {currency === 'THB' && rates
                ? parseFloat(1 / rates?.sellingRate).toFixed(2)
                : parseFloat(rates?.buyingRate).toFixed(2)}{' '}
              {currency === 'THB' ? 'MYR' : 'THB'}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

export default Receipt;
