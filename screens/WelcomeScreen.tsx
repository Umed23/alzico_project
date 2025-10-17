import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // Signup state
  const [signupFullName, setSignupFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  // Force focus on this screen and reset any cached state
  useFocusEffect(
    React.useCallback(() => {
      // Reset any cached navigation state
      setActiveTab('login');
      setLoginEmail('');
      setLoginPassword('');
      setSignupFullName('');
      setSignupEmail('');
      setSignupPassword('');
      setSignupConfirmPassword('');
    }, [])
  );

  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoginLoading(true);
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        Alert.alert('Success', 'Login successful!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Consent')
          }
        ]);
      } else {
        Alert.alert('Error', 'Invalid email or password. Try demo@alzico.com / password123');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!signupFullName.trim() || !signupEmail.trim() || !signupPassword.trim() || !signupConfirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (signupPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsSignupLoading(true);
    try {
      const success = await signup(signupEmail, signupPassword, signupFullName);
      if (success) {
        Alert.alert('Success', 'Account created successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Consent')
          }
        ]);
      } else {
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during signup');
    } finally {
      setIsSignupLoading(false);
    }
  };

  const handleLoginSubmitEditing = () => {
    Keyboard.dismiss();
    handleLogin();
  };

  const handleResetApp = () => {
    // Force reset the app to this screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>🧠 Alzico</Text>
          <Text style={styles.subtitle}>Alzheimer's Detection App</Text>
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetApp}
        >
          <Text style={styles.resetButtonText}>🔄 Reset App</Text>
        </TouchableOpacity>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'login' && styles.activeTabButton]}
            onPress={() => setActiveTab('login')}
          >
            <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>
              Login
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'signup' && styles.activeTabButton]}
            onPress={() => setActiveTab('signup')}
          >
            <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'login' ? (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Welcome Back</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={loginEmail}
                onChangeText={setLoginEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                editable={!isLoginLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.input}
                value={loginPassword}
                onChangeText={setLoginPassword}
                placeholder="Enter your password"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleLoginSubmitEditing}
                editable={!isLoginLoading}
              />
            </View>

            <View style={styles.demoCredentials}>
              <Text style={styles.demoText}>Demo: demo@alzico.com / password123</Text>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, isLoginLoading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isLoginLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoginLoading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Create Account</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name:</Text>
              <TextInput
                style={styles.input}
                value={signupFullName}
                onChangeText={setSignupFullName}
                placeholder="Enter your full name"
                autoCapitalize="words"
                editable={!isSignupLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={signupEmail}
                onChangeText={setSignupEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isSignupLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.input}
                value={signupPassword}
                onChangeText={setSignupPassword}
                placeholder="Enter your password"
                secureTextEntry
                editable={!isSignupLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password:</Text>
              <TextInput
                style={styles.input}
                value={signupConfirmPassword}
                onChangeText={setSignupConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
                editable={!isSignupLoading}
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, isSignupLoading && styles.disabledButton]}
              onPress={handleSignup}
              disabled={isSignupLoading}
            >
              <Text style={styles.submitButtonText}>
                {isSignupLoading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 4,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  demoCredentials: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFEAA7',
    marginBottom: 20,
  },
  demoText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen; 