import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SOSScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SOS'>;

const SOSScreen = () => {
  const navigation = useNavigation<SOSScreenNavigationProp>();

  const handleBackToMain = () => {
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Emergency Help</Text>
        </View>

        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Call 911</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Call Emergency Services</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>What to do in an emergency:</Text>
          <Text style={styles.helpText}>
            If you or someone you know is experiencing a medical emergency, call 911 immediately.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToMain}
        >
          <Text style={styles.backButtonText}>Back to Main</Text>
        </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  emergencySection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 15,
  },
  emergencyButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  helpText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SOSScreen; 