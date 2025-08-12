'use client';
import React, { useState } from 'react';

export default function SpeechToSpeech() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [transcript, setTranscript] = useState('');

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    recorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: 'audio/wav' });
      const arrayBuffer = await audioBlob.arrayBuffer();
      const base64Audio = arrayBufferToBase64(arrayBuffer);

      // 1️⃣ Send audio to Google Speech-to-Text
      const sttResponse = await fetch('https://speech.googleapis.com/v1p1beta1/speech:recognize?key=YOUR_API_KEY', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audio: { content: base64Audio },
          config: {
            enableAutomaticPunctuation: true,
            encoding: 'LINEAR16',
            languageCode: 'en-US',
            model: 'default',
          },
        }),
      });

      const sttData = await sttResponse.json();
      const text = sttData.results?.[0]?.alternatives?.[0]?.transcript || '';
      setTranscript(text);

      // 2️⃣ Convert recognized text to audio (Text-to-Speech)
      if (text) {
        const ttsResponse = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=YOUR_API_KEY', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text },
            voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
            audioConfig: { audioEncoding: 'MP3' },
          }),
        });

        const ttsData = await ttsResponse.json();
        if (ttsData.audioContent) {
          const audio = new Audio(`data:audio/mp3;base64,${ttsData.audioContent}`);
          audio.play();
        }
      }
    };

    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setRecording(false);
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
    }
    return btoa(binary);
  };

  return (
    <div>
      <h1>Speech to Speech Demo</h1>
      <p>Transcript: {transcript}</p>
      {!recording ? (
        <button onClick={startRecording}>🎤 Start Recording</button>
      ) : (
        <button onClick={stopRecording}>⏹ Stop Recording</button>
      )}
    </div>
  );
}
