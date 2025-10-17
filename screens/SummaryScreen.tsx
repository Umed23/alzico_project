import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/IconReplacement';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SummaryScreenRouteProp = RouteProp<RootStackParamList, 'Summary'>;
type SummaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Summary'>;

const { width } = Dimensions.get('window');

const SummaryScreen = () => {
  const navigation = useNavigation<SummaryScreenNavigationProp>();
  const route = useRoute<SummaryScreenRouteProp>();
  const { scores } = route.params;

  const testNames = [
    'Word Recall',
    'Commands',
    'Constructive Praxis',
    'Naming',
    'Ideational Praxis',
    'Orientation',
    'Word Recognition',
    'Comprehension',
    'Word-Finding Difficulty',
    'Spoken Language Ability',
    'Delayed Word Recall',
    'Remembering Test Instructions',
    'Number Cancellation'
  ];

  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  const maxPossibleScore = scores.length * 10;
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  const getScoreLevel = (percentage: number) => {
    if (percentage >= 80) return { level: 'Excellent', color: '#34C759', icon: 'trophy' };
    if (percentage >= 60) return { level: 'Good', color: '#4A90E2', icon: 'star' };
    if (percentage >= 40) return { level: 'Fair', color: '#FF9500', icon: 'checkmark-circle' };
    return { level: 'Needs Attention', color: '#FF3B30', icon: 'alert-circle' };
  };

  const getRecommendations = (percentage: number) => {
    if (percentage >= 80) {
      return [
        'Continue with current cognitive activities',
        'Maintain regular social engagement',
        'Consider learning new skills or hobbies',
        'Regular physical exercise is beneficial'
      ];
    } else if (percentage >= 60) {
      return [
        'Practice memory exercises regularly',
        'Engage in brain-training activities',
        'Maintain a consistent daily routine',
        'Consider consulting a healthcare provider'
      ];
    } else if (percentage >= 40) {
      return [
        'Schedule a consultation with a healthcare provider',
        'Consider cognitive rehabilitation programs',
        'Focus on maintaining daily living skills',
        'Family support and supervision may be helpful'
      ];
    } else {
      return [
        'Immediate consultation with a healthcare provider recommended',
        'Consider comprehensive cognitive evaluation',
        'Family or caregiver support is essential',
        'Focus on safety and basic daily activities'
      ];
    }
  };

  const saveResultsToBackend = () => {
    // This would typically save to a backend service
    // For now, we'll just show a success message
    Alert.alert(
      'Results Saved',
      'Your assessment results have been saved successfully.',
      [{ text: 'OK' }]
    );
  };

  const handleGoToHome = () => {
    navigation.navigate('Main');
  };

  const handleViewDetailedReport = () => {
    // Navigate to a detailed report screen
    navigation.navigate('Report', { 
      score: totalScore, 
      date: new Date().toLocaleDateString() 
    });
  };

  const scoreLevel = getScoreLevel(percentage);
  const recommendations = getRecommendations(percentage);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Assessment Complete!</Text>
            <Text style={styles.headerSubtitle}>
              Here's your cognitive assessment summary
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <Icon name="clipboard" size={60} color="#4A90E2" />
          </View>
        </View>

        {/* Overall Score Card */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Ionicons name={scoreLevel.icon as any} size={32} color={scoreLevel.color} />
            <Text style={styles.scoreLevel}>{scoreLevel.level}</Text>
          </View>
          <View style={styles.scoreDetails}>
            <Text style={styles.totalScore}>{totalScore}</Text>
            <Text style={styles.maxScore}>/ {maxPossibleScore}</Text>
            <Text style={styles.percentage}>({percentage}%)</Text>
          </View>
          <Text style={styles.scoreDescription}>
            You completed all {scores.length} cognitive tests
          </Text>
        </View>

        {/* Individual Test Scores */}
        <View style={styles.testsSection}>
          <Text style={styles.sectionTitle}>Test Results</Text>
          <View style={styles.testsGrid}>
            {scores.map((score, index) => (
              <View key={index} style={styles.testScoreCard}>
                <View style={styles.testScoreHeader}>
                  <Text style={styles.testNumber}>{index + 1}</Text>
                  <View style={[
                    styles.scoreIndicator,
                    { backgroundColor: score >= 7 ? '#34C759' : score >= 4 ? '#FF9500' : '#FF3B30' }
                  ]}>
                    <Ionicons 
                      name={score >= 7 ? 'checkmark' : score >= 4 ? 'remove' : 'close'} 
                      size={12} 
                      color="#FFFFFF" 
                    />
                  </View>
                </View>
                <Text style={styles.testName}>{testNames[index]}</Text>
                <Text style={styles.testScore}>{score}/10</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <View style={styles.recommendationsList}>
            {recommendations.map((recommendation, index) => (
              <View key={index} style={styles.recommendationItem}>
                <View style={styles.recommendationIcon}>
                  <Icon name="checkmark-circle" size={20} color="#4A90E2" />
                </View>
                <Text style={styles.recommendationText}>{recommendation}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleViewDetailedReport}
            activeOpacity={0.8}
          >
            <Icon name="document-text" size={24} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>View Detailed Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={saveResultsToBackend}
            activeOpacity={0.8}
          >
            <Icon name="save" size={24} color="#4A90E2" />
            <Text style={styles.secondaryButtonText}>Save Results</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tertiaryButton}
            onPress={handleGoToHome}
            activeOpacity={0.8}
          >
            <Icon name="home" size={24} color="#34C759" />
            <Text style={styles.tertiaryButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>

        {/* Important Note */}
        <View style={styles.noteSection}>
          <View style={styles.noteCard}>
            <Icon name="information-circle" size={24} color="#FF9500" />
            <Text style={styles.noteText}>
              This assessment is for educational purposes only and should not replace professional medical evaluation. 
              Please consult with healthcare providers for medical advice.
            </Text>
          </View>
        </View>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 22,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreLevel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 12,
  },
  scoreDetails: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  totalScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  maxScore: {
    fontSize: 24,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  percentage: {
    fontSize: 18,
    color: '#7F8C8D',
    marginLeft: 12,
  },
  scoreDescription: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  testsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  testsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  testScoreCard: {
    width: (width - 60) / 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  testScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8E8E93',
    marginRight: 8,
  },
  scoreIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testName: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
  testScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  recommendationsSection: {
    marginBottom: 24,
  },
  recommendationsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  recommendationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  recommendationText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 22,
  },
  actionSection: {
    marginBottom: 24,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginLeft: 12,
  },
  tertiaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#34C759',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tertiaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C759',
    marginLeft: 12,
  },
  noteSection: {
    marginBottom: 20,
  },
  noteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#F57C00',
    lineHeight: 20,
    marginLeft: 12,
  },
});

export default SummaryScreen; 