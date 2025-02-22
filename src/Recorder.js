import React, { useState, useRef } from "react";

const Recorder = () => {
    const [isRecording, setIsRecording] = useState(false);
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
                formData.append("audio", audioBlob, "audio.wav");

                // ارسال به سرور Flask
                const response = await fetch("http://127.0.0.1:5000/upload", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();
                console.log("Emotion Detected:", result);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div>
            <button onClick={startRecording} disabled={isRecording}>
                🎤 Start Recording
            </button>
            <button onClick={stopRecording} disabled={!isRecording}>
                ⏹️ Stop Recording
            </button>
        </div>
    );
};

export default Recorder;