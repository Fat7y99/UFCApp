import * as React from 'react';
import {
  useAppDispatch,
  removeIsConnectionExpensive,
  setIsConnectionExpensive,
  setIsInternetAvailable,
} from '@src/store';
import type { NetInfoState } from '@react-native-community/netinfo';

export const useHandleNetworkState = () => {
  // #region Logger
  const getLogMessage = (message: string) =>
    `## App::useHandleNetworkState:: ${message}`;
  // #endregion

  // #region Redux
  const dispatch = useAppDispatch();
  // #endregion

  const checkInternetAvailableState = React.useCallback(
    (state: NetInfoState) => {
      console.info(getLogMessage('checkInternetAvailableState'));
      console.info(getLogMessage('state'), state);

      const isInternetAvailable =
        state.isConnected && state.isInternetReachable;

      console.info(getLogMessage('isInternetAvailable'), isInternetAvailable);
      dispatch(setIsInternetAvailable(isInternetAvailable ?? true));
      return isInternetAvailable;
    },
    [dispatch],
  );

  const checkConnectionExpensiveState = React.useCallback(
    (state: NetInfoState) => {
      console.info(getLogMessage('checkConnectionExpensiveState'));
      console.info(getLogMessage('state'), state);
      const isConnectionExpensive = state.details?.isConnectionExpensive;
      console.info(
        getLogMessage('isConnectionExpensive'),
        isConnectionExpensive,
      );

      if (isConnectionExpensive === undefined) {
        dispatch(removeIsConnectionExpensive());
      } else {
        dispatch(setIsConnectionExpensive(isConnectionExpensive));
      }
    },
    [dispatch],
  );

  /**
   * handleNetworkState
   *
   * Save network state to redux store.
   *
   * @param state The new network state to handle.
   */
  const handleNetworkState = React.useCallback(
    (state: NetInfoState) => {
      console.info(getLogMessage('handleNetworkState'));
      console.info(getLogMessage('state'), state);

      // Check Internet available state.
      checkInternetAvailableState(state);

      // Check connection expensive state.
      checkConnectionExpensiveState(state);
    },
    [checkConnectionExpensiveState, checkInternetAvailableState],
  );

  return handleNetworkState;
};
