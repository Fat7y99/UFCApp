import { configureStore } from '@reduxjs/toolkit';
import { default as Config } from 'react-native-config';
import { default as logger } from 'redux-logger';
import dialogsReducer from './dialogs';
import networkStateReducer from './networkState';
import notificationsReducer from './notifications';
import personalFormReducer from './personalForm';
import realEstateFormReducer from './realEstateForm';
import smeFormReducer from './smeForm';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    dialogs: dialogsReducer,
    networkState: networkStateReducer,
    notifications: notificationsReducer,
    smeForm: smeFormReducer,
    realEstateForm: realEstateFormReducer,
    personalForm: personalFormReducer,
  },
  middleware: getDefaultMiddleware =>
    Config.ENABLE_LOCAL_LOG === 'true'
      ? getDefaultMiddleware().concat(
          logger as unknown as ReturnType<typeof getDefaultMiddleware>,
        )
      : getDefaultMiddleware(),
});

// Types exports.
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Hooks export.
export * from './hooks';

// Reducers exports.
export * from './dialogs';
export * from './networkState';
export * from './user';
export * from './notifications';
export * from './smeForm';
// Note: realEstateForm exports are not re-exported here to avoid conflicts with smeForm
// Import directly from './realEstateForm' when needed
