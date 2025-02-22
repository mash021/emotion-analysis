import { useState, useRef } from "react";

export default function App() {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append("file", audioBlob, "audio.wav");

        setLoading(true);
        try {
          const response = await fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          setResult(data);
        } catch (error) {
          console.error("خطا در ارسال صدا:", error);
        } finally {
          setLoading(false);
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("مشکل در دسترسی به میکروفون:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-4">🎤 تحلیل احساسات زنده</h1>

      <div className="flex gap-4">
        {!recording ? (
          <button
            onClick={startRecording}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            🎙️ شروع ضبط
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            ⏹️ توقف ضبط
          </button>
        )}
      </div>

      {loading && <p className="mt-4 text-blue-500">⏳ در حال پردازش...</p>}

      {result && (
        <div className="mt-4 p-4 border rounded bg-white shadow">
          <h2 className="text-lg font-semibold">نتایج تحلیل:</h2>
          <p>🔹 احساس: {result.emotion}</p>
          <p>🔹 اعتماد: {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}