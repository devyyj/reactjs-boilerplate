// NotificationContext.jsx
import React, { createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// NotificationContext 생성
const NotificationContext = createContext();

// NotificationProvider 컴포넌트
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  // 알림을 띄우는 함수
  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  // 알림 닫는 함수
  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {/* Snackbar와 Alert를 사용한 알림 UI */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

// useNotification 훅: 알림을 띄울 수 있도록 제공
export const useNotification = () => useContext(NotificationContext);
