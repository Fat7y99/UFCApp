import {
  useLocalStorageString,
  getLocalStorageString,
  setLocalStorageString,
  deleteLocalStorageItem,
  LocalStorageKeys,
} from '@modules/core';

const getLogMessage = (message: string) =>
  `## LocalStorage::refreshToken:: ${message}`;

export const useLocalStorageRefreshToken = () =>
  useLocalStorageString(LocalStorageKeys.REFRESH_TOKEN);

export const getRefreshToken = () => {
  console.info(getLogMessage('getRefreshToken'));
  const refreshToken = getLocalStorageString(LocalStorageKeys.REFRESH_TOKEN);
  console.info(getLogMessage('refreshToken'), refreshToken);
  return refreshToken;
};

export const setRefreshToken = (refreshToken: string) => {
  console.info(getLogMessage('setRefreshToken'), refreshToken);
  setLocalStorageString(LocalStorageKeys.REFRESH_TOKEN, refreshToken);
};

export const removeRefreshToken = () => {
  console.info(getLogMessage('removeRefreshToken'));
  deleteLocalStorageItem(LocalStorageKeys.REFRESH_TOKEN);
};
