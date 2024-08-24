import { openDB } from './db';
import { format } from 'date-fns';

export async function saveTransaction(currency, amount, toAmount, rate) {
  const db = await openDB();
  const date = format(new Date(), 'yyyy-MM-dd');
  const time = new Date().getTime();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['transactions'], 'readwrite');
    const store = transaction.objectStore('transactions');

    const data = {
      currency,
      amount,
      toAmount,
      rate,
      date,
      time,
    };

    const request = store.put(data);

    request.onsuccess = (event) => {
      const id = event.target.result;
      const receiptNo = `PE${String(id).padStart(6, '0')}`;

      // Update the transaction with the generated receiptNo
      const updateTransaction = db.transaction(['transactions'], 'readwrite');
      const updateStore = updateTransaction.objectStore('transactions');
      const updatedData = { ...data, id, receiptNo }; // Ensure 'id' is the key and 'receiptNo' is stored
      const updateRequest = updateStore.put(updatedData);

      updateRequest.onsuccess = () => {
        resolve({
          status: 200,
          message: 'Transaction added and updated successfully',
          data: { receiptNo: receiptNo },
        });
      };

      updateRequest.onerror = () => {
        reject({
          status: 500,
          message: 'Error updating transaction with receiptNo',
        });
      };
    };

    request.onerror = () => {
      reject({ status: 500, message: 'Error adding transaction' });
    };
  });
}

export async function getTransactions(date) {
  const db = await openDB();
  const tx = db.transaction('transactions', 'readonly');
  const store = tx.objectStore('transactions');

  return new Promise((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => {
      const allTransactions = request.result;

      if (date) {
        // Filter transactions by the specified date
        const filteredTransactions = allTransactions.filter(
          (transaction) => transaction.date === date,
        );
        resolve(filteredTransactions);
      } else {
        // If no date is provided, return all transactions
        resolve(allTransactions);
      }
    };

    request.onerror = () => {
      console.error('Error retrieving transactions:', request.error);
      reject([]);
    };
  });
}

export async function deleteTransaction(id) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['transactions'], 'readwrite');
    const store = transaction.objectStore('transactions');

    const request = store.delete(id);

    request.onsuccess = () => {
      resolve({ status: 200, message: 'Transaction deleted successfully' });
    };

    request.onerror = () => {
      reject({ status: 500, message: 'Error deleting transaction' });
    };
  });
}
