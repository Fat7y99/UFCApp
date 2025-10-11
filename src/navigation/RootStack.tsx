import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { default as Config } from 'react-native-config';
import type { RootStackParamList } from '@src/navigation';
import {
  Splash,
  NetworkLogs,
  Notifications,
  Landing,
  Signup,
  SignIn,
  ForgotPassword,
  OtpVerification,
  Help,
  ContactUs,
  ChangePassword,
  EditProfile,
} from '@src/screens';
import TabNavigator from './TabNavigator';

const stack = createNativeStackNavigator<RootStackParamList, 'RootStack'>();

export default React.memo(() => (
  <stack.Navigator
    id="RootStack"
    initialRouteName="splash"
    screenOptions={{ headerShown: false }}
  >
    {/* Screens */}
    <stack.Screen name="splash" component={Splash} />
    {Config.ENABLE_LOCAL_LOG === 'true' ? (
      <stack.Screen name="networkLogs" component={NetworkLogs} />
    ) : null}
    <stack.Screen name="login" component={SignIn} />
    <stack.Screen name="signup" component={Signup} />
    <stack.Screen name="home" component={TabNavigator} />
    <stack.Screen name="notifications" component={Notifications} />
    <stack.Screen name="landing" component={Landing} />
    <stack.Screen name="forgotPassword" component={ForgotPassword} />
    <stack.Screen name="otpVerification" component={OtpVerification} />
    <stack.Screen name="help" component={Help} />
    <stack.Screen name="contactUs" component={ContactUs} />
    <stack.Screen name="changePassword" component={ChangePassword} />
    <stack.Screen name="editProfile" component={EditProfile} />
    {/* Navigators */}
    {/* TODO: Add nested navigators here. */}

    {/* Modals */}
    <stack.Group screenOptions={{ presentation: 'transparentModal' }}>
      <>{/* TODO: Add modals screens here. */}</>
    </stack.Group>
  </stack.Navigator>
));
