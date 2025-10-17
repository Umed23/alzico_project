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
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BottomTabParamList } from '../navigation/BottomTabNavigator';

type ReportDetailScreenRouteProp = RouteProp<RootStackParamList, 'ReportDetail'>;
type ReportDetailScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'History'>,
  StackNavigationProp<RootStackParamList>
>;

const { width } = Dimensions.get('window');

const ReportDetailScreen = () => {
  const navigation = useNavigation<ReportDetailScreenNavigationProp>();
  const route = useRoute<ReportDetailScreenRouteProp>();
  const { date, score } = route.params;

  const maxScore = 130;
  const percentage = (score / maxScore) * 100;

  const getScoreLevel = (score: number) => {
    if (score >= 104) return { level: 'Excellent', color: '#34C759', icon: 'trophy' };
    if (score >= 78) return { level: 'Good', color: '#4A90E2', icon: 'star' };
    if (score >= 52) return { level: 'Fair', color: '#FF9500', icon: 'checkmark-circle' };
    return { level: 'Needs Attention', color: '#FF3B30', icon: 'alert-circle' };
  };

  const getTestBreakdown = () => {
    // Mock data - in real app this would come from the actual test results
    return [
      { name: 'Word Recall', score: Math.floor(score * 0.15), max: 20, icon: 'text' },
      { name: 'Commands', score: Math.floor(score * 0.12), max: 15, icon: 'list' },
      { name: 'Constructive Praxis', score: Math.floor(score * 0.10), max: 12, icon: 'square' },
      { name: 'Naming', score: Math.floor(score * 0.08), max: 10, icon: 'chatbubble' },
      { name: 'Ideational Praxis', score: Math.floor(score * 0.08), max: 10, icon: 'bulb' },
      { name: 'Orientation', score: Math.floor(score * 0.08), max: 10, icon: 'compass' },
      { name: 'Word Recognition', score: Math.floor(score * 0.12), max: 15, icon: 'checkmark-circle' },
      { name: 'Comprehension', score: Math.floor(score * 0.08), max: 10, icon: 'ear' },
      { name: 'Word-Finding Difficulty', score: Math.floor(score * 0.08), max: 10, icon: 'search' },
      { name: 'Spoken Language', score: Math.floor(score * 0.08), max: 10, icon: 'mic' },
      { name: 'Delayed Word Recall', score: Math.floor(score * 0.15), max: 20, icon: 'time' },
      { name: 'Test Instructions', score: Math.floor(score * 0.08), max: 10, icon: 'document-text' },
      { name: 'Number Cancellation', score: Math.floor(score * 0.08), max: 10, icon: 'grid' },
    ];
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleTakeNewAssessment = () => {
    navigation.navigate('TestSequence');
  };

  const handleShareReport = () => {
    Alert.alert('Share Report', 'Sharing feature coming soon!');
  };

  const handleExportPDF = () => {
    Alert.alert('Export PDF', 'PDF export feature coming soon!');
  };

  const scoreLevel = getScoreLevel(score);
  const testBreakdown = getTestBreakdown();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleGoBack}
            activeOpacity={0.8}
          >
            <Icon name="arrow-back" size={24} color="#4A90E2" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Report Details</Text>
            <Text style={styles.headerSubtitle}>
              Assessment from {date}
            </Text>
          </View>
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

        {/* Test Breakdown */}
        <View style={styles.breakdownSection}>
          <Text style={styles.sectionTitle}>Test Breakdown</Text>
          <View style={styles.breakdownGrid}>
            {testBreakdown.map((test, index) => (
              <View key={index} style={styles.testCard}>
                <View style={styles.testHeader}>
                  <View style={styles.testIcon}>
                    <Ionicons name={test.icon as any} size={20} color="#4A90E2" />
                  </View>
                  <Text style={styles.testName}>{test.name}</Text>
                </View>
                
                <View style={styles.testScore}>
                  <Text style={styles.testScoreNumber}>{test.score}</Text>
                  <Text style={styles.testScoreMax}>/ {test.max}</Text>
                </View>
                
                <View style={styles.testProgressBar}>
                  <View 
                    style={[
                      styles.testProgressFill, 
                      { 
                        width: `${(test.score / test.max) * 100}%`,
                        backgroundColor: test.score >= test.max * 0.8 ? '#34C759' : 
                                       test.score >= test.max * 0.6 ? '#FF9500' : '#FF3B30'
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Performance Analysis */}
        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>Performance Analysis</Text>
          <View style={styles.analysisCard}>
            <View style={styles.analysisItem}>
              <View style={styles.analysisIcon}>
                <Icon name="trending-up" size={24} color="#34C759" />
              </View>
              <View style={styles.analysisContent}>
                <Text style={styles.analysisTitle}>Strongest Areas</Text>
                <Text style={styles.analysisText}>
                  Memory and language skills show consistent performance
                </Text>
              </View>
            </View>
            
            <View style={styles.analysisItem}>
              <View style={styles.analysisIcon}>
                <Icon name="trending-down" size={24} color="#FF9500" />
              </View>
              <View style={styles.analysisContent}>
                <Text style={styles.analysisTitle}>Areas for Improvement</Text>
                <Text style={styles.analysisText}>
                  Attention and processing speed could benefit from practice
                </Text>
              </View>
            </View>
            
            <View style={styles.analysisItem}>
              <View style={styles.analysisIcon}>
                <Icon name="bulb" size={24} color="#4A90E2" />
              </View>
              <View style={styles.analysisContent}>
                <Text style={styles.analysisTitle}>Recommendations</Text>
                <Text style={styles.analysisText}>
                  Focus on attention exercises and maintain regular cognitive activities
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Progress Comparison */}
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>Progress Comparison</Text>
          <View style={styles.comparisonCard}>
            <View style={styles.comparisonHeader}>
              <Text style={styles.comparisonTitle}>Previous Assessment</Text>
              <Text style={styles.comparisonDate}>2 weeks ago</Text>
            </View>
            
            <View style={styles.comparisonScores}>
              <View style={styles.comparisonScore}>
                <Text style={styles.comparisonLabel}>Previous</Text>
                <Text style={styles.comparisonNumber}>85</Text>
              </View>
              
              <View style={styles.comparisonArrow}>
                <Icon name="arrow-forward" size={24} color="#4A90E2" />
              </View>
              
              <View style={styles.comparisonScore}>
                <Text style={styles.comparisonLabel}>Current</Text>
                <Text style={styles.comparisonNumber}>{score}</Text>
              </View>
            </View>
            
            <View style={styles.comparisonChange}>
              <Ionicons 
                name={score > 85 ? "trending-up" : "trending-down"} 
                size={20} 
                color={score > 85 ? "#34C759" : "#FF3B30"} 
              />
              <Text style={[
                styles.comparisonChangeText,
                { color: score > 85 ? "#34C759" : "#FF3B30" }
              ]}>
                {score > 85 ? "+" : ""}{score - 85} points
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleTakeNewAssessment}
            activeOpacity={0.8}
          >
            <Icon name="play-circle" size={24} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Take New Assessment</Text>
          </TouchableOpacity>

          <View style={styles.secondaryActions}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleShareReport}
              activeOpacity={0.8}
            >
              <Icon name="share-social" size={20} color="#4A90E2" />
              <Text style={styles.secondaryButtonText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleExportPDF}
              activeOpacity={0.8}
            >
              <Icon name="document-text" size={20} color="#34C759" />
              <Text style={styles.secondaryButtonText}>Export PDF</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.notesSection}>
          <View style={styles.noteCard}>
            <Icon name="information-circle" size={24} color="#FF9500" />
            <Text style={styles.noteText}>
              This detailed report provides insights into your cognitive performance 
              across different domains. Use this information to track your progress 
              and identify areas for improvement.
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
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
  breakdownSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  breakdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  testCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  testName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1,
  },
  testScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  testScoreNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  testScoreMax: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  testProgressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
    overflow: 'hidden',
  },
  testProgressFill: {
    height: '100%',
    borderRadius: 3,
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
  analysisItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  analysisIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  analysisContent: {
    flex: 1,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  analysisText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  comparisonSection: {
    marginBottom: 30,
  },
  comparisonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  comparisonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  comparisonDate: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  comparisonScores: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  comparisonScore: {
    alignItems: 'center',
    flex: 1,
  },
  comparisonLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  comparisonNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  comparisonArrow: {
    marginHorizontal: 20,
  },
  comparisonChange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comparisonChangeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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
    marginBottom: 20,
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
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
    marginLeft: 8,
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

export default ReportDetailScreen; 