import React from 'react';
import { useTranslation } from 'react-i18next';

const LangSwitch = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  return (
    <div className='flex'>
      <button
        onClick={() => handleChangeLanguage('th')}
        className={`px-2 py-1 text-sm rounded-l-lg ${
          i18n.language === 'th'
            ? 'bg-[#1976d2] text-white'
            : 'bg-gray-200 text-gray-800'
        } hover:bg-blue-600 hover:text-white focus:outline-none`}
      >
        TH
      </button>
      <button
        onClick={() => handleChangeLanguage('en')}
        className={`px-2 py-1 text-sm rounded-r-lg ${
          i18n.language === 'en'
            ? 'bg-[#1976d2] text-white'
            : 'bg-gray-200 text-gray-800'
        } hover:bg-blue-600 hover:text-white focus:outline-none`}
      >
        EN
      </button>
    </div>
  );
};

export default LangSwitch;
