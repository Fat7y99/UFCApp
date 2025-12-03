import notifee from '@notifee/react-native';
import * as React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// #region Logger
const getLogMessage = (message: string) =>
  `## App::useAppPermissions:: ${message}`;
// #endregion

/**
 * Hook to request and manage app permissions (notifications and photos/media)
 * Uses native modals for permission requests
 */
export const useAppPermissions = (fromApp?: boolean) => {
  const [permissionsRequested, setPermissionsRequested] = React.useState(false);

  /**
   * Check notification permission status without requesting
   * iOS: Uses Notifee getNotificationSettings (doesn't show modal)
   * Android: Uses PermissionsAndroid.check (doesn't show modal)
   */
  const checkNotificationPermission = React.useCallback(async () => {
    try {
      if (Platform.OS === 'ios') {
        // Check iOS notification permission status without requesting
        const settings = await notifee.getNotificationSettings();

        // Check authorization status (1 = AUTHORIZED, 2 = PROVISIONAL, 0 = DENIED, -1 = NOT_DETERMINED)
        const authorizationStatus = settings.authorizationStatus;
        const enabled = authorizationStatus === 1 || authorizationStatus === 2;

        console.info(
          getLogMessage('iOS notification permission status (checked)'),
          authorizationStatus,
          enabled,
        );

        return enabled;
      } else if (Platform.OS === 'android') {
        // Android 13+ requires POST_NOTIFICATIONS permission
        if (Platform.Version >= 33) {
          const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );

          console.info(
            getLogMessage('Android notification permission status (checked)'),
            hasPermission,
          );

          return hasPermission;
        }
        // Android < 13 doesn't require runtime permission for notifications
        return true;
      }
      return false;
    } catch (error) {
      console.error(
        getLogMessage('Error checking notification permission'),
        error,
      );
      return false;
    }
  }, []);

  /**
   * Request notification permission
   * iOS: Uses Notifee requestPermission (shows native modal)
   * Android: Uses PermissionsAndroid (shows native modal)
   * Only requests if permission is not already granted
   */
  const requestNotificationPermission = React.useCallback(async () => {
    try {
      // First check if permission is already granted
      const hasPermission = await checkNotificationPermission();
      if (hasPermission) {
        console.info(
          getLogMessage(
            'Notification permission already granted, skipping request',
          ),
        );
        return true;
      }

      if (Platform.OS === 'ios') {
        // Use Notifee to request iOS notification permissions
        // This will show the native iOS permission modal
        const settings = await notifee.requestPermission();

        // Check authorization status (1 = AUTHORIZED, 2 = PROVISIONAL, 0 = DENIED, -1 = NOT_DETERMINED)
        const authorizationStatus = settings.authorizationStatus;
        const enabled = authorizationStatus === 1 || authorizationStatus === 2;

        console.info(
          getLogMessage('iOS notification permission status'),
          authorizationStatus,
          enabled,
        );

        if (!enabled) {
          console.warn(getLogMessage('iOS Notifications permission denied'));
        }

        return enabled;
      } else if (Platform.OS === 'android') {
        // Android 13+ requires POST_NOTIFICATIONS permission
        if (Platform.Version >= 33) {
          const androidPermissionStatus = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );

          console.info(
            getLogMessage('Android notification permission status'),
            androidPermissionStatus,
          );

          return androidPermissionStatus === PermissionsAndroid.RESULTS.GRANTED;
        }
        // Android < 13 doesn't require runtime permission for notifications
        return true;
      }
      return false;
    } catch (error) {
      console.error(
        getLogMessage('Error requesting notification permission'),
        error,
      );
      return false;
    }
  }, [checkNotificationPermission]);

  /**
   * Check photo/media library permission status without requesting
   * iOS: Uses react-native-permissions check (doesn't show modal)
   * Android: Uses PermissionsAndroid.check (doesn't show modal)
   */
  const checkPhotoPermission = React.useCallback(async () => {
    try {
      if (Platform.OS === 'ios') {
        // Check iOS photo permission status without requesting
        const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

        // GRANTED means full access to all photos
        // LIMITED means access only to selected photos (iOS enforces this at system level)
        const hasPermission = result === RESULTS.GRANTED;
        const hasLimitedAccess = result === RESULTS.LIMITED;

        console.info(
          getLogMessage('iOS photo permission status (checked)'),
          result,
          `Full access: ${hasPermission}, Limited access: ${hasLimitedAccess}`,
        );

        // Return true for both GRANTED and LIMITED
        // iOS enforces limited access - app can only access selected photos when LIMITED
        return hasPermission || hasLimitedAccess;
      } else if (Platform.OS === 'android') {
        // Android 13+ uses READ_MEDIA_IMAGES
        // Android < 13 uses READ_EXTERNAL_STORAGE
        let permission: (typeof PermissionsAndroid.PERMISSIONS)[keyof typeof PermissionsAndroid.PERMISSIONS];

        if (Platform.Version >= 33) {
          permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
        } else {
          permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        }

        const hasPermission = await PermissionsAndroid.check(permission);

        console.info(
          getLogMessage('Android photo permission status (checked)'),
          hasPermission,
        );

        return hasPermission;
      }
      return false;
    } catch (error) {
      console.error(getLogMessage('Error checking photo permission'), error);
      return false;
    }
  }, []);

  /**
   * Request photo/media library permission
   * iOS: Triggers native permission modal via image picker (shows native modal)
   * Android: Uses PermissionsAndroid (shows native modal)
   * Only requests if permission is not already granted
   */
  const requestPhotoPermission = React.useCallback(async () => {
    try {
      // First check if permission is already granted (Android only, iOS will check during request)
      const hasPermission = await checkPhotoPermission();
      if (hasPermission) {
        console.info(
          getLogMessage('Photo permission already granted, skipping request'),
        );
        return true;
      }

      if (Platform.OS === 'ios') {
        // Use react-native-permissions to request iOS photo permissions
        // This will show the native iOS permission modal with options:
        // - "Select Photos..." (limited access) -> RESULTS.LIMITED
        // - "Allow Access to All Photos" (full access) -> RESULTS.GRANTED
        const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

        // Only GRANTED means full access to all photos
        // LIMITED means access only to selected photos (iOS enforces this)
        const isGranted = result === RESULTS.GRANTED;
        const isLimited = result === RESULTS.LIMITED;

        console.info(
          getLogMessage('iOS photo permission status'),
          result,
          `Full access: ${isGranted}, Limited access: ${isLimited}`,
        );

        if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
          console.warn(getLogMessage('iOS photo permission denied'));
          return false;
        }

        // Return true for both GRANTED and LIMITED
        // LIMITED access is enforced by iOS - app can only access selected photos
        // This allows the app to proceed with image picker, which respects limited access
        return isGranted || isLimited;
      } else if (Platform.OS === 'android') {
        // Android 13+ uses READ_MEDIA_IMAGES
        // Android < 13 uses READ_EXTERNAL_STORAGE
        let permission: (typeof PermissionsAndroid.PERMISSIONS)[keyof typeof PermissionsAndroid.PERMISSIONS];

        if (Platform.Version >= 33) {
          permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
        } else {
          permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        }

        const androidPermissionStatus =
          await PermissionsAndroid.request(permission);

        console.info(
          getLogMessage('Android photo permission status'),
          androidPermissionStatus,
        );

        return androidPermissionStatus === PermissionsAndroid.RESULTS.GRANTED;
      }
      return false;
    } catch (error) {
      console.error(getLogMessage('Error requesting photo permission'), error);
      return false;
    }
  }, [checkPhotoPermission]);

  /**
   * Request all app permissions
   * This will show native modals sequentially
   */
  const requestAllPermissions = React.useCallback(async () => {
    if (permissionsRequested) {
      console.info(getLogMessage('Permissions already requested, skipping'));
      return;
    }

    console.info(getLogMessage('Requesting all app permissions'));

    try {
      // Request notification permission first
      await requestNotificationPermission();

      // Small delay to avoid showing both modals simultaneously
      await new Promise(resolve => setTimeout(resolve, 500));

      // Request photo permission
      // await requestPhotoPermission();

      setPermissionsRequested(true);
      console.info(getLogMessage('All permissions requested'));
    } catch (error) {
      console.error(getLogMessage('Error requesting all permissions'), error);
    }
  }, [
    permissionsRequested,
    requestNotificationPermission,
    // requestPhotoPermission,
  ]);

  /**
   * Initialize permissions on app start
   * Requests permissions after a short delay to ensure app is fully loaded
   */
  React.useEffect(() => {
    const initializePermissions = async () => {
      // Wait a bit for app to fully initialize
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Request all permissions
      await requestAllPermissions();
    };
    if (fromApp) {
      initializePermissions();
    }
  }, [requestAllPermissions, fromApp]);

  return {
    checkNotificationPermission,
    requestNotificationPermission,
    checkPhotoPermission,
    requestPhotoPermission,
    requestAllPermissions,
  };
};
