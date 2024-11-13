import sys
import joblib
import numpy as np
import os

# Cargar el modelo
model_path = os.path.join(os.path.dirname(__file__), '../model/crop_recommendation_model.pkl')
model = joblib.load(model_path)
# Recoger argumentos del script
N = float(sys.argv[1])
P = float(sys.argv[2])
K = float(sys.argv[3])
temperature = float(sys.argv[4])
humidity = float(sys.argv[5])
ph = float(sys.argv[6])
rainfall = float(sys.argv[7])

# Crear el array de características
features = np.array([[N, P, K, temperature, humidity, ph, rainfall]])

# Hacer la predicción
prediction = model.predict(features)

# Devolver la predicción
sys.stdout.write(prediction[0])
