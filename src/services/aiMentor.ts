import { GoogleGenAI, Modality, Content } from "@google/genai";
import { ChatMessage } from "../types";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiInstance;
}

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

export async function askExpert(
  prompt: string, 
  history: ChatMessage[] = []
): Promise<{ text: string, audio?: string }> {
  try {
    const ai = getAI();
    const contents: Content[] = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const systemInstruction = `
You are a senior automation engineer mentoring a student. 
VOICE CLARITY RULES:
- Keep sentences concise and clear.
- Avoid complex nested clauses that are hard to follow by ear.
- Use natural pauses (commas/periods).
- When giving steps, use "First...", "Second..." instead of just bullet points.
- If the response is in Amharic, use clear and standard phrasing.

TONE & EXPERTISE:
- Professional yet encouraging.
- Use engineering terminology but clarify if it's the first time mentioning a term.
- Perfectly fluent in English and Amharic (አማርኛ). Respond in the language the user uses.
`.trim();

    // 1. Get Text response
    const textResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const textOutput = textResponse.text;
    if (!textOutput) throw new Error("No text output received");

    // 2. Get Audio response
    let audioOutput: string | undefined;
    try {
      console.log("Generating speech for:", textOutput.slice(0, 50) + "...");
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
    if (!audioOutput) {
      console.warn("TTS candidate returned no audio data");
    } else {
      console.log("TTS audio data received successfully");
    }
  } catch (speechErr) {
    console.warn("TTS generation failed:", speechErr);
  }

  return { text: textOutput, audio: audioOutput };
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return { text: "Error connecting to AI expert. Please check your internet connection." };
  }
}

let activeAudioContext: AudioContext | null = null;

export async function playAudio(base64: string) {
  if (!base64) return;
  
  try {
    if (!activeAudioContext) {
      activeAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }

    // Ensure AudioContext is active
    if (activeAudioContext.state === 'suspended') {
      await activeAudioContext.resume();
    }

    const float32Data = pcmToFloat32(base64);
    const buffer = activeAudioContext.createBuffer(1, float32Data.length, 24000);
    buffer.getChannelData(0).set(float32Data);

    const source = activeAudioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(activeAudioContext.destination);
    
    console.log("Playing audio data, length:", float32Data.length);
    source.start();
  } catch (err) {
    console.error("Audio Playback Error:", err);
  }
}
