/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-primary': '#F5F5F5',
        'background-secondary': '#E0E0E0',
        'text-primary': '#333333',
        'text-secondary': '#666666',
        'yellow-primary': '#F5C000',
        primary: '#818cf8',
        secondary: '#F5B700',
        border: '#DDDDDD',
      },
      fontFamily: {
        sans: ['Roboto', 'Sarabun'],
      },
    },
  },
  plugins: [],
};
