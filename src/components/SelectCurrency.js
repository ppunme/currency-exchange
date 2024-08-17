import React from 'react';
import { useNavigate } from 'react-router-dom';
import Flag from './Flag';

const CurrencyCard = ({ currency, onSelect }) => (
  <div
    className='cursor-pointer w-36 h-36 text-2xl rounded-xl font-bold hover:opacity-90 flex flex-col items-center justify-center space-y-2 border bg-white hover:shadow-lg'
    onClick={() => onSelect(currency)}
  >
    <Flag currency={currency} width={50} />
    <p>{currency}</p>
  </div>
);

const SelectCurrency = () => {
  const navigate = useNavigate();

  const handleSelection = (currency) => {
    navigate(`/calculate/${currency}`);
  };

  const currencies = ['THB', 'MYR'];

  return (
    <div className='flex justify-center space-x-6'>
      {currencies.map((currency) => (
        <CurrencyCard
          key={currency}
          currency={currency}
          onSelect={handleSelection}
        />
      ))}
    </div>
  );
};

export default SelectCurrency;
