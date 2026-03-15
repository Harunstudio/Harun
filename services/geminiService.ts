
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeImage = async (base64Image: string): Promise<{ gender: string; posture: string; suggestion: string }> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } },
        { text: "Analyze this person's photo. Identify gender, current posture (sitting/standing), and suggest 3 high-fashion poses that would suit them. Return JSON." }
      ]
    },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          gender: { type: Type.STRING },
          posture: { type: Type.STRING },
          suggestion: { type: Type.STRING }
        },
        required: ['gender', 'posture', 'suggestion']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const editPose = async (
  originalBase64: string,
  pose: string,
  expression: string,
  angle: string
): Promise<string | null> => {
  const ai = getAIClient();
  
  // Menggunakan instruksi yang lebih agresif untuk kemiripan wajah (Face Consistency)
  const expInstruction = expression === 'ORIGINAL' 
    ? "ULTRA-STRICT BIOMETRIC LOCK: DO NOT CHANGE A SINGLE PIXEL OF THE FACE. The person's eyes, nose, mouth, wrinkles, moles, skin texture, and exact facial structure MUST remain 100% identical to the source image. Zero variation allowed for the head and face." 
    : `Set facial expression to: ${expression}. IMPORTANT: You must maintain 100% recognizable identity. Keep the exact same bone structure, eye shape, and unique facial markers from the source.`;
    
  const angleInstruction = angle === 'ORIGINAL' 
    ? "STRICT CAMERA LOCK: Maintain the exact same head tilt and camera perspective relative to the face as seen in the original." 
    : `Adjust camera perspective to: ${angle}, but ensure the head remains realistically attached and recognizable.`;

  const prompt = `CRITICAL MISSION: HIGH-FIDELITY HUMAN IDENTITY POSE RECONSTRUCTION.
  
  CORE TASK: Change the body pose of the person to: ${pose}.
  
  IDENTITY PROTECTION PROTOCOL (HIGHEST PRIORITY):
  1. BIOMETRIC ANCHOR: The face in the original image is the absolute reference. You MUST NOT generate a 'new' person. You are 'warping' the existing person into a new pose.
  2. PIXEL-LEVEL LIKENESS: Ensure the facial similarity is 1:1. The person's family must be able to recognize them instantly.
  3. EXPRESSION: ${expInstruction}
  4. PERSPECTIVE: ${angleInstruction}
  
  PHYSICAL CONSISTENCY:
  1. SKIN TONE MATCH: The skin color and lighting on the new body parts MUST perfectly match the original face.
  2. ANATOMICAL INTEGRITY: The neck transition between the original face and the new pose must be seamless and anatomically perfect.
  3. CLOTHING: Keep the exact same outfit from the original image.
  
  ENVIRONMENT:
  1. BACKGROUND PRESERVATION: Use the exact same background from the original image. Do not hallucinate a new setting.
  
  OUTPUT: A professional, high-fashion photograph where the original person is simply in a different pose. No artifacts, no identity shifts.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: originalBase64.split(',')[1] } },
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image generation failed:", error);
  }
  return null;
};
