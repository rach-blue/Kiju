import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  const PORT = 3000;

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API: Course File Extractor (PDF, Images/Scans, TXT, DOCX) via Gemini Multimodal OCR
app.post('/api/kiju/extract-course-file', async (req, res) => {
  try {
    const { fileName, fileType, base64Data, textContent } = req.body;

    if (!base64Data && !textContent) {
      return res.status(400).json({ error: "Aucun fichier ou contenu texte fourni." });
    }

    const ai = getGeminiClient();

    // If pure text content was uploaded
    if (textContent && (!fileType || fileType.includes('text') || fileType.includes('markdown'))) {
      const prompt = `Tu es un assistant pédagogique médical Kiju.
Analyse le document/cours brut ci-dessous (Nom de fichier: ${fileName || 'cours.txt'}).
Formate et structure ce cours en Markdown très propre.
Extrais un titre principal évocateur et concis.

Texte brut :
"""
${textContent.slice(0, 10000)}
"""`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              extractedText: { type: Type.STRING, description: "Texte structuré en Markdown" },
              category: { type: Type.STRING },
              keyConcepts: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "extractedText", "category", "keyConcepts"]
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, data: parsed });
    }

    // Multimodal case (PDF document, Image scan, Photo of medical notes)
    const promptText = `Tu es un expert médical et OCR de l'application Kiju.
Analyse le document joint (PDF ou image scan de cours de santé: ${fileName || 'cours.pdf'}).
1. Reconstitue l'intégralité du texte du cours avec une exactitude scientifique absolue.
2. Organise le contenu avec des titres Markdown, puces et concepts clés.
3. Attribue un titre de cours médical synthétique et professionnel.`;

    const contents: any[] = [];
    
    // Check supported inline mimeTypes
    let normalizedMime = fileType || 'application/pdf';
    if (normalizedMime.includes('png')) normalizedMime = 'image/png';
    else if (normalizedMime.includes('jpg') || normalizedMime.includes('jpeg')) normalizedMime = 'image/jpeg';
    else if (normalizedMime.includes('webp')) normalizedMime = 'image/webp';
    else if (normalizedMime.includes('pdf')) normalizedMime = 'application/pdf';

    contents.push({
      parts: [
        {
          inlineData: {
            mimeType: normalizedMime,
            data: base64Data
          }
        },
        { text: promptText }
      ]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contents,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            extractedText: { type: Type.STRING, description: "Texte structuré du cours en Markdown" },
            category: { type: Type.STRING },
            keyConcepts: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "extractedText", "category", "keyConcepts"]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });

  } catch (error: any) {
    console.error("Error extracting course file:", error);
    res.status(500).json({ success: false, error: error?.message || "Erreur lors de l'extraction IA du fichier cours" });
  }
});

// API: Medical Quiz Generator (QCM & Vrai/Faux with explanations)
app.post('/api/kiju/generate-quiz', async (req, res) => {
  try {
    const { courseTitle, courseContent, questionCount = 5, questionTypes = ['qcm', 'true_false'] } = req.body;

    if (!courseContent) {
      return res.status(400).json({ error: "Le contenu du cours est requis." });
    }

    const ai = getGeminiClient();

    const prompt = `Tu es un expert médical et pédagogique EdTech pour l'application Kiju.
Analyse le cours de santé ci-dessous (Titre: ${courseTitle || 'Cours médical'}).
Génère une série de ${questionCount} questions d'évaluation d'une précision académique irréprochable.
Inclus une combinaison de QCM (avec 4 options et 1 réponse exacte) et de Vrai/Faux.
Fournis obligatoirement une explication détaillée ("explanation") motivée cliniquement ou anatomiquement pour chaque question.

Contenu du cours:
"""
${courseContent.slice(0, 8000)}
"""`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: "Tu es un professeur de faculté de médecine spécialisé dans l'élaboration d'examens et QCM pour PASS/LAS, IFSI et externat.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            keyTerms: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, description: "qcm ou true_false" },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "4 options pour qcm, ou ['Vrai', 'Faux'] pour true_false"
                  },
                  correctIndex: { type: Type.INTEGER, description: "Index 0-based de la bonne réponse" },
                  explanation: { type: Type.STRING, description: "Rappel anatomique/médical justifiant la réponse" },
                  difficulty: { type: Type.STRING, description: "Facile, Moyen, Avancé" }
                },
                required: ["id", "type", "question", "options", "correctIndex", "explanation", "difficulty"]
              }
            }
          },
          required: ["title", "summary", "keyTerms", "questions"]
        }
      }
    });

    const quizData = JSON.parse(response.text || '{}');
    res.json({ success: true, data: quizData });
  } catch (error: any) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ success: false, error: error?.message || "Erreur lors de la génération du QCM" });
  }
});

// API: Text-to-Video Script & Storyboard Generator
app.post('/api/kiju/generate-video-script', async (req, res) => {
  try {
    const { courseTitle, courseContent, targetDurationSeconds = 60 } = req.body;

    if (!courseContent) {
      return res.status(400).json({ error: "Le contenu du cours est requis." });
    }

    const ai = getGeminiClient();

    const prompt = `Tu es un réalisateur de vidéos éducatives médicales courtes pour l'application mobile Kiju (format TikTok/Reels pédagogique 9:16).
Transforme le cours de santé suivant en un script vidéo synthétique de environ ${targetDurationSeconds} secondes.
Découpe en scènes courtes (3 à 8 secondes chacune).
Pour chaque scène, fournis:
1. "narration": Le texte exact à prononcer en voix off (clair, mémorisable, vulgarisé sans perte de rigueur).
2. "visualPrompt": La description visuelle détaillée (ex: 'Animation 3D en coupe du ventricule gauche avec flèches de flux sanguin').
3. "onScreenText": Le texte clé ou schéma affiché à l'écran.
4. "durationSeconds": La durée estimée.

Titre du cours: ${courseTitle || 'Sciences de la Santé'}
Contenu:
"""
${courseContent.slice(0, 8000)}
"""`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            estimatedTotalDuration: { type: Type.INTEGER },
            audioVoiceTone: { type: Type.STRING },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneNumber: { type: Type.INTEGER },
                  durationSeconds: { type: Type.INTEGER },
                  narration: { type: Type.STRING },
                  visualPrompt: { type: Type.STRING },
                  onScreenText: { type: Type.STRING },
                  cameraAngle: { type: Type.STRING }
                },
                required: ["sceneNumber", "durationSeconds", "narration", "visualPrompt", "onScreenText"]
              }
            },
            veoPrompt: { type: Type.STRING, description: "Prompt global pour modèle d'IAG vidéo (Veo 3.1 / HeyGen)" }
          },
          required: ["title", "estimatedTotalDuration", "scenes", "veoPrompt"]
        }
      }
    });

    const scriptData = JSON.parse(response.text || '{}');
    res.json({ success: true, data: scriptData });
  } catch (error: any) {
    console.error("Error generating video script:", error);
    res.status(500).json({ success: false, error: error?.message || "Erreur lors de la génération du script vidéo" });
  }
});

// API: TTS Audio Preview using Gemini TTS
app.post('/api/kiju/generate-tts', async (req, res) => {
  try {
    const { text, voiceName = 'Kore' } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Texte requis pour la synthèse vocale." });
    }

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Lis de manière claire et bienveillante pour un étudiant en santé: ${text}` }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return res.json({ success: true, audioBase64: base64Audio, format: 'audio/pcm' });
    } else {
      return res.json({ success: false, error: "Impossible d'extraire la voix Gemini TTS" });
    }
  } catch (error: any) {
    console.error("Error generating TTS:", error);
    res.status(500).json({ success: false, error: error?.message || "Erreur lors de la synthèse vocale" });
  }
});

// API: Unit Economics Calculator for 1€/mo Micro-Subscription
app.post('/api/kiju/unit-economics', (req, res) => {
  const {
    monthlyPrice = 1.0,
    activeUsers = 10000,
    storeFeePercentage = 15, // Apple Small Business Program (15%) or Standard (30%)
    coursesPerUserMonth = 8,
    videoGenerationRatio = 0.5, // 50% of imported courses generate video
    videoProvider = 'remotion_tts', // 'remotion_tts', 'heygen', 'veo'
    backendProvider = 'supabase' // 'supabase', 'firebase', 'aws'
  } = req.body;

  // Gross Revenue
  const grossRevenue = activeUsers * monthlyPrice;
  const storeFeeAmount = grossRevenue * (storeFeePercentage / 100);

  // RevenueCat fee: Free under $10k MTR, then ~1% or $0.008 per transaction
  const revenueCatFee = grossRevenue > 10000 ? grossRevenue * 0.01 : 0;

  const netRevenueAfterStores = grossRevenue - storeFeeAmount - revenueCatFee;

  // AI API Costs per user / month
  // Gemini 3.6 Flash input: ~$0.10/M tokens, output: ~$0.40/M tokens
  // 1 course parse + quiz gen = ~5,000 tokens in/out = ~$0.002 per course
  const quizGenCostPerCourse = 0.0025;
  const totalQuizCost = activeUsers * coursesPerUserMonth * quizGenCostPerCourse;

  // Video generation cost
  let videoCostPerVideo = 0.01; // Remotion + Gemini TTS + Cloud Storage = ~$0.01
  if (videoProvider === 'heygen') videoCostPerVideo = 0.35; // Avatar video ~$0.35/min
  if (videoProvider === 'veo') videoCostPerVideo = 0.15; // Veo lite AI video ~$0.15/video

  const videosPerUserMonth = coursesPerUserMonth * videoGenerationRatio;
  const totalVideoCost = activeUsers * videosPerUserMonth * videoCostPerVideo;

  // Hosting / Storage / Database (CDN video distribution)
  // ~10MB per video compressed H.264
  const videoStorageCost = (activeUsers * videosPerUserMonth * 0.01) * 0.05; // AWS S3 / Cloudflare R2 ~$0.015/GB
  const backendBaseCost = activeUsers > 5000 ? 50 + (activeUsers * 0.002) : 25;

  const totalCOGS = totalQuizCost + totalVideoCost + videoStorageCost + backendBaseCost;

  const grossProfit = netRevenueAfterStores - totalCOGS;
  const marginPercentage = ((grossProfit / grossRevenue) * 100).toFixed(1);
  const costPerUser = (totalCOGS / activeUsers).toFixed(3);
  const netProfitPerUser = (grossProfit / activeUsers).toFixed(3);

  res.json({
    grossRevenue,
    storeFeeAmount,
    revenueCatFee,
    netRevenueAfterStores,
    cogsBreakdown: {
      totalQuizCost,
      totalVideoCost,
      videoStorageCost,
      backendBaseCost,
      totalCOGS
    },
    grossProfit,
    marginPercentage: parseFloat(marginPercentage),
    metrics: {
      costPerUser: parseFloat(costPerUser),
      netProfitPerUser: parseFloat(netProfitPerUser),
      breakevenPrice: (parseFloat(costPerUser) / (1 - storeFeePercentage / 100)).toFixed(2)
    }
  });
});

  // Setup Vite or static serving
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kiju Backend & UI Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
