import { useState, useEffect } from 'react';
import { SummaryService } from '../services';
import useStore from '../store/store';

export function useSummary(date) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cashFloat } = useStore();

  useEffect(() => {
    async function fetchSummary() {
      if (date) {
        const fetchedSummary = await SummaryService.getSummary(date);
        setSummary(fetchedSummary);
      }
      setLoading(false);
    }
    fetchSummary();
  }, [date, cashFloat]);

  return { summary, loading };
}
