import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COGNITIVE_TESTS, getTestsByCategory, getTestCategories, CognitiveTest } from '../utils/cognitiveTests';

type TestListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TestList'>;

const { width, height } = Dimensions.get('window');

const TestListScreen = () => {
  const navigation = useNavigation<TestListScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTests, setFilteredTests] = useState<CognitiveTest[]>(COGNITIVE_TESTS);

  const categories = ['All', ...getTestCategories()];

  useEffect(() => {
    filterTests();
  }, [selectedCategory, searchQuery]);

  const filterTests = () => {
    let filtered = COGNITIVE_TESTS;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = getTestsByCategory(selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(test => 
        test.name.toLowerCase().includes(query) ||
        test.fullName.toLowerCase().includes(query) ||
        test.description.toLowerCase().includes(query) ||
        test.category.toLowerCase().includes(query)
      );
    }

    setFilteredTests(filtered);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#34C759';
      case 'Medium':
        return '#FFC107';
      case 'Hard':
        return '#FF3B30';
      default:
        return '#888';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '🟢';
      case 'Medium':
        return '🟡';
      case 'Hard':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Global Cognitive Assessment':
        return '🧠';
      case 'Language & Memory':
        return '💬';
      case 'Memory & Learning':
        return '📚';
      case 'Visuospatial & Executive':
        return '🎨';
      case 'Memory & Comprehension':
        return '📖';
      case 'Comprehensive Assessment':
        return '🔍';
      default:
        return '📋';
    }
  };

  const handleTestPress = (test: CognitiveTest) => {
    navigation.navigate('TestInterface', {
      testId: test.id,
      testName: test.name
    });
  };

  const renderTestCard = (test: CognitiveTest) => (
    <TouchableOpacity
      key={test.id}
      style={styles.testCard}
      onPress={() => handleTestPress(test)}
      activeOpacity={0.8}
    >
      <View style={styles.testHeader}>
        <View style={styles.testTitleContainer}>
          <Text style={styles.testName}>{test.name}</Text>
          <Text style={styles.testFullName}>{test.fullName}</Text>
        </View>
        <View style={styles.testBadges}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(test.difficulty) }]}>
            <Text style={styles.difficultyIcon}>{getDifficultyIcon(test.difficulty)}</Text>
            <Text style={styles.difficultyText}>{test.difficulty}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.testDescription}>{test.description}</Text>

      <View style={styles.testInfo}>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>⏱️</Text>
          <Text style={styles.infoText}>{test.duration} min</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>📝</Text>
          <Text style={styles.infoText}>{test.questions.length} questions</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoIcon}>🎯</Text>
          <Text style={styles.infoText}>{test.maxScore} points</Text>
        </View>
      </View>

      <View style={styles.testFooter}>
        <View style={styles.categoryRow}>
          <Text style={styles.categoryIcon}>{getCategoryIcon(test.category)}</Text>
          <Text style={styles.categoryText}>{test.category}</Text>
        </View>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Test</Text>
          <Text style={styles.startButtonIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (filteredTests.length === 0 && (searchQuery.trim() || selectedCategory !== 'All')) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🧠</Text>
            <Text style={styles.logoText}>Alzico</Text>
          </View>
          <Text style={styles.headerTitle}>Cognitive Tests</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tests..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryButtonText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsIcon}>🔍</Text>
          <Text style={styles.noResultsTitle}>No Tests Found</Text>
          <Text style={styles.noResultsText}>
            No tests match your current search criteria.
          </Text>
          <TouchableOpacity
            style={styles.clearFiltersButton}
            onPress={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            <Text style={styles.clearFiltersButtonText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🧠</Text>
            <Text style={styles.logoText}>Alzico</Text>
          </View>
          <Text style={styles.headerTitle}>Cognitive Tests</Text>
          <Text style={styles.headerSubtitle}>
            Comprehensive cognitive assessment tools for early detection
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tests by name, description, or category..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Filter */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Filter by Category:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryButtonText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Test Count */}
        <View style={styles.testCountContainer}>
          <Text style={styles.testCountText}>
            {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''} available
          </Text>
        </View>

        {/* Test List */}
        <View style={styles.testListContainer}>
          {filteredTests.map(renderTestCard)}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All tests are scientifically validated and designed for cognitive health assessment.
          </Text>
          <Text style={styles.footerText}>
            Results are for informational purposes only. Consult healthcare professionals for medical advice.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 32,
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    lineHeight: 22,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedCategoryButton: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  categoryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  testCountContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  testCountText: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
  },
  testListContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  testCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  testTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  testName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  testFullName: {
    fontSize: 14,
    color: '#B0B0B0',
    lineHeight: 18,
  },
  testBadges: {
    alignItems: 'flex-end',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  difficultyIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  testDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  testInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  infoText: {
    color: '#B0B0B0',
    fontSize: 12,
    fontWeight: '500',
  },
  testFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  startButtonIcon: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noResultsIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  noResultsTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noResultsText: {
    color: '#B0B0B0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  clearFiltersButton: {
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.3)',
  },
  clearFiltersButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    paddingTop: 0,
  },
  footerText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 8,
  },
});

export default TestListScreen; 
