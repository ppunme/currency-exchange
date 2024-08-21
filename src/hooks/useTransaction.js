import { useState, useEffect } from 'react';
import { TransactionService } from '../services';

export function useTransactions(date = null) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      const fetchedTransactions = await TransactionService.getTransactions(
        date,
      );
      setTransactions(fetchedTransactions);
      setLoading(false);
    }
    fetchTransactions();
  }, [date]);

  return { transactions, loading };
}
