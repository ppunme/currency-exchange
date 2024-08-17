import { format } from 'date-fns';

export function saveRates(buyingRate, sellingRate) {
  return new Promise((resolve, reject) => {
    try {
      const date = format(new Date(), 'dd-MM-yyyy');

      const data = { date, buyingRate, sellingRate };
      localStorage.setItem('rates', JSON.stringify(data));

      resolve({ status: 200, message: 'Rates updated successfully' });
    } catch (error) {
      reject({ status: 500, message: 'Error updating rates' });
    }
  });
}

export function getRates() {
  return new Promise((resolve, reject) => {
    try {
      const data = localStorage.getItem('rates');
      if (data) {
        resolve(JSON.parse(data));
      } else {
        // Default values if no data found
        resolve({ date: null, buyingRate: 0, sellingRate: 0 });
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
      reject('Error fetching rates');
    }
  });
}
