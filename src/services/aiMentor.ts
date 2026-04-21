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
    // Convert history to Gemini format
    const contents: Content[] = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Add the current prompt
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const systemInstruction = `
You are safe, helpful, and a conversational Industrial Automation & PLC Training Mentor. 
Your goal is to guide electrical engineers through their journey into automation.

TONE & STYLE:
- Professional yet encouraging and warm.
- Use engineering terminology but explain complex concepts clearly.
- Be proactive: if a student asks a basic question, provide the answer AND suggest a logical next step or ask a related "knowledge check" question.
- Keep responses engaging but focused on the training material.

BILINGUAL CAPABILITY:
- You are perfectly fluent in English and Amharic (አማርኛ).
- Respond in the language the user uses.
- For Amharic responses, ensure the tone remains professional and technically accurate, using standard Amharic industrial terms where they exist.
- If a user mixes languages, respond in the language that seems primary or offer to explain in both if the topic is complex.

STRICT RULE:
- ALWAYS check if the user understood your explanation.
- If the user seems confused, use an analogy (e.g., comparing a PLC to a human brain or an electrical relay to a simple light switch).
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
    return { text: "የግንኙነት ስህተት ተከስቷል። እባክዎ ኢንተርኔትዎን ይፈትሹ። (Connection error. Please check your connection.)" };
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
