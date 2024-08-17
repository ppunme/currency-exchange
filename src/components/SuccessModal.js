import React, { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

const SuccessModal = ({ open, onClose, title, message }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      // Automatically close the modal after 2 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Transition
      show={open} // Add the show prop here
      enter='transition-opacity duration-200'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-200'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      className='fixed inset-0 flex items-center justify-center z-50'
    >
      <div className='fixed inset-0 flex items-center justify-center'>
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75'
          aria-hidden='true'
        ></div>
        <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative'>
          <h2 className='text-2xl font-bold text-teal-500'>
            {title || t('success')}
          </h2>
          <p className='mt-2 text-gray-700'>
            {message || t('successfullySaved')}
          </p>
        </div>
      </div>
    </Transition>
  );
};

export default SuccessModal;
