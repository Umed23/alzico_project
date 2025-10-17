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
import Icon from '../components/IconReplacement';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BottomTabParamList } from '../navigation/BottomTabNavigator';

type HistoryScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'History'>,
  StackNavigationProp<RootStackParamList>
>;

const { width } = Dimensions.get('window');

const HistoryScreen = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();

  // Mock data for past reports
  const pastReports = [
    {
      id: 1,
      date: '2024-01-15',
      score: 85,
      testType: 'Full Assessment',
      duration: '45 minutes',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-01-10',
      score: 78,
      testType: 'Individual Tests',
      duration: '20 minutes',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-01-05',
      score: 92,
      testType: 'Full Assessment',
      duration: '42 minutes',
      status: 'completed'
    },
    {
      id: 4,
      date: '2024-01-01',
      score: 81,
      testType: 'Daily Challenge',
      duration: '15 minutes',
      status: 'completed'
    },
    {
      id: 5,
      date: '2023-12-28',
      score: 76,
      testType: 'Full Assessment',
      duration: '48 minutes',
      status: 'completed'
    }
  ];

  const handleReportPress = (report: any) => {
    navigation.navigate('ReportDetail', { 
      date: report.date, 
      score: report.score 
    });
  };

  const handleStartNewAssessment = () => {
    navigation.navigate('TestSequence');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#34C759';
    if (score >= 60) return '#4A90E2';
    if (score >= 40) return '#FF9500';
    return '#FF3B30';
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Test History</Text>
            <Text style={styles.headerSubtitle}>
              Track your cognitive assessment progress over time
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <Icon name="time" size={60} color="#4A90E2" />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pastReports.length}</Text>
            <Text style={styles.statLabel}>Total Tests</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {Math.round(pastReports.reduce((sum, report) => sum + report.score, 0) / pastReports.length)}
            </Text>
            <Text style={styles.statLabel}>Average Score</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {Math.round(pastReports.reduce((sum, report) => sum + parseInt(report.duration), 0) / pastReports.length)}
            </Text>
            <Text style={styles.statLabel}>Avg Duration</Text>
          </View>
        </View>

        {/* Start New Assessment */}
        <TouchableOpacity
          style={styles.newAssessmentButton}
          onPress={handleStartNewAssessment}
          activeOpacity={0.8}
        >
          <View style={styles.newAssessmentContent}>
            <Icon name="add-circle" size={32} color="#FFFFFF" />
            <Text style={styles.newAssessmentText}>Start New Assessment</Text>
          </View>
        </TouchableOpacity>

        {/* Past Reports */}
        <View style={styles.reportsSection}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          <View style={styles.reportsList}>
            {pastReports.map((report) => (
              <TouchableOpacity
                key={report.id}
                style={styles.reportCard}
                onPress={() => handleReportPress(report)}
                activeOpacity={0.8}
              >
                <View style={styles.reportHeader}>
                  <View style={styles.reportInfo}>
                    <Text style={styles.reportDate}>{formatDate(report.date)}</Text>
                    <Text style={styles.reportType}>{report.testType}</Text>
                  </View>
                  <View style={[
                    styles.scoreBadge,
                    { backgroundColor: getScoreColor(report.score) + '20' }
                  ]}>
                    <Text style={[
                      styles.scoreText,
                      { color: getScoreColor(report.score) }
                    ]}>
                      {report.score}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.reportDetails}>
                  <View style={styles.reportDetail}>
                    <Icon name="time-outline" size={16} color="#8E8E93" />
                    <Text style={styles.reportDetailText}>{report.duration}</Text>
                  </View>
                  <View style={styles.reportDetail}>
                    <Icon name="checkmark-circle" size={16} color="#34C759" />
                    <Text style={styles.reportDetailText}>{getScoreLevel(report.score)}</Text>
                  </View>
                </View>
                
                <View style={styles.reportFooter}>
                  <Text style={styles.reportStatus}>Completed</Text>
                  <Icon name="chevron-forward" size={16} color="#8E8E93" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Progress Chart Placeholder */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Progress Over Time</Text>
          <View style={styles.chartPlaceholder}>
            <Icon name="analytics" size={48} color="#8E8E93" />
            <Text style={styles.chartPlaceholderText}>
              Progress chart coming soon!
            </Text>
            <Text style={styles.chartPlaceholderSubtext}>
              Visualize your cognitive performance trends
            </Text>
          </View>
        </View>

        {/* Export Options */}
        <View style={styles.exportSection}>
          <Text style={styles.sectionTitle}>Export & Share</Text>
          <View style={styles.exportButtons}>
            <TouchableOpacity style={styles.exportButton}>
              <Icon name="download" size={24} color="#4A90E2" />
              <Text style={styles.exportButtonText}>Download PDF</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.exportButton}>
              <Icon name="share-social" size={24} color="#34C759" />
              <Text style={styles.exportButtonText}>Share Report</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.exportButton}>
              <Icon name="mail" size={24} color="#FF9500" />
              <Text style={styles.exportButtonText}>Email to Doctor</Text>
            </TouchableOpacity>
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
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    fontWeight: '500',
  },
  newAssessmentButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  newAssessmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newAssessmentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  reportsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  reportsList: {
    gap: 16,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reportInfo: {
    flex: 1,
  },
  reportDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  reportType: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 50,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reportDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  reportDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  reportDetailText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 6,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportStatus: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '600',
  },
  chartSection: {
    marginBottom: 24,
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
  exportSection: {
    marginBottom: 20,
  },
  exportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
  },
});

export default HistoryScreen; 