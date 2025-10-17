import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/IconReplacement';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type ScoringScreenRouteProp = RouteProp<RootStackParamList, 'Scoring'>;
type ScoringScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Scoring'>;

const { width } = Dimensions.get('window');

const ScoringScreen = () => {
  const navigation = useNavigation<ScoringScreenNavigationProp>();
  const route = useRoute<ScoringScreenRouteProp>();
  const { score, testName } = route.params;

  const maxScore = 10;
  const percentage = (score / maxScore) * 100;

  const getScoreLevel = (score: number) => {
    if (score >= 8) return { level: 'Excellent', color: '#34C759', icon: 'trophy' };
    if (score >= 6) return { level: 'Good', color: '#4A90E2', icon: 'star' };
    if (score >= 4) return { level: 'Fair', color: '#FF9500', icon: 'checkmark-circle' };
    return { level: 'Needs Attention', color: '#FF3B30', icon: 'alert-circle' };
  };

  const getRecommendations = (score: number) => {
    if (score >= 8) {
      return [
        'Continue with current cognitive activities',
        'Maintain regular brain exercises',
        'Consider challenging yourself with more complex tasks'
      ];
    } else if (score >= 6) {
      return [
        'Practice this type of test regularly',
        'Focus on areas where you made mistakes',
        'Consider taking the full assessment'
      ];
    } else if (score >= 4) {
      return [
        'This area may need more attention',
        'Practice similar exercises daily',
        'Consider consulting with a healthcare provider'
      ];
    } else {
      return [
        'This area needs focused attention',
        'Practice basic exercises regularly',
        'Consider comprehensive evaluation'
      ];
    }
  };

  const handleViewReport = () => {
    navigation.navigate('Report', { 
      score: score, 
      date: new Date().toLocaleDateString() 
    });
  };

  const handleTakeAnotherTest = () => {
    navigation.navigate('TestList');
  };

  const handleGoToHome = () => {
    navigation.navigate('Main');
  };

  const scoreLevel = getScoreLevel(score);
  const recommendations = getRecommendations(score);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Test Results</Text>
          <Text style={styles.headerSubtitle}>
            {testName} - Score Analysis
          </Text>
        </View>

        {/* Score Display */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreCard}>
            <View style={styles.scoreHeader}>
              <Ionicons name={scoreLevel.icon as any} size={32} color={scoreLevel.color} />
              <Text style={styles.scoreLevel}>{scoreLevel.level}</Text>
            </View>
            
            <View style={styles.scoreDisplay}>
              <Text style={styles.scoreNumber}>{score}</Text>
              <Text style={styles.scoreMax}>/ {maxScore}</Text>
            </View>
            
            <View style={styles.scoreBar}>
              <View 
                style={[
                  styles.scoreFill, 
                  { 
                    width: `${percentage}%`,
                    backgroundColor: scoreLevel.color
                  }
                ]} 
              />
            </View>
            
            <Text style={styles.scorePercentage}>{percentage}%</Text>
          </View>
        </View>

        {/* Test Information */}
        <View style={styles.testInfoSection}>
          <Text style={styles.sectionTitle}>Test Information</Text>
          <View style={styles.testInfoCard}>
            <View style={styles.infoRow}>
              <Icon name="clipboard" size={20} color="#4A90E2" />
              <Text style={styles.infoLabel}>Test Name:</Text>
              <Text style={styles.infoValue}>{testName}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Icon name="time" size={20} color="#4A90E2" />
              <Text style={styles.infoLabel}>Completed:</Text>
              <Text style={styles.infoValue}>{new Date().toLocaleDateString()}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Icon name="star" size={20} color="#4A90E2" />
              <Text style={styles.infoLabel}>Performance:</Text>
              <Text style={[styles.infoValue, { color: scoreLevel.color }]}>
                {scoreLevel.level}
              </Text>
            </View>
          </View>
        </View>

        {/* Analysis */}
        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>What This Score Means</Text>
          <View style={styles.analysisCard}>
            {score >= 8 ? (
              <Text style={styles.analysisText}>
                Excellent performance! Your cognitive abilities in this area are strong. 
                Continue to challenge yourself and maintain your current activities.
              </Text>
            ) : score >= 6 ? (
              <Text style={styles.analysisText}>
                Good performance! You're doing well in this area with room for improvement. 
                Regular practice can help you achieve even better results.
              </Text>
            ) : score >= 4 ? (
              <Text style={styles.analysisText}>
                Fair performance. This area may benefit from more focused practice. 
                Don't worry - cognitive skills can be improved with regular exercise.
              </Text>
            ) : (
              <Text style={styles.analysisText}>
                This area needs attention. Consider practicing similar exercises regularly 
                and consulting with healthcare providers for guidance.
              </Text>
            )}
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <View style={styles.recommendationsList}>
            {recommendations.map((recommendation, index) => (
              <View key={index} style={styles.recommendationItem}>
                <View style={styles.recommendationIcon}>
                  <Icon name="checkmark-circle" size={20} color="#34C759" />
                </View>
                <Text style={styles.recommendationText}>{recommendation}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.nextStepsSection}>
          <Text style={styles.sectionTitle}>Next Steps</Text>
          <View style={styles.nextStepsGrid}>
            <TouchableOpacity
              style={styles.nextStepCard}
              onPress={handleViewReport}
              activeOpacity={0.8}
            >
              <View style={styles.nextStepIcon}>
                <Icon name="document-text" size={32} color="#4A90E2" />
              </View>
              <Text style={styles.nextStepTitle}>View Report</Text>
              <Text style={styles.nextStepText}>
                Get detailed analysis and insights
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextStepCard}
              onPress={handleTakeAnotherTest}
              activeOpacity={0.8}
            >
              <View style={styles.nextStepIcon}>
                <Icon name="play-circle" size={32} color="#34C759" />
              </View>
              <Text style={styles.nextStepTitle}>Take Another Test</Text>
              <Text style={styles.nextStepText}>
                Continue cognitive assessment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextStepCard}
              onPress={handleGoToHome}
              activeOpacity={0.8}
            >
              <View style={styles.nextStepIcon}>
                <Icon name="home" size={32} color="#FF9500" />
              </View>
              <Text style={styles.nextStepTitle}>Go to Home</Text>
              <Text style={styles.nextStepText}>
                Access main features
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextStepCard}
              onPress={() => navigation.navigate('TestSequence')}
              activeOpacity={0.8}
            >
              <View style={styles.nextStepIcon}>
                <Icon name="clipboard" size={32} color="#9C27B0" />
              </View>
              <Text style={styles.nextStepTitle}>Full Assessment</Text>
              <Text style={styles.nextStepText}>
                Complete all 13 tests
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Tips for Improvement</Text>
          <View style={styles.tipCard}>
            <Icon name="bulb" size={20} color="#FFD700" />
            <Text style={styles.tipText}>
              Practice makes perfect! Regular cognitive exercises can help improve your 
              performance over time. Don't be discouraged by lower scores - they're 
              opportunities for growth.
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
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  scoreSection: {
    marginBottom: 30,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
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
    marginBottom: 20,
  },
  scoreLevel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 12,
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  scoreMax: {
    fontSize: 24,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  scoreBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#E5E5EA',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 16,
  },
  scoreFill: {
    height: '100%',
    borderRadius: 6,
  },
  scorePercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  testInfoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  testInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 12,
    marginRight: 8,
  },
  infoValue: {
    fontSize: 16,
    color: '#7F8C8D',
    flex: 1,
  },
  analysisSection: {
    marginBottom: 30,
  },
  analysisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  analysisText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
  },
  recommendationsSection: {
    marginBottom: 30,
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
  nextStepsSection: {
    marginBottom: 30,
  },
  nextStepsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nextStepCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  nextStepIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  nextStepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  nextStepText: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 16,
  },
  tipsSection: {
    marginBottom: 20,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#F57C00',
    lineHeight: 20,
    marginLeft: 12,
  },
});

export default ScoringScreen; 