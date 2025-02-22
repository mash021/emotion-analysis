from flask import Flask, request, jsonify
from flask_cors import CORS
import librosa
import numpy as np
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# تابع تحلیل احساسات صوتی
def analyze_emotion(audio_path):
    y = librosa.load(audio_path, sr=None)[0]
    energy = np.mean(librosa.feature.rms(y=y))
    if energy > 0.05:
        return "شاد", np.round(energy * 100, 2)  # "شاد" means "happy" in Persian
    else:
        return "غمگین", np.round(energy * 100, 2)  # "غمگین" means "sad" in Persian

@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"error": "فایلی ارسال نشده!"}), 400

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    emotion, confidence = analyze_emotion(file_path)
    return jsonify({"emotion": emotion, "confidence": float(confidence)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)