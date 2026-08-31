import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model using joblib for compressed files
model = joblib.load('car_price_model.pkl')


def format_inr(number):
    """Formats a number into Indian Rupee format (e.g. ₹4.75 Lakhs or ₹4,75,161)."""
    val = round(number)
    if val >= 10000000:
        return f"₹{val / 10000000:.2f} Cr"
    elif val >= 100000:
        return f"₹{val / 100000:.2f} Lakhs"
    else:
        return f"₹{val:,}"

@app.route('/')
def home():
    return jsonify({
        'status': 'online',
        'message': 'Used Car Price Prediction API by Raaghav Bisht',
        'version': '2.0.0',
        'endpoints': {
            'health': '/health',
            'predict': '/predict (POST)'
        }
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'author': 'Raaghav Bisht'
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        # Convert numeric fields to numbers
        numeric_cols = ['year', 'km_driven', 'mileage', 'engine', 'max_power']
        for col in numeric_cols:
            if col in data:
                try:
                    data[col] = float(data[col])
                except (ValueError, TypeError):
                    return jsonify({'error': f'Invalid numeric value for {col}'}), 400

        # Extract brand, car_model, and calculate car_age up to 2026
        car_brand = str(data.get('name', data.get('brand', ''))).strip().split(' ')[0]
        model_name = str(data.get('model', '')).strip()

        if model_name:
            if car_brand.lower() not in model_name.lower():
                full_model_str = f"{car_brand} {model_name}"
            else:
                full_model_str = model_name
        else:
            full_model_str = str(data.get('name', ''))

        data['name'] = full_model_str
        data['brand'] = car_brand
        data['car_model'] = ' '.join(full_model_str.split(' ')[:2])
        data['car_age'] = 2026.0 - float(data.get('year', 2020.0))

        df = pd.DataFrame([data])
        prediction = model.predict(df)
        predicted_price = float(np.exp(prediction[0]))
        
        # Calculate price range estimate (±5%)
        price_min = round(predicted_price * 0.95)
        price_max = round(predicted_price * 1.05)

        return jsonify({
            'success': True,
            'predicted_price': round(predicted_price, 2),
            'formatted_price': format_inr(predicted_price),
            'price_range': {
                'min': price_min,
                'max': price_max,
                'formatted_min': format_inr(price_min),
                'formatted_max': format_inr(price_max)
            },
            'r2_score': '93.97%',
            'author': 'Raaghav Bisht'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400



if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(host='0.0.0.0', port=port, debug=True)


