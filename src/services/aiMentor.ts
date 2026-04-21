import { GoogleGenAI, Modality } from "@google/genai";

// Initialize AI with the environment key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Converts Base64 PCM 16-bit Little Endian to Float32 for Web Audio API
 */
function pcmToFloat32(base64: string): Float32Array {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const int16Buffer = new Int16Array(bytes.buffer);
  const float32Buffer = new Float32Array(int16Buffer.length);
  
  for (let i = 0; i < int16Buffer.length; i++) {
    float32Buffer[i] = int16Buffer[i] / 32768.0;
  }
  
  return float32Buffer;
}

export async function askExpert(prompt: string): Promise<{ text: string, audio?: string }> {
  try {
    // 1. Get Text response
    const textResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are a professional industrial automation expert. Provide concise, engineering-focused answers about PLCs, sensors, and industrial standards. You MUST respond in the language the user uses (English or Amharic). Use professional terminology.",
      }
    });

    const textOutput = textResponse.text;
    if (!textOutput) throw new Error("No text output received");

    // 2. Get Audio response (Parallel but sequential for reliability)
    let audioOutput: string | undefined;
    try {
      const speechResponse = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: textOutput }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Charon' },
            },
          },
        },
      });

      audioOutput = speechResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    } catch (speechErr) {
      console.warn("TTS generation failed:", speechErr);
    }

    return { text: textOutput, audio: audioOutput };
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return { text: "Connection error. Please ensure you have configured your AI Studio Gemini API key in the secrets panel." };
  }
}

let activeAudioContext: AudioContext | null = null;

export async function playAudio(base64: string) {
  try {
    if (!activeAudioContext) {
      activeAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }

    const float32Data = pcmToFloat32(base64);
    const buffer = activeAudioContext.createBuffer(1, float32Data.length, 24000);
    buffer.getChannelData(0).set(float32Data);

    const source = activeAudioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(activeAudioContext.destination);
    source.start();
  } catch (err) {
    console.error("Audio Playback Error:", err);
  }
}
