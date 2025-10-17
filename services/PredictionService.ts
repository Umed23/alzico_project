// services/PredictionService.ts

// Allow configuring the model API endpoint via environment; fallback to localhost
const API_URL = (process.env.MODEL_API_URL || 'http://localhost:5000') + '/predict';

/**
 * Sends the cognitive test scores to the backend server to get a prediction.
 * @param testData An object containing the feature names and scores.
 * @returns The prediction result from the model.
 */
export const getPrediction = async (testData: { [key: string]: any }) => {
  try {
    console.log('Sending data to server:', testData);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      // If the server responds with an error, log it and throw an error.
      const errorText = await response.text();
      console.error('Server responded with an error:', errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Received prediction from server:', result);
    return result;

  } catch (error) {
    console.error('Failed to get prediction:', error);
    // Return a structured error so the UI can handle it
    return { error: 'Could not connect to the server. Please check the network.' };
  }
};