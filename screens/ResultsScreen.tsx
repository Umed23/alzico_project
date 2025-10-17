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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// --- TYPE DEFINITIONS ---
// This defines the structure of the data we expect from the server
type PredictionData = {
  prediction: 'CN' | 'MCI' | 'AD' | string; // The model's final prediction
  probabilities: {
    [key: string]: number; // e.g., { "CN": 0.1, "MCI": 0.7, "AD": 0.2 }
  };
};

// Update the route parameters to include our new prediction data
type ResultsScreenRouteProp = RouteProp<
  RootStackParamList,
  'Results'
>;

type ResultsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Results'
>;

const { width } = Dimensions.get('window');

const ResultsScreen = () => {
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const route = useRoute<ResultsScreenRouteProp>();
  
  // --- 1. EXTRACT DATA ---
  // Get the new `predictionData` object from the route params.
  // Also get the old `score` and `error` for fallback cases.
  const params = (route.params || {}) as {
    testId?: string;
    testName?: string;
    score?: number;
    predictionData?: PredictionData;
    error?: string;
  };
  const { predictionData, testName, score, error } = params;

  const getPredictionDetails = (prediction: string) => {
    switch (prediction) {
      case 'AD':
        return {
          title: 'Alzheimer\'s Disease (AD)',
          description: 'The results suggest a pattern consistent with Alzheimer\'s Disease. It is highly recommended to consult a healthcare professional for a comprehensive evaluation.',
          color: '#FF3B30', // Red
        };
      case 'MCI':
        return {
          title: 'Mild Cognitive Impairment (MCI)',
          description: 'The results indicate potential Mild Cognitive Impairment. This is an intermediate stage. Consulting with a doctor for further assessment and monitoring is advised.',
          color: '#FF9500', // Orange
        };
      case 'CN':
        return {
          title: 'Cognitively Normal (CN)',
          description: 'The results fall within the normal range for cognitive function. Continue to monitor your cognitive health regularly.',
          color: '#34C759', // Green
        };
      default:
        return {
          title: 'Analysis Result',
          description: 'The analysis is complete. Please review the details below and consult with a healthcare provider for a full interpretation.',
          color: '#007AFF', // Blue
        };
    }
  };

  const renderContent = () => {
    // --- 2. RENDER PREDICTION (Primary View) ---
    // If we have predictionData and no error, show the AI-powered results.
    if (predictionData && !error) {
      const details = getPredictionDetails(predictionData.prediction);
      const probabilities = predictionData.probabilities || {};

      return (
        <>
          <View style={[styles.resultBox, { borderColor: details.color }]}>
            <Text style={styles.resultHeader}>AI-Powered Analysis</Text>
            <Text style={[styles.predictionTitle, { color: details.color }]}>
              {details.title}
            </Text>
            <Text style={styles.predictionDescription}>{details.description}</Text>
          </View>

          <View style={styles.probabilityBox}>
            <Text style={styles.probabilityHeader}>Confidence Levels</Text>
            {Object.entries(probabilities).map(([key, value]) => (
              <View key={key} style={styles.probRow}>
                <Text style={styles.probLabel}>{key}</Text>
                <View style={styles.probBarContainer}>
                  <View
                    style={[
                      styles.probBar,
                      { width: `${Math.round(value * 100)}%` },
                    ]}
                  />
                </View>
                <Text style={styles.probValue}>{`${(value * 100).toFixed(1)}%`}</Text>
              </View>
            ))}
          </View>
        </>
      );
    }

    // --- 3. RENDER FALLBACK (Error or No Prediction) ---
    // If there was an error or we only have a local score, show this view.
    return (
      <>
        {error && (
            <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
        )}
        <View style={styles.resultBox}>
          <Text style={styles.resultHeader}>Test Score</Text>
          <Text style={styles.scoreText}>{score}%</Text>
          <Text style={styles.predictionDescription}>
            This is your score based on the test answers. For a more detailed analysis, please ensure you are connected to the internet and try again.
          </Text>
        </View>
      </>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Test Results</Text>
            <Text style={styles.subtitle}>{testName}</Text>
        </View>

        {renderContent()}

        <View style={styles.disclaimerBox}>
            <Text style={styles.disclaimerTitle}>Disclaimer</Text>
            <Text style={styles.disclaimerText}>
            This analysis is not a medical diagnosis. It is an informational tool based on a predictive model. Always consult a qualified healthcare professional for any health concerns.
            </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Return to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  scrollContainer: {
    padding: 24,
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    color: '#B0B0B0',
    marginTop: 8,
  },
  resultBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#4A90E2'
  },
  resultHeader: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  predictionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  predictionDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  scoreText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  probabilityBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  probabilityHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  probRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  probLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    width: 50, // Fixed width for labels (CN, MCI, AD)
  },
  probBarContainer: {
    flex: 1,
    height: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    marginHorizontal: 12,
  },
  probBar: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 10,
  },
  probValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    width: 60, // Fixed width for percentage text
    textAlign: 'right',
  },
  errorBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center'
  },
  disclaimerBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  disclaimerTitle: {
    color: '#FFC107',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  disclaimerText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ResultsScreen;