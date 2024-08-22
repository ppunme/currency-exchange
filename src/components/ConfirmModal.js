import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

const ConfirmModal = ({
  title,
  text,
  open,
  onClose,
  onSave,
  color = 'primary',
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={Boolean(open)}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id='alert-dialog-description'
          className='!text-gray-900'
        >
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions className='flex mt-2 space-x-2'>
        <Button
          disableElevation
          onClick={onClose}
          variant='outlined'
          color='primary'
          className='w-full'
        >
          {t('cancel')}
        </Button>
        <Button
          disableElevation
          onClick={onSave}
          variant='contained'
          color={color ? color : 'primary'}
          className={`${
            color && color === 'error'
              ? 'hover:!bg-red-600'
              : 'hover:!bg-blue-600'
          } w-full`}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
