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
    {/* Navigators */}
    {/* TODO: Add nested navigators here. */}

    {/* Modals */}
    <stack.Group screenOptions={{ presentation: 'transparentModal' }}>
      <>{/* TODO: Add modals screens here. */}</>
    </stack.Group>
  </stack.Navigator>
));
