# app.py

import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# 1. Initialize the Flask App
app = Flask(__name__)
# Enable CORS for development to allow mobile/web app to call the API
CORS(app)

# 2. Load the trained model pipeline
# This is done only once when the server starts
try:
    model_pipeline = joblib.load("final_alz_model.joblib")
    print("Model pipeline loaded successfully.")
except FileNotFoundError:
    print("Error: 'final_alz_model.joblib' not found. Make sure the model file is in the same directory.")
    model_pipeline = None

# 3. Define the Prediction Endpoint
@app.route('/predict', methods=['POST'])
def predict():
    """
    Receives cognitive test data as JSON, makes a prediction, 
    and returns the result.
    """
    if model_pipeline is None:
        return jsonify({"error": "Model is not loaded."}), 500

    # Get the JSON data sent from the mobile app
    data = request.get_json()

    if data is None:
        return jsonify({"error": "Invalid JSON input."}), 400

    # Convert the incoming JSON data into a pandas DataFrame
    # The JSON should be a dictionary where keys are feature names
    # and values are the scores/data for a single prediction.
    # Example: {"MMSE__TOTSCORE": 28, "ADAS__TOTSCORE": 15, ...}
    try:
        # Create single-row DataFrame from incoming JSON
        raw_df = pd.DataFrame([data])
        print(f"Received data for prediction (raw): \n{raw_df}")

        # Align columns to the training-time expected schema when possible
        expected_cols = None
        # Try common places where sklearn stores feature names
        for obj in [model_pipeline,
                    getattr(model_pipeline, 'named_steps', None) or {}.get('pre'),
                    getattr(model_pipeline, 'named_steps', None) or {}.get('transformer'),
                    getattr(model_pipeline, 'named_steps', None) or {}.get('preprocessor')]:
            if obj is None:
                continue
            if hasattr(obj, 'feature_names_in_'):
                expected_cols = list(obj.feature_names_in_)
                break

        if expected_cols is None and hasattr(model_pipeline, 'feature_names_in_'):
            expected_cols = list(model_pipeline.feature_names_in_)

        if expected_cols:
            # Build a new DF with all expected columns, fill missing with 0
            aligned = pd.DataFrame(columns=expected_cols)
            for col in expected_cols:
                aligned[col] = raw_df[col] if col in raw_df.columns else 0
            input_df = aligned.astype(float, errors='ignore')
            # Log any extras in the payload that are not used
            extra = [c for c in raw_df.columns if c not in expected_cols]
            if extra:
                print(f"Ignoring extra input columns not in training schema: {extra[:10]}{'...' if len(extra)>10 else ''}")
        else:
            # Fall back to whatever was sent
            input_df = raw_df

        print(f"Prediction input (aligned): columns={list(input_df.columns)[:10]}{'...' if input_df.shape[1]>10 else ''}")
    except Exception as e:
        return jsonify({"error": f"Failed to prepare input: {str(e)}"}), 400

    # 4. Make a Prediction
    try:
        # The .predict() method on the pipeline will handle all preprocessing
        prediction = model_pipeline.predict(input_df)
        
        # The model might also support predict_proba to get confidence scores
        if hasattr(model_pipeline, "predict_proba"):
            probabilities = model_pipeline.predict_proba(input_df)
            # Create a nice dictionary of class probabilities
            classes = model_pipeline.classes_
            prob_dict = {classes[i]: probabilities[0][i] for i in range(len(classes))}
        else:
            prob_dict = {}

        # 5. Format the Response
        # The prediction is a numpy array, so we get the first element
        result = {
            'prediction': prediction[0],
            'probabilities': prob_dict
        }
        print(f"Returning prediction: {result}")
        return jsonify(result)

    except Exception as e:
        # This will catch errors during the prediction step
        print(f"Error during prediction: {str(e)}")
        return jsonify({"error": f"An error occurred during prediction: {str(e)}"}), 500

# Health check route
@app.route('/', methods=['GET'])
def health_check():
    return "Server is running and ready to make predictions!"

# Introspection endpoint to aid clients building the payload
@app.route('/features', methods=['GET'])
def features():
    try:
        expected_cols = None
        for obj in [model_pipeline,
                    getattr(model_pipeline, 'named_steps', None) or {}.get('pre'),
                    getattr(model_pipeline, 'named_steps', None) or {}.get('transformer'),
                    getattr(model_pipeline, 'named_steps', None) or {}.get('preprocessor')]:
            if obj is None:
                continue
            if hasattr(obj, 'feature_names_in_'):
                expected_cols = list(obj.feature_names_in_)
                break

        classes = list(getattr(model_pipeline, 'classes_', []))
        return jsonify({
            'expected_features': expected_cols,
            'classes': classes
        })
    except Exception as e:
        return jsonify({"error": f"Failed to fetch features: {str(e)}"}), 500

# 6. Run the Server
if __name__ == '__main__':
    # Use port 5000 and make the server accessible on your network
    app.run(host='0.0.0.0', port=5000, debug=True)