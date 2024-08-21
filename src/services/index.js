import * as AddressService from './addressService';
import * as CashFloatService from './cashFloatService';
import * as RateService from './rateService';
import * as SummaryService from './summaryService';
import * as TransactionService from './transactionService';

export {
  AddressService,
  CashFloatService,
  RateService,
  SummaryService,
  TransactionService,
};

// import { AddressService } from './service';

// // Add a new address
// AddressService.addAddress('123 Main St, Springfield, USA')
//   .then(console.log)
//   .catch(console.error);

// // Get an address by ID
// AddressService.getAddress(1)
//   .then(address => console.log('Address:', address))
//   .catch(console.error);

// // Update an existing address
// AddressService.updateAddress(1, '456 Elm St, Springfield, USA')
//   .then(console.log)
//   .catch(console.error);
