import React, { useEffect, useRef } from 'react';
import { AddressService } from '../../services';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Title from '../Title';
import { useTranslation } from 'react-i18next';
import { EditRounded } from '@mui/icons-material';
import Receipt from '../calculate/Receipt';

const Address = () => {
  const { t } = useTranslation();
  const printRef = useRef();

  const defaultAddress = {
    street: '',
    district: '',
    province: '',
    zipcode: '',
    phone: '',
    companyName: '',
    licenseNo: '',
  };
  const [formValues, setFormValues] = React.useState(defaultAddress);
  const [savedAddress, setSavedAddress] = React.useState(null);
  const [editing, setEditing] = React.useState(false);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AddressService.addAddress(formValues);
      // Fetch the updated address after successful submission
      const updatedAddress = await AddressService.getAddress();
      setFormValues(updatedAddress);
      setSavedAddress(updatedAddress);
      setEditing(false);
    } catch (error) {
      console.error('Error adding/updating address:', error);
    }
  };

  useEffect(() => {
    async function fetchAddress() {
      try {
        const address = await AddressService.getAddress();
        if (address) {
          setFormValues(address);
          setSavedAddress(address);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
    fetchAddress();
  }, []);

  return (
    <div className='flex flex-col space-y-4'>
      <Title>{t('address')}</Title>
      {savedAddress && !editing ? (
        <>
          <div>
            <p>{formValues.street},</p>
            <p>{formValues.district},</p>
            <p>
              {formValues.province}, {formValues.zipcode}
            </p>
          </div>
          <Title>{t('companyInfo')}</Title>
          <div>
            <p>
              {t('companyName')} :{' '}
              {formValues.companyName ? formValues.companyName : '-'}
            </p>
            <p>
              {t('licenseNo')} :{' '}
              {formValues.licenseNo ? formValues.licenseNo : '-'}
            </p>
            <p>
              {t('phone')} : {formValues.phone}
            </p>
          </div>
          <div>
            <Button
              disableElevation
              variant='outlined'
              startIcon={<EditRounded />}
              onClick={() => setEditing(true)}
              color='primary'
              className='w-full sm:max-w-32'
            >
              {t('edit')}
            </Button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={t('address')}
                name='street'
                value={formValues.street}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>{t('district')}</InputLabel>
                <Select
                  name='district'
                  value={formValues.district}
                  onChange={handleChange}
                  label={t('district')}
                >
                  <MenuItem value='Su-ngai Kolok'>Su-ngai Kolok</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>{t('province')}</InputLabel>
                <Select
                  name='province'
                  value={formValues.province}
                  onChange={handleChange}
                  label={t('province')}
                >
                  <MenuItem value='Narathiwat'>Narathiwat</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('zipcode')}
                name='zipcode'
                value={formValues.zipcode}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('phone')}
                name='phone'
                value={formValues.phone}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Title>{t('companyInfo')}</Title>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('companyName')}
                name='companyName'
                value={formValues.companyName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('licenseNo')}
                name='licenseNo'
                value={formValues.licenseNo}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disableElevation
                type='submit'
                variant='contained'
                color='primary'
                className='!w-full sm:!max-w-32'
              >
                {t('save')}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      <Title>Receipt Preview</Title>

      <div className='border' style={{ width: '80mm', height: '120mm' }}>
        <Receipt
          ref={printRef}
          currency='THB'
          totalAmount='1000'
          convertedAmount='0'
          rates={{ sellingRate: '7.82', buyingRate: '7.87' }}
          receiptNo='PE000001'
          address={
            savedAddress
              ? savedAddress
              : {
                  companyName: 'Company Name',
                  street: 'Street',
                  district: 'District',
                  province: 'Province',
                  zipcode: 'Zipcode',
                }
          }
        />
      </div>
    </div>
  );
};

export default Address;
