import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ChangePasswordContextType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  setCurrentPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
}

const ChangePasswordContext = createContext<
  ChangePasswordContextType | undefined
>(undefined);

export const ChangePasswordProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onOldPasswordChange = (password: string) => {
    //don't allow arabic characters
    if (password.match(/[\u0600-\u06FF]/)) {
      return;
    }
    setCurrentPassword(password);
  };
  const onNewPasswordChange = (password: string) => {
    //don't allow arabic characters
    if (password.match(/[\u0600-\u06FF]/)) {
      return;
    }
    setNewPassword(password);
  };
  const onConfirmPasswordChange = (password: string) => {
    //don't allow arabic characters
    if (password.match(/[\u0600-\u06FF]/)) {
      return;
    }
    setConfirmPassword(password);
  };
  return (
    <ChangePasswordContext.Provider
      value={{
        currentPassword,
        newPassword,
        confirmPassword,
        setCurrentPassword: onOldPasswordChange,
        setNewPassword: onNewPasswordChange,
        setConfirmPassword: onConfirmPasswordChange,
      }}
    >
      {children}
    </ChangePasswordContext.Provider>
  );
};

export const useChangePasswordContext = () => {
  const context = useContext(ChangePasswordContext);
  if (!context) {
    throw new Error(
      'useChangePasswordContext must be used within ChangePasswordProvider',
    );
  }
  return context;
};
