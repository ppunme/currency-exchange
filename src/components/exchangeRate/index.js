import React, { useState, useEffect } from 'react';
import useStore from '../../store/store';
import { getRates } from '../../services/rateService';

const ExchangeRates = () => {
  const { rates, setRates } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const response = await getRates();
        setRates({
          date: response.date,
          buyingRate: response.buyingRate,
          sellingRate: response.sellingRate,
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching exchange rates');
        setLoading(false);
      }
    };

    fetchRates();
  }, [setRates]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className='grid grid-cols-2 text-center bg-white mt-2 w-60 ml-auto'>
        <div className='border-b-2 bg-blue-100 px-4'>Buying Rate</div>
        <div className='border-b-2 bg-blue-100 px-4'>Selling Rate</div>
        <div>{rates ? rates.buyingRate : null}</div>
        <div>{rates ? rates.sellingRate : null}</div>
      </div>
      <p className='text-end text-neutral-400 text-xs'>
        {rates && rates.date ? `Last updated: ${rates.date}` : null}
      </p>
    </div>
  );
};

export default ExchangeRates;
