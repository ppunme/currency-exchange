import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Address from './Address';
import DeleteDB from './DeleteDB';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to determine if the menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className='flex h-full'>
      {/* Sidebar */}
      <List component='nav' className='w-[200px] mr-4 bg-white rounded-lg'>
        <ListItemButton
          onClick={() => navigate('/settings')}
          sx={{
            backgroundColor: isActive('/settings') ? '#f0f0f0' : 'inherit',
          }}
        >
          <ListItemText primary='Address' />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/settings/delete-db')}>
          <ListItemText primary='DeleteDB' />
        </ListItemButton>
      </List>

      {/* Content Area */}
      <div className='flex-1 bg-white h-full'>
        <Routes>
          <Route path='' element={<Address />} />
          <Route path='delete-db' element={<DeleteDB />} />
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
