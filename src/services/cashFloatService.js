import { openDB } from './db';
import { format } from 'date-fns';

export async function saveCashFloat(thb, myr) {
  const db = await openDB();
  const date = format(new Date(), 'yyyy-MM-dd');

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['cashfloats'], 'readwrite');
    const store = transaction.objectStore('cashfloats');

    const data = { date, thb, myr };
    const request = store.put(data);

    request.onsuccess = () => {
      resolve({ status: 200, message: 'Cash float updated successfully' });
    };

    request.onerror = () => {
      reject({ status: 500, message: 'Error updating cash float' });
    };
  });
}

export async function getCashFloat(date) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('cashfloats', 'readonly');
    const store = transaction.objectStore('cashfloats');
    const request = store.get(date);

    request.onsuccess = () => {
      resolve(request.result); // Resolve with the result of the request
    };

    request.onerror = (event) => {
      reject('Error fetching cash float');
    };
  });
}
