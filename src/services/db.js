export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('exchangeDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('rates')) {
        db.createObjectStore('rates', { keyPath: 'date' });
      }
      if (!db.objectStoreNames.contains('transactions')) {
        db.createObjectStore('transactions', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains('cashfloats')) {
        db.createObjectStore('cashfloats', { keyPath: 'date' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.errorCode);
    };
  });
}
