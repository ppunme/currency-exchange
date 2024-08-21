import { openDB } from './db';

export async function addAddress(formValues) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['addresses'], 'readwrite');
    const store = transaction.objectStore('addresses');
    const request = store.put(formValues); // Use put to add or update

    request.onsuccess = () => {
      resolve('Address saved successfully');
    };

    request.onerror = (event) => {
      reject('Failed to save address: ' + event.target.error);
    };
  });
}

export async function getAddress() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['addresses'], 'readonly');
    const store = transaction.objectStore('addresses');
    const request = store.getAll(); // Fetch all records (assuming single record)

    request.onsuccess = () => {
      const addresses = request.result;
      resolve(addresses.length > 0 ? addresses[0] : null); // Return the first address if exists
    };

    request.onerror = (event) => {
      reject('Failed to retrieve address: ' + event.target.error);
    };
  });
}
