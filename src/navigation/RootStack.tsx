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
    <stack.Screen name="notificationDetails" component={NotificationDetails} />
    <stack.Screen name="landing" component={Landing} />
    <stack.Screen name="forgotPassword" component={ForgotPassword} />
    <stack.Screen name="otpVerification" component={OtpVerification} />
    <stack.Screen name="resetPassword" component={ResetPassword} />
    <stack.Screen
      name="resetPasswordSuccess"
      component={ResetPasswordSuccess}
    />
    <stack.Screen name="help" component={Help} />
    <stack.Screen name="faqs" component={FAQs} />
    <stack.Screen name="faqDetails" component={FAQDetails} />
    <stack.Screen name="contactUs" component={ContactUs} />
    <stack.Screen name="changePassword" component={ChangePassword} />
    <stack.Screen name="editProfile" component={EditProfile} />
    <stack.Screen name="smeFinancing" component={SMEFinancing} />
    <stack.Screen name="smeStep1" component={SMEStep1} />
    <stack.Screen name="smeStep2" component={SMEStep2} />
    <stack.Screen name="realEstateFinancing" component={RealEstateFinancing} />
    <stack.Screen name="realEstateStep1" component={RealEstateStep1} />
    <stack.Screen name="realEstateStep2" component={RealEstateStep2} />
    <stack.Screen name="realEstateStep3" component={RealEstateStep3} />
    <stack.Screen name="personalStep1" component={PersonalStep1} />
    <stack.Screen name="personalStep2" component={PersonalStep2} />
    <stack.Screen name="personalStep3" component={PersonalStep3} />
    <stack.Screen name="offers" component={Offers} />
    <stack.Screen name="offerDetails" component={OfferDetails} />
    <stack.Screen name="applyToOffer" component={ApplyToOffer} />
    <stack.Screen name="success" component={Success} />
    {/* Navigators */}
    {/* TODO: Add nested navigators here. */}

    {/* Modals */}
    <stack.Group screenOptions={{ presentation: 'transparentModal' }}>
      <>{/* TODO: Add modals screens here. */}</>
    </stack.Group>
  </stack.Navigator>
));
