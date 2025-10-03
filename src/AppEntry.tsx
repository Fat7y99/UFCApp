import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import * as React from 'react';
import { enableScreens } from 'react-native-screens';

enableScreens();

function getLogMessage(message: string) {
  return `## AppEntry:: ${message}`;
}

// Register background handler for firebase messages.
setBackgroundMessageHandler(getMessaging(), async remoteMessage => {
  console.info(getLogMessage('BackgroundMessageHandler'), remoteMessage);
});

// Set base dimensions for responsive components.
ResponsiveDimensions.setBaseDimensions(
  // TODO: Replace with your app's base dimensions (Figma screen size).
  { width: 375, height: 971 },
);
import App from '@src/App';
function AppEntry({ isHeadless }: Readonly<{ isHeadless?: boolean }>) {
  // if (isHeadless) {
  //   // App has been launched in the background by iOS, ignore.
  //   return null;
  // }

  // const App = React.lazy(() => import('@src/App'));

  return (
    <React.Suspense>
      <App />
    </React.Suspense>
  );
}

export default AppEntry;
