# Emotion Analysis

This project is a web application for analyzing emotions from audio recordings. It consists of a React frontend and a Flask backend. The backend uses `librosa` and `numpy` to process audio files and determine the emotion conveyed in the audio.

## Project Structure
emotion-analysis/ ├── .gitignore ├── eslint.config.js ├── index.html ├── package.json ├── public/ ├── README.md ├── server.py ├── src/ │ ├── App.css │ ├── App.jsx │ ├── assets/ │ ├── index.css │ ├── main.jsx │ ├── readme.md │ └── Recorder.js ├── test_server.py ├── uploads/ └── vite.config.js


## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/emotion-analysis.git
   cd emotion-analysis

2. **Install frontend dependencies:
    npm install
3. Install backend dependencies
    pip install flask flask-cors librosa numpy

Usage:
1. Start the Flask server:
    python server.py

2. Start the React development server:

    npm run dev

3. Open your browser and navigate to http://localhost:3000 to use the application.

Features
Record Audio: Record audio directly from the browser.
Analyze Emotion: Upload the recorded audio to the Flask server for emotion analysis.
Display Results: View the detected emotion and confidence level on the frontend.
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

License

Make sure to replace `https://github.com/your-username/emotion-analysis.git` with the actual URL of your GitHub repository.
Make sure to replace `https://github.com/your-username/emotion-analysis.git` with the actual URL of your GitHub repository.