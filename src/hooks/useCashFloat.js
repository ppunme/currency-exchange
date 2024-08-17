import { useState, useEffect } from 'react';
import { getCashFloat } from '../services/cashFloatService';

export function useCashFloat(date) {
  const [cashFloat, setCashFloat] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCashFloat() {
      if (date) {
        setLoading(true);
        const fetchedCashFloat = await getCashFloat(date);
        setCashFloat(fetchedCashFloat);
      }
      setLoading(false);
    }
    fetchCashFloat();
  }, [date]);

  return { cashFloat, loading };
}
