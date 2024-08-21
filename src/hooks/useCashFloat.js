import { useState, useEffect } from 'react';
import { CashFloatService } from '../services';

export function useCashFloat(date) {
  const [cashFloat, setCashFloat] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCashFloat() {
      if (date) {
        setLoading(true);
        const fetchedCashFloat = await CashFloatService.getCashFloat(date);
        setCashFloat(fetchedCashFloat);
      }
      setLoading(false);
    }
    fetchCashFloat();
  }, [date]);

  return { cashFloat, loading };
}
