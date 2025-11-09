import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { default as Config } from 'react-native-config';
import type { RootStackParamList } from '@src/navigation';
import {
  NetworkLogs,
  Landing,
  Signup,
  SignIn,
  ForgotPassword,
  OtpVerification,
  ResetPassword,
  ResetPasswordSuccess,
  Splash,
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
    {/* Auth screens - no tab bar */}
    <stack.Screen name="login" component={SignIn} />
    <stack.Screen name="signup" component={Signup} />
    <stack.Screen name="landing" component={Landing} />
    <stack.Screen name="forgotPassword" component={ForgotPassword} />
    <stack.Screen name="otpVerification" component={OtpVerification} />
    <stack.Screen name="resetPassword" component={ResetPassword} />
    <stack.Screen
      name="resetPasswordSuccess"
      component={ResetPasswordSuccess}
    />
    {/* Main app with tab bar */}
    <stack.Screen name="home" component={TabNavigator} />
    {/* Navigators */}
    {/* TODO: Add nested navigators here. */}

    {/* Modals */}
  </stack.Navigator>
));
