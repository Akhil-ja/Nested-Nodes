import React, { useState } from 'react';
import Notification from '../components/Notification';
import { NotificationContext } from './notificationContext';

export const NotificationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const showNotification = (msg, sev) => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setMessage('');
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        open={open}
        message={message}
        severity={severity}
        handleClose={handleClose}
      />
    </NotificationContext.Provider>
  );
};