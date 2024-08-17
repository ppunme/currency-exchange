import { openDB } from './db';

export async function getSummary(selectedDate) {
  const db = await openDB();
  const summary = {
    thb: {
      startAmount: 0,
      received: 0,
      paid: 0,
      leftAmount: 0,
    },
    myr: {
      startAmount: 0,
      received: 0,
      paid: 0,
      leftAmount: 0,
    },
  };

  return new Promise(async (resolve, reject) => {
    const transaction = db.transaction(
      ['transactions', 'cashfloats'],
      'readonly',
    );
    const transactionStore = transaction.objectStore('transactions');
    const cashFloatStore = transaction.objectStore('cashfloats');

    let cashFloatLoaded = false;
    let transactionsLoaded = false;

    // Load cash floats
    const cashFloatRequest = cashFloatStore.get(selectedDate);
    cashFloatRequest.onsuccess = (event) => {
      const cashFloat = event.target.result;
      if (cashFloat) {
        summary.thb.startAmount = parseFloat(cashFloat.thb) || 0;
        summary.myr.startAmount = parseFloat(cashFloat.myr) || 0;
      }
      cashFloatLoaded = true;
      if (cashFloatLoaded && transactionsLoaded) {
        // Calculate left amounts
        summary.thb.leftAmount =
          summary.thb.startAmount + summary.thb.received - summary.thb.paid;
        summary.myr.leftAmount =
          summary.myr.startAmount + summary.myr.received - summary.myr.paid;
        resolve(summary);
      }
    };

    cashFloatRequest.onerror = () => {
      console.error('Error retrieving cash float:', cashFloatRequest.error);
      reject('Error retrieving cash float');
    };

    // Load transactions
    const transactionsRequest = transactionStore.getAll();
    transactionsRequest.onsuccess = () => {
      const allTransactions = transactionsRequest.result;
      if (selectedDate) {
        // Filter transactions by the specified date
        const filteredTransactions = allTransactions.filter(
          (transaction) => transaction.date === selectedDate,
        );
        filteredTransactions.forEach((tx) => {
          if (tx.currency === 'THB') {
            summary.thb.received += parseFloat(tx.amount) || 0;
            summary.myr.paid += parseFloat(tx.toAmount) || 0;
          } else if (tx.currency === 'MYR') {
            summary.myr.received += parseFloat(tx.amount) || 0;
            summary.thb.paid += parseFloat(tx.toAmount) || 0;
          }
        });
      }

      transactionsLoaded = true;
      if (cashFloatLoaded && transactionsLoaded) {
        // Calculate left amounts
        summary.thb.leftAmount =
          summary.thb.startAmount + summary.thb.received - summary.thb.paid;
        summary.myr.leftAmount =
          summary.myr.startAmount + summary.myr.received - summary.myr.paid;
        resolve(summary);
      }
    };

    transactionsRequest.onerror = () => {
      console.error(
        'Error retrieving transactions:',
        transactionsRequest.error,
      );
      reject('Error retrieving transactions');
    };
  });
}
