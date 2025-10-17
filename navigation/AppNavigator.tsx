import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainerRef } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ConsentScreen from '../screens/ConsentScreen';
import MainScreen from '../screens/MainScreen';
import TestListScreen from '../screens/TestListScreen';
import TestInterfaceScreen from '../screens/TestInterfaceScreen';
import ResultsScreen from '../screens/ResultsScreen';
import HelpScreen from '../screens/HelpScreen';
import SOSScreen from '../screens/SOSScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Consent: undefined;
  Main: undefined;
  Home: undefined;
  TestList: undefined;
  TestInterface: { testId: string; testName: string };
  Results: { testId: string; testName: string; score: number; predictionData?: any; error?: string };
  Help: undefined;
  SOS: undefined;
  History: undefined;
  Profile: undefined;
  Settings: undefined;
  About: undefined;
  Report: { score: number; date: string };
  ReportDetail: { date: string; score: number };
  Summary: { scores: number[] };
  Scoring: { score: number; testName: string };
  TestSequence: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4A90E2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerShadowVisible: false,
        cardStyle: { backgroundColor: '#F8F9FA' },
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        options={{ 
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
        options={{ title: 'Create Account' }}
      />
      <Stack.Screen 
        name="Consent" 
        component={ConsentScreen}
        options={{ title: 'Assessment Consent' }}
      />
      <Stack.Screen 
        name="Main" 
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Dashboard' }}
      />
      <Stack.Screen 
        name="TestList" 
        component={TestListScreen}
        options={{ title: 'Cognitive Tests' }}
      />
      <Stack.Screen 
        name="TestInterface" 
        component={TestInterfaceScreen}
        options={({ route }) => ({ title: route.params.testName })}
      />
      <Stack.Screen 
        name="Results" 
        component={ResultsScreen}
        options={{ title: 'Test Results' }}
      />
      <Stack.Screen 
        name="Help" 
        component={HelpScreen}
        options={{ title: 'Help' }}
      />
      <Stack.Screen 
        name="SOS" 
        component={SOSScreen}
        options={{ title: 'Emergency Help' }}
      />
      <Stack.Screen 
        name="History" 
        component={HistoryScreen}
        options={{ title: 'Test History' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'User Profile' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen 
        name="About" 
        component={AboutScreen}
        options={{ title: 'About Alzico' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator; 