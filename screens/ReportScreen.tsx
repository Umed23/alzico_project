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

type ReportScreenRouteProp = RouteProp<RootStackParamList, 'Report'>;
type ReportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Report'>;

const { width } = Dimensions.get('window');

const ReportScreen = () => {
  const navigation = useNavigation<ReportScreenNavigationProp>();
  const route = useRoute<ReportScreenRouteProp>();
  const { score, date } = route.params;

  const maxScore = 130; // Total possible score for all 13 tests
  const percentage = (score / maxScore) * 100;

  const getScoreLevel = (score: number) => {
    if (score >= 104) return { level: 'Excellent', color: '#34C759', icon: 'trophy' };
    if (score >= 78) return { level: 'Good', color: '#4A90E2', icon: 'star' };
    if (score >= 52) return { level: 'Fair', color: '#FF9500', icon: 'checkmark-circle' };
    return { level: 'Needs Attention', color: '#FF3B30', icon: 'alert-circle' };
  };

  const getRecommendations = (score: number) => {
    if (score >= 104) {
      return [
        'Continue with current cognitive activities',
        'Maintain regular brain exercises',
        'Consider learning new skills or hobbies',
        'Regular physical exercise is beneficial'
      ];
    } else if (score >= 78) {
      return [
        'Practice memory exercises regularly',
        'Engage in brain-training activities',
        'Maintain a consistent daily routine',
        'Consider consulting a healthcare provider'
      ];
    } else if (score >= 52) {
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

  const handleGoToHome = () => {
    navigation.navigate('Main');
  };

  const handleTakeAnotherTest = () => {
    navigation.navigate('TestSequence');
  };

  const handleShareReport = () => {
    // Placeholder for sharing functionality
    Alert.alert('Share Report', 'Sharing feature coming soon!');
  };

  const scoreLevel = getScoreLevel(score);
  const recommendations = getRecommendations(score);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cognitive Report</Text>
          <Text style={styles.headerSubtitle}>
            Detailed assessment results and analysis
          </Text>
        </View>

        {/* Score Overview */}
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
            <Text style={styles.scoreDate}>Assessment Date: {date}</Text>
          </View>
        </View>

        {/* Performance Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Performance Summary</Text>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>
              {score >= 104 ? (
                'Your cognitive performance is excellent! You demonstrate strong memory, attention, and problem-solving skills. Continue maintaining your current lifestyle and cognitive activities.'
              ) : score >= 78 ? (
                'Your cognitive performance is good with room for improvement. You show solid cognitive abilities in most areas. Regular practice and brain exercises can help enhance your performance further.'
              ) : score >= 52 ? (
                'Your cognitive performance indicates some areas that may benefit from attention. This is common and can often be improved with targeted exercises and lifestyle modifications.'
              ) : (
                'Your cognitive performance suggests areas that need focused attention. Early intervention and support can make a significant difference in maintaining cognitive health.'
              )}
            </Text>
          </View>
        </View>

        {/* Cognitive Domains */}
        <View style={styles.domainsSection}>
          <Text style={styles.sectionTitle}>Cognitive Domains Assessed</Text>
          <View style={styles.domainsGrid}>
            <View style={styles.domainCard}>
              <View style={styles.domainIcon}>
                <Icon name="text" size={24} color="#4A90E2" />
              </View>
              <Text style={styles.domainTitle}>Memory</Text>
              <Text style={styles.domainDescription}>
                Word recall, recognition, and delayed recall
              </Text>
            </View>
            
            <View style={styles.domainCard}>
              <View style={styles.domainIcon}>
                <Icon name="list" size={24} color="#34C759" />
              </View>
              <Text style={styles.domainTitle}>Executive Function</Text>
              <Text style={styles.domainDescription}>
                Planning, problem-solving, and attention
              </Text>
            </View>
            
            <View style={styles.domainCard}>
              <View style={styles.domainIcon}>
                <Icon name="square" size={24} color="#FF9500" />
              </View>
              <Text style={styles.domainTitle}>Visuospatial</Text>
              <Text style={styles.domainDescription}>
                Shape copying and spatial awareness
              </Text>
            </View>
            
            <View style={styles.domainCard}>
              <View style={styles.domainIcon}>
                <Icon name="chatbubble" size={24} color="#9C27B0" />
              </View>
              <Text style={styles.domainTitle}>Language</Text>
              <Text style={styles.domainDescription}>
                Naming, comprehension, and fluency
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Chart Placeholder */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Progress Over Time</Text>
          <View style={styles.chartPlaceholder}>
            <Icon name="analytics" size={48} color="#8E8E93" />
            <Text style={styles.chartPlaceholderText}>
              Progress tracking coming soon!
            </Text>
            <Text style={styles.chartPlaceholderSubtext}>
              Compare your performance across multiple assessments
            </Text>
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
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
            onPress={handleTakeAnotherTest}
            activeOpacity={0.8}
          >
            <Icon name="play-circle" size={24} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Take Another Assessment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleShareReport}
            activeOpacity={0.8}
          >
            <Icon name="share-social" size={24} color="#4A90E2" />
            <Text style={styles.secondaryButtonText}>Share Report</Text>
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

        {/* Important Notes */}
        <View style={styles.notesSection}>
          <View style={styles.noteCard}>
            <Icon name="information-circle" size={24} color="#FF9500" />
            <Text style={styles.noteText}>
              This report is for educational purposes only and should not replace 
              professional medical evaluation. Please consult with healthcare providers 
              for medical advice and interpretation of results.
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
    marginBottom: 8,
  },
  scoreDate: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  summarySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
  },
  domainsSection: {
    marginBottom: 30,
  },
  domainsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  domainCard: {
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
  domainIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  domainTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  domainDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 16,
  },
  chartSection: {
    marginBottom: 30,
  },
  chartPlaceholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
    marginBottom: 8,
  },
  chartPlaceholderSubtext: {
    fontSize: 14,
    color: '#BDC3C7',
    textAlign: 'center',
    lineHeight: 20,
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
  actionSection: {
    marginBottom: 30,
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
  notesSection: {
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

export default ReportScreen; 