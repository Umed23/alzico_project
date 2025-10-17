import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const { width } = Dimensions.get('window');

const MainScreen = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { user } = useAuth();

  const handleNavigateToDashboard = () => {
    navigation.navigate('Home');
  };

  const handleStartTest = () => {
    navigation.navigate('TestList');
  };

  const handleViewHistory = () => {
    navigation.navigate('History');
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  const handleSOS = () => {
    navigation.navigate('SOS');
  };

  const handleAbout = () => {
    navigation.navigate('About');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Header */}
        <View style={styles.welcomeHeader}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>Welcome to Alzico</Text>
            <Text style={styles.welcomeSubtext}>
              Your cognitive health companion for early Alzheimer's detection
            </Text>
          </View>
        </View>

        {/* Main Dashboard Card */}
        <View style={styles.dashboardCard}>
          <View style={styles.dashboardHeader}>
            <Text style={styles.dashboardIcon}>📊</Text>
            <Text style={styles.dashboardTitle}>Dashboard</Text>
          </View>
          <Text style={styles.dashboardDescription}>
            Get a comprehensive overview of your cognitive health, test performance, and progress tracking
          </Text>
          <TouchableOpacity
            style={styles.dashboardButton}
            onPress={handleNavigateToDashboard}
            activeOpacity={0.8}
          >
            <Text style={styles.dashboardButtonText}>Open Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={handleStartTest}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>🧪</Text>
              </View>
              <Text style={styles.quickActionTitle}>Take a Test</Text>
              <Text style={styles.quickActionSubtitle}>Start cognitive assessment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={handleViewHistory}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>📊</Text>
              </View>
              <Text style={styles.quickActionTitle}>View History</Text>
              <Text style={styles.quickActionSubtitle}>Track your results</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={handleViewProfile}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>👤</Text>
              </View>
              <Text style={styles.quickActionTitle}>Profile</Text>
              <Text style={styles.quickActionSubtitle}>Manage your account</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={handleSettings}
              activeOpacity={0.8}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>⚙️</Text>
              </View>
              <Text style={styles.quickActionTitle}>Settings</Text>
              <Text style={styles.quickActionSubtitle}>Customize your app</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support & Help */}
        <View style={styles.supportSection}>
          <Text style={styles.sectionTitle}>Support & Help</Text>
          <View style={styles.supportGrid}>
            <TouchableOpacity
              style={styles.supportCard}
              onPress={handleHelp}
              activeOpacity={0.8}
            >
              <View style={styles.supportIcon}>
                <Text style={styles.supportIconText}>❓</Text>
              </View>
              <Text style={styles.supportTitle}>Help Center</Text>
              <Text style={styles.supportSubtitle}>Get assistance and guidance</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.supportCard}
              onPress={handleSOS}
              activeOpacity={0.8}
            >
              <View style={styles.supportIcon}>
                <Text style={styles.supportIconText}>🚨</Text>
              </View>
              <Text style={styles.supportTitle}>Emergency Help</Text>
              <Text style={styles.supportSubtitle}>Urgent support and resources</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.supportCard}
              onPress={handleAbout}
              activeOpacity={0.8}
            >
              <View style={styles.supportIcon}>
                <Text style={styles.supportIconText}>ℹ️</Text>
              </View>
              <Text style={styles.supportTitle}>About Alzico</Text>
              <Text style={styles.supportSubtitle}>Learn more about the app</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Information Cards */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoTitle}>Why Regular Testing?</Text>
            <Text style={styles.infoText}>
              Regular cognitive assessments help detect early signs of cognitive decline, 
              allowing for timely intervention and better outcomes.
            </Text>
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🔒</Text>
            <Text style={styles.infoTitle}>Privacy First</Text>
            <Text style={styles.infoText}>
              Your test results and personal data are stored locally on your device 
              and are never shared without your explicit consent.
            </Text>
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📱</Text>
            <Text style={styles.infoTitle}>Always Accessible</Text>
            <Text style={styles.infoText}>
              Take tests anywhere, anytime. Your cognitive health monitoring 
              is just a tap away, 24/7.
            </Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
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
  welcomeHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  welcomeTextContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  dashboardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  dashboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dashboardIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  dashboardDescription: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 24,
    marginBottom: 24,
  },
  dashboardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  dashboardButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionIconText: {
    fontSize: 32,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 16,
  },
  supportSection: {
    marginBottom: 30,
  },
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  supportCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  supportIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  supportIconText: {
    fontSize: 28,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  supportSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 16,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 16,
    marginTop: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    flex: 1,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default MainScreen; 