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

  return (
    <ChangePasswordContext.Provider
      value={{
        currentPassword,
        newPassword,
        confirmPassword,
        setCurrentPassword,
        setNewPassword,
        setConfirmPassword,
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
