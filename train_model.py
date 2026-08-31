import numpy as np
import pandas as pd
import os
import joblib
from sklearn.preprocessing import OrdinalEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingRegressor, RandomForestRegressor, VotingRegressor
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error

def train():
    print("Loading Cardetails.csv dataset...")
    df = pd.read_csv('Cardetails.csv')

    # Convert numeric columns with string units (e.g. '21.4 kmpl' -> 21.4)
    for col in ['mileage', 'engine', 'max_power']:
        if col in df.columns:
            df[col] = df[col].astype(str).str.split(' ').str[0]
            df[col] = pd.to_numeric(df[col], errors='coerce')

    if 'torque' in df.columns:
        df = df.drop(columns=['torque'])
    if 'seats' in df.columns:
        df = df.drop(columns=['seats'])

    # Fill missing values
    df['mileage'] = df['mileage'].fillna(df['mileage'].median())
    df['engine'] = df['engine'].fillna(df['engine'].median())
    df['max_power'] = df['max_power'].fillna(df['max_power'].median())

    df = df.dropna().reset_index(drop=True)

    # Feature Engineering: Brand, Car Model, Car Age up to 2026
    df['brand'] = df['name'].astype(str).str.split(' ').str[0]
    df['car_model'] = df['name'].astype(str).apply(lambda x: ' '.join(x.split(' ')[:2]))
    df['car_age'] = 2026 - pd.to_numeric(df['year'], errors='coerce')
    df['selling_price_log'] = np.log(df['selling_price'])

    feature_cols = ['name', 'brand', 'car_model', 'year', 'car_age', 'km_driven', 'fuel', 'seller_type', 'transmission', 'owner', 'mileage', 'engine', 'max_power']
    X = df[feature_cols]
    y = df['selling_price_log']

    numerical = ['year', 'car_age', 'km_driven', 'mileage', 'engine', 'max_power']
    categorical = ['name', 'brand', 'car_model', 'fuel', 'seller_type', 'transmission', 'owner']

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical),
            ('cat', OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1), categorical)
        ]
    )

    rf = RandomForestRegressor(n_estimators=100, max_depth=14, min_samples_split=4, random_state=42, n_jobs=-1)
    hgb = HistGradientBoostingRegressor(max_iter=250, learning_rate=0.08, max_depth=8, random_state=42)

    ensemble = VotingRegressor(
        estimators=[('rf', rf), ('hgb', hgb)],
        weights=[1, 2]
    )

    pipeline = Pipeline(steps=[
        ('preprocess', preprocessor),
        ('Model', ensemble)
    ])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42)

    print("Training Optimized Ensemble ML Model...")
    pipeline.fit(X_train, y_train)

    y_pred_log = pipeline.predict(X_test)
    r2 = r2_score(y_test, y_pred_log)
    rmse_log = np.sqrt(mean_squared_error(y_test, y_pred_log))
    mae_rupees = mean_absolute_error(np.exp(y_test), np.exp(y_pred_log))

    print("\n---------------- MODEL EVALUATION ----------------")
    print(f"Accuracy (R² Score): {r2 * 100:.2f}%")
    print(f"Log RMSE: {rmse_log:.4f}")
    print(f"Average Price Prediction Error: ₹{mae_rupees:,.2f}")
    print("--------------------------------------------------\n")

    joblib.dump(pipeline, 'car_price_model.pkl', compress=3)
    size_mb = os.path.getsize('car_price_model.pkl') / (1024 * 1024)
    print(f"Exported compressed car_price_model.pkl ({size_mb:.2f} MB) successfully!")

if __name__ == '__main__':
    train()
