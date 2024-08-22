import React from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Address from './Address';
import DeleteDB from './DeleteDB';
import { HomeWorkRounded, FolderCopyRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Helper function to determine if the menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className='flex bg-white min-h-[calc(100vh-12rem)] rounded-md'>
      {/* Sidebar */}
      <List
        component='nav'
        className='sm:w-[220px] mr-4 bg-white rounded-lg !pt-8 !px-4'
      >
        <ListItemButton
          onClick={() => navigate('/settings')}
          className={`${
            isActive('/settings')
              ? '!bg-blue-500 hover:!bg-blue-600'
              : 'bg-inherit'
          } !rounded-md`}
          color='primary'
        >
          <ListItemIcon
            className={`${
              isActive('/settings') ? '!text-white' : '!text-gray-800'
            } !min-w-0 sm:!min-w-12`}
          >
            <HomeWorkRounded />
          </ListItemIcon>
          <ListItemText
            primary={t('address')}
            disableTypography
            className={`${
              isActive('/settings') ? 'text-white' : 'text-gray-800'
            } font-medium hidden sm:block`}
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate('/settings/delete-db')}
          className={`${
            isActive('/settings/delete-db')
              ? '!bg-blue-500 hover:!bg-blue-600'
              : 'bg-inherit'
          } !rounded-md`}
        >
          <ListItemIcon
            className={`${
              isActive('/settings/delete-db') ? '!text-white' : '!text-gray-800'
            } !min-w-0 sm:!min-w-12`}
          >
            <FolderCopyRounded />
          </ListItemIcon>
          <ListItemText
            primary={t('database')}
            disableTypography
            className={`${
              isActive('/settings/delete-db') ? 'text-white' : 'text-gray-800'
            } font-medium hidden sm:block`}
          />
        </ListItemButton>
      </List>

      {/* Content Area */}
      <div className='flex-1 pt-8 pb-6 px-6'>
        <Routes>
          <Route path='' element={<Address />} />
          <Route path='delete-db' element={<DeleteDB />} />
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
