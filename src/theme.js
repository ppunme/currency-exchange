import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif, Sarabun',
    allVariants: {
      color: '#111827', // Set default text color
    },
  },
  palette: {
    primary: {
      main: '#3b82f6', // Your custom primary color
    },
    secondary: {
      main: '#ff4081', // Custom secondary color (optional)
    },
  },
});

export default theme;
