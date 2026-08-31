# 🏎️ AutoValuate AI — Used Car Price Predictor

A modern, machine learning-driven web application designed and built by **Raaghav Bisht** to estimate used car market resale values in India based on key vehicle parameters.

![AutoValuate AI Hero](assets/landingpage.png)

---

## ✨ Features

- 🤖 **Machine Learning Intelligence**: Powered by scikit-learn Linear Regression pipeline with numerical standard scaling and log-transformed target optimization.
- 💰 **INR Currency Formatting**: Outputs estimations in Indian Rupee format (Lakhs / Thousands) with realistic valuation ranges (±5%).
- ⚡ **Instant Presets**: Pre-configured single-click options for popular Indian cars (Maruti Swift, Hyundai Creta, Honda City).
- 🎨 **Modern Next.js & Tailwind UI**: Responsive glassmorphism aesthetic built with Next.js 15, TypeScript, Lucide Icons, and React Hook Form with Zod validation.
- 🔌 **RESTful Flask Backend API**: Clean Python 3 backend API with CORS support, health metrics, and numerical validation.

---

## 📊 Model Performance Metrics

The ML regression model was trained on the `Cardetails.csv` dataset containing over 8,000 real Indian car listings:

| Metric | Score |
| :--- | :--- |
| **R² Score** | **0.8143 (81.43%)** |
| **Adjusted R² Score** | **0.8117** |
| **Mean Absolute Error (MAE)** | **0.2326** |
| **Root Mean Squared Error (RMSE)** | **0.3117** |

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Glassmorphism utilities
- **State & Forms**: React Hook Form + Zod validation schema
- **HTTP Client**: Axios

### **Backend & Machine Learning**
- **Environment**: Python 3
- **Framework**: Flask + Flask-CORS
- **ML Libraries**: scikit-learn, Pandas, NumPy
- **Model Pipeline**: `ColumnTransformer` (`StandardScaler` + `OrdinalEncoder`) & `LinearRegression`

---

## 🚀 Local Installation & Setup Guide

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ & npm/yarn

### 2. Backend Setup (Flask API)
```bash
# Create and activate Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt

# (Optional) Retrain ML Model if needed
python train_model.py

# Start Flask Backend Server (Runs on http://127.0.0.1:5000)
python app.py
```

### 3. Frontend Setup (Next.js Application)
```bash
# Open client directory
cd client

# Install Node dependencies
npm install

# Start Next.js Development Server (Runs on http://localhost:3000)
npm run dev
```

Open `http://localhost:3000` in your web browser to use the app!

---

## 📁 Repository Structure

```
Used-Car-Price-Prediction/
├── client/                     # Next.js 15 Frontend
│   ├── app/                    # Next.js App Router (Landing & Dashboard)
│   ├── components/             # UI Components (Buttons, Dialogs, Cards)
│   └── lib/                    # Axios API client & Zod Form validations
├── app.py                      # Flask API Server (/predict, /health)
├── train_model.py              # ML Model Training & Export Script
├── car_price_model.pkl         # Trained Scikit-Learn Pipeline
├── Cardetails.csv              # Training Dataset
└── Car_Price_Prediction.ipynb # Jupyter Notebook for Data Analysis
```

---

## 👤 Author

**Raaghav Bisht**  
- Portfolio / GitHub: [Raaghav Bisht](https://github.com/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
