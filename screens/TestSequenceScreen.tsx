import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/IconReplacement';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type TestSequenceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TestSequence'>;

const TestSequenceScreen = () => {
  const navigation = useNavigation<TestSequenceScreenNavigationProp>();
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [isTestActive, setIsTestActive] = useState(false);

  const tests = [
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

  const handleStartTest = () => {
    setIsTestActive(true);
    navigation.navigate('TestInterface', { 
      testId: String(currentTestIndex + 1),
      testName: tests[currentTestIndex] 
    });
  };

  const handleTestComplete = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);
    
    if (currentTestIndex < tests.length - 1) {
      setCurrentTestIndex(currentTestIndex + 1);
      setIsTestActive(false);
      Alert.alert(
        'Test Complete!',
        `Score: ${score}/10\n\nReady for the next test?`,
        [
          {
            text: 'Take a Break',
            style: 'cancel',
            onPress: () => setIsTestActive(false)
          },
          {
            text: 'Continue',
            onPress: () => setIsTestActive(false)
          }
        ]
      );
    } else {
      // All tests completed
      const totalScore = newScores.reduce((sum, score) => sum + score, 0);
      navigation.navigate('Summary', { scores: newScores });
    }
  };

  const handleSkipTest = () => {
    Alert.alert(
      'Skip Test?',
      'Are you sure you want to skip this test? You can always come back to it later.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: () => {
            const newScores = [...scores, 0]; // 0 score for skipped test
            setScores(newScores);
            
            if (currentTestIndex < tests.length - 1) {
              setCurrentTestIndex(currentTestIndex + 1);
            } else {
              navigation.navigate('Summary', { scores: newScores });
            }
          }
        }
      ]
    );
  };

  const handleBackToHome = () => {
    Alert.alert(
      'Exit Assessment?',
      'Are you sure you want to exit? Your progress will be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => navigation.navigate('Main')
        }
      ]
    );
  };

  const getTestDescription = (testName: string) => {
    const descriptions = {
      'Word Recall': 'Remember and repeat words',
      'Commands': 'Follow simple instructions',
      'Constructive Praxis': 'Copy geometric shapes',
      'Naming': 'Name objects and pictures',
      'Ideational Praxis': 'Demonstrate object use',
      'Orientation': 'Answer time and place questions',
      'Word Recognition': 'Identify previously seen words',
      'Comprehension': 'Understand spoken instructions',
      'Word-Finding Difficulty': 'Complete sentences with missing words',
      'Spoken Language Ability': 'Rate speech clarity and fluency',
      'Delayed Word Recall': 'Remember words after delay',
      'Remembering Test Instructions': 'Recall test procedures',
      'Number Cancellation': 'Find and mark specific numbers'
    };
    return descriptions[testName as keyof typeof descriptions] || '';
  };

  const getProgressPercentage = () => {
    return ((currentTestIndex + scores.length) / tests.length) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
            <Icon name="arrow-back" size={24} color="#4A90E2" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Full Assessment</Text>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progress</Text>
            <Text style={styles.progressText}>
              {currentTestIndex + scores.length} of {tests.length} tests
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${getProgressPercentage()}%` }
              ]} 
            />
          </View>
        </View>

        {/* Current Test Section */}
        <View style={styles.currentTestSection}>
          <Text style={styles.sectionTitle}>Current Test</Text>
          <View style={styles.currentTestCard}>
            <View style={styles.testNumberContainer}>
              <Text style={styles.testNumber}>{currentTestIndex + 1}</Text>
            </View>
            <View style={styles.testInfo}>
              <Text style={styles.testName}>{tests[currentTestIndex]}</Text>
              <Text style={styles.testDescription}>
                {getTestDescription(tests[currentTestIndex])}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          {!isTestActive ? (
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartTest}
              activeOpacity={0.8}
            >
              <Icon name="play-circle" size={32} color="#FFFFFF" />
              <Text style={styles.startButtonText}>Start Test</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.testActiveContainer}>
              <Icon name="time" size={24} color="#FF9500" />
              <Text style={styles.testActiveText}>Test in progress...</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkipTest}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonText}>Skip Test</Text>
          </TouchableOpacity>
        </View>

        {/* Completed Tests */}
        {scores.length > 0 && (
          <View style={styles.completedSection}>
            <Text style={styles.sectionTitle}>Completed Tests</Text>
            <View style={styles.completedTestsList}>
              {scores.map((score, index) => (
                <View key={index} style={styles.completedTestItem}>
                  <View style={styles.completedTestInfo}>
                    <Text style={styles.completedTestName}>
                      {index + 1}. {tests[index]}
                    </Text>
                    <Text style={styles.completedTestScore}>
                      Score: {score}/10
                    </Text>
                  </View>
                  <View style={[
                    styles.scoreIndicator,
                    { backgroundColor: score >= 7 ? '#34C759' : score >= 4 ? '#FF9500' : '#FF3B30' }
                  ]}>
                    <Ionicons 
                      name={score >= 7 ? 'checkmark' : score >= 4 ? 'remove' : 'close'} 
                      size={16} 
                      color="#FFFFFF" 
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Upcoming Tests */}
        <View style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>Upcoming Tests</Text>
          <View style={styles.upcomingTestsList}>
            {tests.slice(currentTestIndex + 1).map((test, index) => (
              <View key={index} style={styles.upcomingTestItem}>
                <View style={styles.upcomingTestNumber}>
                  <Text style={styles.upcomingTestNumberText}>
                    {currentTestIndex + scores.length + index + 1}
                  </Text>
                </View>
                <View style={styles.upcomingTestInfo}>
                  <Text style={styles.upcomingTestName}>{test}</Text>
                  <Text style={styles.upcomingTestDescription}>
                    {getTestDescription(test)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Assessment Tips</Text>
          <View style={styles.tipCard}>
            <Icon name="bulb" size={20} color="#FFD700" />
            <Text style={styles.tipText}>
              Take breaks between tests if you need them
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Icon name="heart" size={20} color="#FF6B6B" />
            <Text style={styles.tipText}>
              Don't worry about getting perfect scores - this is about understanding your current abilities
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Icon name="time" size={20} color="#4A90E2" />
            <Text style={styles.tipText}>
              There's no time pressure - work at your own pace
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
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 16,
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  progressText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 4,
  },
  currentTestSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  currentTestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  testNumberContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  testNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  testDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  actionSection: {
    marginBottom: 24,
  },
  startButton: {
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
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  testActiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  testActiveText: {
    fontSize: 16,
    color: '#F57C00',
    marginLeft: 8,
    fontWeight: '600',
  },
  skipButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  completedSection: {
    marginBottom: 24,
  },
  completedTestsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  completedTestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  completedTestInfo: {
    flex: 1,
  },
  completedTestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  completedTestScore: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  scoreIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingSection: {
    marginBottom: 24,
  },
  upcomingTestsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  upcomingTestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  upcomingTestNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  upcomingTestNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8E8E93',
  },
  upcomingTestInfo: {
    flex: 1,
  },
  upcomingTestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  upcomingTestDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  tipsSection: {
    marginBottom: 20,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginLeft: 12,
  },
});

export default TestSequenceScreen; 