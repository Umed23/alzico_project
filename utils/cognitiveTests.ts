export interface CognitiveTest {
  id: string;
  name: string;
  fullName: string;
  description: string;
  category: string;
  duration: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  maxScore: number;
  instructions: string;
  questions: TestQuestion[];
  scoring: ScoringSystem;
  interpretation: TestInterpretation;
  references: string[];
}

export interface TestQuestion {
  id: string;
  type: 'multiple-choice' | 'text-input' | 'recall' | 'recognition' | 'drawing' | 'timed' | 'sequence' | 'story-reading' | 'audio-recall';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  timeLimit?: number; // in seconds
  image?: string;
  audio?: string;
  storyContent?: string;
  required?: boolean;
}

export interface ScoringSystem {
  totalPoints: number;
  cutoffScores: {
    normal: number;
    mild: number;
    moderate: number;
    severe: number;
  };
  interpretation: string;
}

export interface TestInterpretation {
  normal: string;
  mild: string;
  moderate: string;
  severe: string;
  recommendations: string[];
}

export const COGNITIVE_TESTS: CognitiveTest[] = [
  {
    id: 'mmse',
    name: 'MMSE',
    fullName: 'Mini-Mental State Examination',
    description: 'A 30-point test that measures cognitive impairment across multiple domains including orientation, memory, attention, language, and visual-spatial skills.',
    category: 'Global Cognitive Assessment',
    duration: 10,
    difficulty: 'Easy',
    maxScore: 30,
    instructions: 'This test evaluates your overall cognitive function. Please answer each question to the best of your ability.',
    questions: [
      {
        id: 'mmse_1',
        type: 'text-input',
        question: 'What year is it?',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_2',
        type: 'text-input',
        question: 'What season is it?',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_3',
        type: 'text-input',
        question: 'What month is it?',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_4',
        type: 'text-input',
        question: 'What day of the week is it?',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_5',
        type: 'text-input',
        question: 'What date is it?',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_6',
        type: 'text-input',
        question: 'What country are we in?',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_7',
        type: 'text-input',
        question: 'What state/province are we in?',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_8',
        type: 'text-input',
        question: 'What city are we in?',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_9',
        type: 'text-input',
        question: 'What building are we in?',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_10',
        type: 'text-input',
        question: 'What floor are we on?',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_11',
        type: 'sequence',
        question: 'I will say three words. Remember them: APPLE, PENNY, TABLE',
        points: 0,
        timeLimit: 30
      },
      {
        id: 'mmse_12',
        type: 'recall',
        question: 'What were the three words I asked you to remember?',
        points: 3,
        timeLimit: 60
      },
      {
        id: 'mmse_13',
        type: 'sequence',
        question: 'Count backwards from 100 by 7: 100, 93, 86...',
        points: 5,
        timeLimit: 120
      },
      {
        id: 'mmse_14',
        type: 'text-input',
        question: 'Spell the word "WORLD" backwards',
        points: 5,
        timeLimit: 60
      },
      {
        id: 'mmse_15',
        type: 'recall',
        question: 'What were the three words I asked you to remember earlier?',
        points: 3,
        timeLimit: 60
      },
      {
        id: 'mmse_16',
        type: 'recognition',
        question: 'What is this object?',
        image: 'pencil.png',
        options: ['Pencil', 'Pen', 'Marker', 'Crayon'],
        correctAnswer: 'Pencil',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_17',
        type: 'text-input',
        question: 'Repeat this phrase: "No ifs, ands, or buts"',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_18',
        type: 'sequence',
        question: 'Follow this instruction: Take a piece of paper in your right hand, fold it in half, and put it on the floor',
        points: 3,
        timeLimit: 60
      },
      {
        id: 'mmse_19',
        type: 'text-input',
        question: 'Read this and do what it says: "CLOSE YOUR EYES"',
        points: 1,
        timeLimit: 30
      },
      {
        id: 'mmse_20',
        type: 'text-input',
        question: 'Write a complete sentence',
        points: 1,
        timeLimit: 60
      },
      {
        id: 'mmse_21',
        type: 'drawing',
        question: 'Copy this drawing exactly as you see it',
        image: 'intersecting_pentagons.png',
        points: 1,
        timeLimit: 60
      }
    ],
    scoring: {
      totalPoints: 30,
      cutoffScores: {
        normal: 24,
        mild: 19,
        moderate: 10,
        severe: 0
      },
      interpretation: 'MMSE scores range from 0-30. Higher scores indicate better cognitive function.'
    },
    interpretation: {
      normal: 'Normal cognitive function (24-30 points)',
      mild: 'Mild cognitive impairment (19-23 points)',
      moderate: 'Moderate cognitive impairment (10-18 points)',
      severe: 'Severe cognitive impairment (0-9 points)',
      recommendations: [
        'Continue regular cognitive activities',
        'Monitor for any changes in cognitive function',
        'Consider annual cognitive screening'
      ]
    },
    references: [
      'Folstein, M.F., Folstein, S.E., & McHugh, P.R. (1975). Mini-mental state: A practical method for grading the cognitive state of patients for the clinician. Journal of Psychiatric Research, 12(3), 189-198.'
    ]
  },
  {
    id: 'boston-naming',
    name: 'Boston Naming Test',
    fullName: 'Boston Naming Test (BNT)',
    description: 'A test of visual confrontation naming that assesses language and semantic memory.',
    category: 'Language & Memory',
    duration: 15,
    difficulty: 'Medium',
    maxScore: 60,
    instructions: 'You will see pictures of common objects. Name each object as quickly and accurately as possible.',
    questions: [
      {
        id: 'bnt_bed',
        type: 'recognition',
        question: 'What is this object?',
        image: 'bed.png',
        options: ['Bed', 'Chair', 'Table', 'Sofa'],
        correctAnswer: 'Bed',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_tree',
        type: 'recognition',
        question: 'What is this object?',
        image: 'tree.png',
        options: ['Tree', 'Bush', 'Plant', 'Flower'],
        correctAnswer: 'Tree',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_house',
        type: 'recognition',
        question: 'What is this object?',
        image: 'house.png',
        options: ['House', 'Building', 'Cottage', 'Mansion'],
        correctAnswer: 'House',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_car',
        type: 'recognition',
        question: 'What is this object?',
        image: 'car.png',
        options: ['Car', 'Truck', 'Van', 'Bus'],
        correctAnswer: 'Car',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_phone',
        type: 'recognition',
        question: 'What is this object?',
        image: 'phone.png',
        options: ['Phone', 'Computer', 'Tablet', 'Camera'],
        correctAnswer: 'Phone',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_book',
        type: 'recognition',
        question: 'What is this object?',
        image: 'book.png',
        options: ['Book', 'Magazine', 'Newspaper', 'Journal'],
        correctAnswer: 'Book',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_clock',
        type: 'recognition',
        question: 'What is this object?',
        image: 'clock.png',
        options: ['Clock', 'Watch', 'Timer', 'Stopwatch'],
        correctAnswer: 'Clock',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_flower',
        type: 'recognition',
        question: 'What is this object?',
        image: 'flower.png',
        options: ['Flower', 'Rose', 'Tulip', 'Daisy'],
        correctAnswer: 'Flower',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_ball',
        type: 'recognition',
        question: 'What is this object?',
        image: 'ball.png',
        options: ['Ball', 'Sphere', 'Circle', 'Round'],
        correctAnswer: 'Ball',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_hat',
        type: 'recognition',
        question: 'What is this object?',
        image: 'hat.png',
        options: ['Hat', 'Cap', 'Beanie', 'Helmet'],
        correctAnswer: 'Hat',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_boat',
        type: 'recognition',
        question: 'What is this object?',
        image: 'boat.png',
        options: ['Boat', 'Ship', 'Yacht', 'Canoe'],
        correctAnswer: 'Boat',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_bird',
        type: 'recognition',
        question: 'What is this object?',
        image: 'bird.png',
        options: ['Bird', 'Eagle', 'Sparrow', 'Robin'],
        correctAnswer: 'Bird',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_fish',
        type: 'recognition',
        question: 'What is this object?',
        image: 'fish.png',
        options: ['Fish', 'Salmon', 'Tuna', 'Trout'],
        correctAnswer: 'Fish',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_apple',
        type: 'recognition',
        question: 'What is this object?',
        image: 'apple.png',
        options: ['Apple', 'Orange', 'Banana', 'Pear'],
        correctAnswer: 'Apple',
        points: 2,
        timeLimit: 30,
        required: true
      },
      {
        id: 'bnt_cup',
        type: 'recognition',
        question: 'What is this object?',
        image: 'cup.png',
        options: ['Cup', 'Glass', 'Mug', 'Bowl'],
        correctAnswer: 'Cup',
        points: 2,
        timeLimit: 30,
        required: true
      }
    ],
    scoring: {
      totalPoints: 60,
      cutoffScores: {
        normal: 50,
        mild: 40,
        moderate: 30,
        severe: 0
      },
      interpretation: 'Boston Naming Test measures visual confrontation naming ability and semantic memory.'
    },
    interpretation: {
      normal: 'Normal naming ability (50-60 points) - Excellent object recognition and naming',
      mild: 'Mild naming difficulty (40-49 points) - Some difficulty with object names',
      moderate: 'Moderate naming difficulty (30-39 points) - Significant naming problems',
      severe: 'Severe naming difficulty (0-29 points) - Major difficulty with object recognition',
      recommendations: [
        'Practice naming everyday objects',
        'Use visual association techniques',
        'Engage in word-finding exercises',
        'Consider speech therapy if persistent',
        'Maintain regular reading habits'
      ]
    },
    references: [
      'Kaplan, E., Goodglass, H., & Weintraub, S. (2001). Boston Naming Test (2nd ed.). Philadelphia: Lippincott Williams & Wilkins.',
      'Goodglass, H., Kaplan, E., & Barresi, B. (2001). Boston Diagnostic Aphasia Examination (3rd ed.). Philadelphia: Lippincott Williams & Wilkins.'
    ]
  },
  {
    id: 'rey-auditory-verbal',
    name: 'Rey Auditory Verbal Learning Test',
    fullName: 'Rey Auditory Verbal Learning Test (RAVLT)',
    description: 'A comprehensive test of verbal learning and memory with multiple learning trials and delayed recall.',
    category: 'Memory & Learning',
    duration: 20,
    difficulty: 'Hard',
    maxScore: 75,
    instructions: 'You will hear a list of 15 words repeated 5 times. After each presentation, recall as many words as possible. Then you will hear a new list and be asked to recall the original list.',
    questions: [
      {
        id: 'ravlt_learning_trial_1',
        type: 'audio-recall',
        question: 'Trial 1: Listen to the word list and then recall as many words as you can remember.',
        audio: 'ravlt_word_list.mp3',
        points: 0,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_recall_trial_1',
        type: 'recall',
        question: 'Recall the words from Trial 1:',
        points: 15,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_learning_trial_2',
        type: 'audio-recall',
        question: 'Trial 2: Listen to the word list again and then recall as many words as you can remember.',
        audio: 'ravlt_word_list.mp3',
        points: 0,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_recall_trial_2',
        type: 'recall',
        question: 'Recall the words from Trial 2:',
        points: 15,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_learning_trial_3',
        type: 'audio-recall',
        question: 'Trial 3: Listen to the word list again and then recall as many words as you can remember.',
        audio: 'ravlt_word_list.mp3',
        points: 0,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_recall_trial_3',
        type: 'recall',
        question: 'Recall the words from Trial 3:',
        points: 15,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_learning_trial_4',
        type: 'audio-recall',
        question: 'Trial 4: Listen to the word list again and then recall as many words as you can remember.',
        audio: 'ravlt_word_list.mp3',
        points: 0,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_recall_trial_4',
        type: 'recall',
        question: 'Recall the words from Trial 4:',
        points: 15,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_learning_trial_5',
        type: 'audio-recall',
        question: 'Trial 5: Listen to the word list one final time and then recall as many words as you can remember.',
        audio: 'ravlt_word_list.mp3',
        points: 0,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_recall_trial_5',
        type: 'recall',
        question: 'Recall the words from Trial 5:',
        points: 15,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_interference_list',
        type: 'audio-recall',
        question: 'Now listen to a new list of words and recall them:',
        audio: 'ravlt_interference_list.mp3',
        points: 0,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_recall_interference',
        type: 'recall',
        question: 'Recall the words from the new list:',
        points: 15,
        timeLimit: 120,
        required: true
      },
      {
        id: 'ravlt_delayed_recall',
        type: 'recall',
        question: 'Now recall the words from the original list (without hearing it again):',
        points: 15,
        timeLimit: 120,
        required: true
      }
    ],
    scoring: {
      totalPoints: 75,
      cutoffScores: {
        normal: 60,
        mild: 45,
        moderate: 30,
        severe: 0
      },
      interpretation: 'RAVLT measures verbal learning, immediate recall, and delayed recall with interference.'
    },
    interpretation: {
      normal: 'Normal verbal learning (60-75 points) - Excellent word list learning and retention',
      mild: 'Mild learning difficulty (45-59 points) - Some difficulty with word list learning',
      moderate: 'Moderate learning difficulty (30-44 points) - Significant learning problems',
      severe: 'Severe learning difficulty (0-29 points) - Major difficulty with verbal learning',
      recommendations: [
        'Practice word list memorization techniques',
        'Use chunking and grouping strategies',
        'Engage in memory training exercises',
        'Consider spaced repetition techniques',
        'Maintain regular cognitive activities'
      ]
    },
    references: [
      'Rey, A. (1964). L\'examen clinique en psychologie. Paris: Presses Universitaires de France.',
      'Lezak, M. D., Howieson, D. B., Bigler, E. D., & Tranel, D. (2012). Neuropsychological assessment (5th ed.). New York: Oxford University Press.'
    ]
  },
  {
    id: 'clock-drawing',
    name: 'Clock Drawing Test',
    fullName: 'Clock Drawing Test (CDT)',
    description: 'A test of visuospatial abilities, executive function, and conceptual understanding.',
    category: 'Visuospatial & Executive',
    duration: 10,
    difficulty: 'Medium',
    maxScore: 10,
    instructions: 'Draw a clock face with all the numbers and set the time to 10 minutes past 11 (11:10).',
    questions: [
      {
        id: 'cdt_instructions',
        type: 'drawing',
        question: 'Draw a clock face with all numbers (1-12) and set the time to 11:10 (10 minutes past 11).',
        points: 10,
        timeLimit: 600,
        required: true
      }
    ],
    scoring: {
      totalPoints: 10,
      cutoffScores: {
        normal: 8,
        mild: 6,
        moderate: 4,
        severe: 0
      },
      interpretation: 'Clock Drawing Test assesses visuospatial abilities, executive function, and conceptual understanding.'
    },
    interpretation: {
      normal: 'Normal clock drawing (8-10 points) - Excellent visuospatial and executive function',
      mild: 'Mild drawing difficulty (6-7 points) - Some difficulty with spatial organization',
      moderate: 'Moderate drawing difficulty (4-5 points) - Significant spatial problems',
      severe: 'Severe drawing difficulty (0-3 points) - Major difficulty with spatial tasks',
      recommendations: [
        'Practice drawing simple geometric shapes',
        'Use visual organization techniques',
        'Engage in spatial reasoning exercises',
        'Consider occupational therapy if persistent',
        'Maintain regular drawing activities'
      ]
    },
    references: [
      'Sunderland, T., Hill, J. L., Mellow, A. M., Lawlor, B. A., Gundersheimer, J., Newhouse, P. A., & Grafman, J. H. (1989). Clock drawing in Alzheimer\'s disease: A novel measure of dementia severity. Journal of the American Geriatrics Society, 37(8), 725-729.',
      'Shulman, K. I. (2000). Clock-drawing: Is it the ideal cognitive screening test? International Journal of Geriatric Psychiatry, 15(6), 548-561.'
    ]
  },
  {
    id: 'logical-memory',
    name: 'Logical Memory',
    fullName: 'Logical Memory Test (WMS-IV)',
    description: 'A test of immediate and delayed story recall that measures verbal memory and comprehension.',
    category: 'Memory & Comprehension',
    duration: 10,
    difficulty: 'Medium',
    maxScore: 25,
    instructions: 'You will read a short story carefully. After reading, the story will be hidden and you will be asked to recall as many details as possible. You will be asked to recall it again after a delay.',
    questions: [
      {
        id: 'logical_story_reading',
        type: 'story-reading',
        question: 'Read the following story carefully. You will be asked to recall it later.',
        storyContent: `Anna was a young woman who lived in a small village near the mountains. She worked as a teacher at the local school and loved to spend her weekends hiking in the nearby forest. One Saturday morning, Anna decided to take a new trail that she had never explored before. She packed her backpack with water, a sandwich, and her camera, then set out early in the morning.

The trail was more challenging than she expected, with steep climbs and rocky paths. After about two hours of hiking, Anna reached a beautiful clearing where she could see the entire valley below. She sat down on a large rock to rest and enjoy the view. While sitting there, she noticed an old wooden box partially hidden under some fallen leaves.

Curious, Anna carefully moved the leaves aside and discovered that the box contained an old map and a small silver key. The map showed trails and landmarks that were not on any of her current hiking maps. The key had an unusual design with intricate carvings. Anna decided to take both items home to investigate further.

When she returned to her village that evening, Anna showed the map and key to her neighbor, Mr. Thompson, who was a retired history teacher. He was very excited about the discovery and suggested they visit the local library to research the area's history. Together, they spent the next few days studying old documents and maps, trying to understand the significance of Anna's find.`,
        points: 0,
        timeLimit: 300,
        required: true
      },
      {
        id: 'logical_immediate',
        type: 'recall',
        question: 'Immediate Recall: The story is now hidden. Please recall as many details as you can remember from the story you just read. Include characters, events, locations, and any other details you can recall.',
        points: 15,
        timeLimit: 180,
        required: true
      },
      {
        id: 'logical_delayed',
        type: 'recall',
        question: 'Delayed Recall: After a brief delay, please recall the story again. Try to remember as many details as possible, including characters, events, locations, and any other details from the story.',
        points: 10,
        timeLimit: 180,
        required: true
      }
    ],
    scoring: {
      totalPoints: 25,
      cutoffScores: {
        normal: 20,
        mild: 15,
        moderate: 10,
        severe: 0
      },
      interpretation: 'Logical Memory measures verbal memory encoding, immediate recall, and delayed recall. Higher scores indicate better memory performance and retention.'
    },
    interpretation: {
      normal: 'Normal memory function (20-25 points) - Excellent story recall and retention',
      mild: 'Mild memory impairment (15-19 points) - Some difficulty with story details',
      moderate: 'Moderate memory impairment (10-14 points) - Significant difficulty with recall',
      severe: 'Severe memory impairment (0-9 points) - Major difficulty with memory tasks',
      recommendations: [
        'Practice active reading and note-taking techniques',
        'Use memory strategies like visualization and association',
        'Engage in regular storytelling and discussion activities',
        'Consider memory training exercises and games',
        'Maintain a regular sleep schedule for memory consolidation'
      ]
    },
    references: [
      'Wechsler, D. (2009). Wechsler Memory Scale-Fourth Edition (WMS-IV). San Antonio, TX: Pearson.',
      'Delis, D. C., Kramer, J. H., Kaplan, E., & Ober, B. A. (2000). California Verbal Learning Test-Second Edition (CVLT-II). San Antonio, TX: Psychological Corporation.'
    ]
  },
  {
    id: 'adas-cog13',
    name: 'ADAS-Cog13',
    fullName: 'Alzheimer\'s Disease Assessment Scale-Cognitive Subscale (ADAS-Cog13)',
    description: 'A comprehensive cognitive assessment specifically designed for Alzheimer\'s disease evaluation.',
    category: 'Comprehensive Assessment',
    duration: 45,
    difficulty: 'Hard',
    maxScore: 85,
    instructions: 'This is a comprehensive cognitive assessment with multiple domains including memory, language, praxis, and orientation.',
    questions: [
      {
        id: 'adas_word_recall',
        type: 'audio-recall',
        question: 'Listen to these 10 words and remember them. You will be asked to recall them later.',
        audio: 'adas_word_list.mp3',
        points: 0,
        timeLimit: 60,
        required: true
      },
      {
        id: 'adas_word_recall_test',
        type: 'recall',
        question: 'Recall the words you just heard:',
        points: 10,
        timeLimit: 120,
        required: true
      },
      {
        id: 'adas_naming',
        type: 'recognition',
        question: 'Name this object:',
        image: 'adas_finger.png',
        options: ['Finger', 'Thumb', 'Hand', 'Digit'],
        correctAnswer: 'Finger',
        points: 5,
        timeLimit: 30,
        required: true
      },
      {
        id: 'adas_commands',
        type: 'sequence',
        question: 'Follow these commands: 1) Make a fist, 2) Point to the ceiling, 3) Point to the floor',
        points: 5,
        timeLimit: 60,
        required: true
      },
      {
        id: 'adas_constructional_praxis',
        type: 'drawing',
        question: 'Copy this drawing exactly as you see it:',
        image: 'adas_circle_drawing.png',
        points: 5,
        timeLimit: 120,
        required: true
      },
      {
        id: 'adas_ideational_praxis',
        type: 'sequence',
        question: 'Show me how you would: 1) Fold a letter, 2) Put it in an envelope, 3) Seal the envelope',
        points: 5,
        timeLimit: 90,
        required: true
      },
      {
        id: 'adas_orientation',
        type: 'multiple-choice',
        question: 'What is today\'s date?',
        options: ['I don\'t know', 'Incorrect date', 'Correct date'],
        correctAnswer: 'Correct date',
        points: 8,
        timeLimit: 60,
        required: true
      },
      {
        id: 'adas_word_recognition',
        type: 'recognition',
        question: 'Which of these words was in the original list?',
        options: ['Apple', 'House', 'Tree', 'None of these'],
        correctAnswer: 'Apple',
        points: 12,
        timeLimit: 60,
        required: true
      },
      {
        id: 'adas_remember_instructions',
        type: 'recall',
        question: 'Remember the instructions I gave you earlier about making a fist and pointing:',
        points: 5,
        timeLimit: 60,
        required: true
      },
      {
        id: 'adas_spoken_language',
        type: 'text-input',
        question: 'Describe what you see in this picture:',
        image: 'adas_scene.png',
        points: 5,
        timeLimit: 120,
        required: true
      },
      {
        id: 'adas_word_finding',
        type: 'text-input',
        question: 'Complete this sentence: "The grass is..."',
        points: 5,
        timeLimit: 60,
        required: true
      },
      {
        id: 'adas_comprehension',
        type: 'multiple-choice',
        question: 'What would you do if you found a stamped, addressed letter on the sidewalk?',
        options: ['Leave it there', 'Pick it up and mail it', 'Throw it away', 'Open it'],
        correctAnswer: 'Pick it up and mail it',
        points: 5,
        timeLimit: 60,
        required: true
      },
      {
        id: 'adas_concentration',
        type: 'sequence',
        question: 'Count backwards from 20 by 2s: 20, 18, 16...',
        points: 5,
        timeLimit: 90,
        required: true
      }
    ],
    scoring: {
      totalPoints: 85,
      cutoffScores: {
        normal: 0,
        mild: 10,
        moderate: 20,
        severe: 30
      },
      interpretation: 'ADAS-Cog13 is scored in reverse - lower scores indicate better cognitive function. Higher scores indicate greater cognitive impairment.'
    },
    interpretation: {
      normal: 'Normal cognitive function (0-9 points) - No significant cognitive impairment',
      mild: 'Mild cognitive impairment (10-19 points) - Some cognitive difficulties',
      moderate: 'Moderate cognitive impairment (20-29 points) - Significant cognitive problems',
      severe: 'Severe cognitive impairment (30+ points) - Major cognitive impairment',
      recommendations: [
        'Regular cognitive monitoring',
        'Engage in brain training activities',
        'Maintain social connections',
        'Consider medical evaluation if persistent',
        'Follow up with healthcare provider'
      ]
    },
    references: [
      'Rosen, W. G., Mohs, R. C., & Davis, K. L. (1984). A new rating scale for Alzheimer\'s disease. The American Journal of Psychiatry, 141(11), 1356-1364.',
      'Mohs, R. C., Rosen, W. G., & Davis, K. L. (1983). The Alzheimer\'s disease assessment scale: An instrument for assessing treatment efficacy. Psychopharmacology Bulletin, 19(3), 448-450.'
    ]
  }
];

export const getTestById = (id: string): CognitiveTest | undefined => {
  return COGNITIVE_TESTS.find(test => test.id === id);
};

export const getTestsByCategory = (category: string): CognitiveTest[] => {
  return COGNITIVE_TESTS.filter(test => test.category === category);
};

export const getTestCategories = (): string[] => {
  return [...new Set(COGNITIVE_TESTS.map(test => test.category))];
}; 