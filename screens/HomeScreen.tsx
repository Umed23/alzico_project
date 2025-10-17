import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../context/AuthContext';
import { getDashboardSummary, getTestPerformanceStats } from '../utils/testResults';
import { COGNITIVE_TESTS } from '../utils/cognitiveTests';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const { width, height } = Dimensions.get('window');

interface DashboardData {
  totalTests: number;
  testsThisWeek: number;
  testsThisMonth: number;
  averageScore: number;
  recentTrend: string;
  topPerformingTests: Array<{
    testId: string;
    testName: string;
    totalTests: number;
    averageScore: number;
  }>;
  severityBreakdown: Record<string, number>;
}

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [recentTests, setRecentTests] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const summary = await getDashboardSummary();
      setDashboardData(summary);
      
      // Load recent test performance
      const recentStats = await getTestPerformanceStats();
      setRecentTests(recentStats.improvementTrend || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Set default data for demo purposes
      setDashboardData({
        totalTests: 0,
        testsThisWeek: 0,
        testsThisMonth: 0,
        averageScore: 0,
        recentTrend: 'stable',
        topPerformingTests: [],
        severityBreakdown: {}
      });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
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

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => logout()
        }
      ]
    );
  };

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'improving': return '#28A745';
      case 'declining': return '#DC3545';
      case 'stable': return '#6C757D';
      default: return '#6C757D';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'normal': return '#28A745';
      case 'mild': return '#FFC107';
      case 'moderate': return '#FD7E14';
      case 'severe': return '#DC3545';
      default: return '#6C757D';
    }
  };

  const renderQuickStats = () => (
    <View style={styles.quickStatsContainer}>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{dashboardData?.totalTests || 0}</Text>
        <Text style={styles.statLabel}>Total Tests</Text>
      </View>
      
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{dashboardData?.testsThisWeek || 0}</Text>
        <Text style={styles.statLabel}>This Week</Text>
      </View>
      
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{dashboardData?.testsThisMonth || 0}</Text>
        <Text style={styles.statLabel}>This Month</Text>
      </View>
      
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{dashboardData?.averageScore || 0}%</Text>
        <Text style={styles.statLabel}>Avg Score</Text>
      </View>
    </View>
  );

  const renderTrendCard = () => (
    <View style={styles.trendCard}>
      <View style={styles.trendHeader}>
        <Text style={styles.trendTitle}>Performance Trend</Text>
        <Text style={styles.trendIcon}>{getTrendIcon(dashboardData?.recentTrend || 'stable')}</Text>
      </View>
      
      <View style={styles.trendContent}>
        <Text style={[
          styles.trendText,
          { color: getTrendColor(dashboardData?.recentTrend || 'stable') }
        ]}>
          {dashboardData?.recentTrend === 'improving' ? 'Improving' : 
           dashboardData?.recentTrend === 'declining' ? 'Declining' : 'Stable'}
        </Text>
        <Text style={styles.trendSubtext}>
          Based on your recent test performance
        </Text>
      </View>
    </View>
  );

  const renderTopTests = () => (
    <View style={styles.topTestsCard}>
      <Text style={styles.cardTitle}>Top Performing Tests</Text>
      
      {dashboardData?.topPerformingTests && dashboardData.topPerformingTests.length > 0 ? (
        dashboardData.topPerformingTests.slice(0, 3).map((test, index) => (
          <View key={test.testId} style={styles.topTestItem}>
            <View style={styles.topTestRank}>
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>
            
            <View style={styles.topTestInfo}>
              <Text style={styles.topTestName}>{test.testName}</Text>
              <Text style={styles.topTestStats}>
                {test.totalTests} tests • {test.averageScore}% avg
              </Text>
            </View>
            
            <View style={styles.topTestScore}>
              <Text style={styles.topTestScoreText}>{test.averageScore}%</Text>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No test data available yet</Text>
          <Text style={styles.noDataSubtext}>Take your first test to see your performance</Text>
        </View>
      )}
    </View>
  );

  const renderSeverityBreakdown = () => {
    const breakdown = dashboardData?.severityBreakdown || {};
    const total = Object.values(breakdown).reduce((sum, count) => sum + count, 0);
    
    if (total === 0) return null;

    return (
      <View style={styles.severityCard}>
        <Text style={styles.cardTitle}>Cognitive Health Overview</Text>
        
        <View style={styles.severityItems}>
          {Object.entries(breakdown).map(([severity, count]) => (
            <View key={severity} style={styles.severityItem}>
              <View style={[
                styles.severityIndicator,
                { backgroundColor: getSeverityColor(severity) }
              ]} />
              
              <View style={styles.severityInfo}>
                <Text style={styles.severityName}>{severity}</Text>
                <Text style={styles.severityCount}>{count} tests</Text>
              </View>
              
              <Text style={styles.severityPercentage}>
                {Math.round((count / total) * 100)}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      
      <View style={styles.actionGrid}>
        <TouchableOpacity style={styles.actionButton} onPress={handleStartTest}>
          <Text style={styles.actionIcon}>🧪</Text>
          <Text style={styles.actionText}>Start Test</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleViewHistory}>
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionText}>View History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleViewProfile}>
          <Text style={styles.actionIcon}>👤</Text>
          <Text style={styles.actionText}>Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleSettings}>
          <Text style={styles.actionIcon}>⚙️</Text>
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleHelp}>
          <Text style={styles.actionIcon}>❓</Text>
          <Text style={styles.actionText}>Help</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleSOS}>
          <Text style={styles.actionIcon}>🚨</Text>
          <Text style={styles.actionText}>SOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRecentActivity = () => (
    <View style={styles.recentActivityCard}>
      <Text style={styles.cardTitle}>Recent Activity</Text>
      
      {recentTests.length > 0 ? (
        recentTests.map((test, index) => (
          <View key={index} style={styles.recentTestItem}>
            <View style={styles.recentTestIcon}>
              <Text style={styles.recentTestIconText}>📝</Text>
            </View>
            
            <View style={styles.recentTestInfo}>
              <Text style={styles.recentTestName}>Test #{test.testNumber}</Text>
              <Text style={styles.recentTestDate}>
                {new Date(test.date).toLocaleDateString()}
              </Text>
            </View>
            
            <View style={styles.recentTestScore}>
              <Text style={styles.recentTestScoreText}>{test.score}%</Text>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No recent activity</Text>
          <Text style={styles.noDataSubtext}>Complete your first test to see activity</Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading Dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.fullName || 'User'}!</Text>
          </View>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        {renderQuickStats()}

        {/* Performance Trend */}
        {renderTrendCard()}

        {/* Top Performing Tests */}
        {renderTopTests()}

        {/* Severity Breakdown */}
        {renderSeverityBreakdown()}

        {/* Quick Actions */}
        {renderQuickActions()}

        {/* Recent Activity */}
        {renderRecentActivity()}

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  quickStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  trendCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  trendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  trendIcon: {
    fontSize: 24,
  },
  trendContent: {
    alignItems: 'center',
  },
  trendText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trendSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  topTestsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  topTestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
  },
  topTestRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topTestInfo: {
    flex: 1,
  },
  topTestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  topTestStats: {
    fontSize: 12,
    color: '#666',
  },
  topTestScore: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  topTestScoreText: {
    color: '#28A745',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  noDataSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  severityCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  severityItems: {
    gap: 15,
  },
  severityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
  },
  severityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  severityInfo: {
    flex: 1,
  },
  severityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  severityCount: {
    fontSize: 12,
    color: '#666',
  },
  severityPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  quickActionsContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#fff',
    width: (width - 60) / 3,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  recentActivityCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recentTestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
  },
  recentTestIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  recentTestIconText: {
    fontSize: 20,
  },
  recentTestInfo: {
    flex: 1,
  },
  recentTestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  recentTestDate: {
    fontSize: 12,
    color: '#666',
  },
  recentTestScore: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  recentTestScoreText: {
    color: '#28A745',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen; 