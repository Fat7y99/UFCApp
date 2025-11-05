import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { default as Config } from 'react-native-config';
import type { RootStackParamList } from '@src/navigation';
import {
  Splash,
  NetworkLogs,
  Notifications,
  NotificationDetails,
  Landing,
  Signup,
  SignIn,
  ForgotPassword,
  OtpVerification,
  ResetPassword,
  ResetPasswordSuccess,
  Help,
  FAQs,
  FAQDetails,
  ContactUs,
  ChangePassword,
  EditProfile,
  SMEFinancing,
  SMEStep1,
  SMEStep2,
  RealEstateFinancing,
  RealEstateStep1,
  RealEstateStep2,
  RealEstateStep3,
  PersonalStep1,
  PersonalStep2,
  PersonalStep3,
  Offers,
  OfferDetails,
  ApplyToOffer,
  Success,
} from '@src/screens';
import SignUpSuccess from '@src/screens/SignUpSuccess';
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
    <stack.Group screenOptions={{ presentation: 'transparentModal' }}>
      <>{/* TODO: Add modals screens here. */}</>
    </stack.Group>
  </stack.Navigator>
));
