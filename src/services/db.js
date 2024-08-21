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

export function deleteDB() {
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase('exchangeDB');

    deleteRequest.onsuccess = () => {
      console.log('Database deleted successfully');
      resolve();
    };

    deleteRequest.onerror = (event) => {
      console.error('Error deleting database:', event.target.errorCode);
      reject(event.target.errorCode);
    };

    deleteRequest.onblocked = () => {
      console.warn(
        'Delete operation blocked. Close all other tabs using this database.',
      );
    };
  });
}
