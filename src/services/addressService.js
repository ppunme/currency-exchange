import { openDB } from './db';

export async function addAddress(address) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['addresses'], 'readwrite');
    const store = transaction.objectStore('addresses');
    const request = store.add({ address });

    request.onsuccess = () => {
      resolve('Address added successfully');
    };

    request.onerror = (event) => {
      reject('Failed to add address: ' + event.target.errorCode);
    };
  });
}

export async function getAddress(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['addresses'], 'readonly');
    const store = transaction.objectStore('addresses');
    const request = store.get(id);

    request.onsuccess = (event) => {
      if (event.target.result) {
        resolve(event.target.result);
      } else {
        reject('Address not found');
      }
    };

    request.onerror = (event) => {
      reject('Failed to retrieve address: ' + event.target.errorCode);
    };
  });
}

export async function updateAddress(id, updatedAddress) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['addresses'], 'readwrite');
    const store = transaction.objectStore('addresses');
    const request = store.put({ id, address: updatedAddress });

    request.onsuccess = () => {
      resolve('Address updated successfully');
    };

    request.onerror = (event) => {
      reject('Failed to update address: ' + event.target.errorCode);
    };
  });
}
