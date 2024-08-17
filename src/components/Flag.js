import { Avatar } from '@mui/material';
import flagTh from '../assets/flag-th.png';
import flagMy from '../assets/flag-my.png';

const Flag = ({ currency, width = 36 }) => {
  const flagSrc =
    currency === 'THB' ? flagTh : currency === 'MYR' ? flagMy : '';

  return (
    <Avatar
      alt={`flag-${currency}`}
      src={flagSrc}
      sx={{ width, height: width }}
    />
  );
};

export default Flag;
