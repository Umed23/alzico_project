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

type HelpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Help'>;

const HelpScreen = () => {
  const navigation = useNavigation<HelpScreenNavigationProp>();

  const handleBackToMain = () => {
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Help & Support</Text>
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>How to Use the App</Text>
          <Text style={styles.helpText}>
            This app is designed to help detect early signs of Alzheimer's disease through cognitive tests.
          </Text>
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>Cognitive Tests</Text>
          <Text style={styles.helpText}>
            The app includes various cognitive tests such as memory, attention, and processing speed tests.
          </Text>
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>Getting Help</Text>
          <Text style={styles.helpText}>
            If you need immediate assistance, use the SOS button on the main screen.
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
    color: '#4A90E2',
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

export default HelpScreen; 