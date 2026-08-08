import React, { useState } from 'react';
import { Code, Copy, Check, Terminal, ShieldAlert } from 'lucide-react';

export const CodeSnippetsView: React.FC = () => {
  const [activeSnippet, setActiveSnippet] = useState<'flutter_rc' | 'express_gemini' | 'remotion_video' | 'appstore_edu'>('flutter_rc');
  const [copied, setCopied] = useState(false);

  const snippets = {
    flutter_rc: {
      title: 'Flutter RevenueCat SDK (IAP 1 €/mo)',
      filename: 'lib/services/purchase_service.dart',
      language: 'dart',
      code: `import 'dart:io';
import 'package:purchases_flutter/purchases_flutter.dart';

class PurchaseService {
  static const _apiKeyApple = 'appl_kiju_revenuecat_api_key';
  static const _apiKeyGoogle = 'goog_kiju_revenuecat_api_key';
  static const entitlementId = 'pro_access';

  static Future<void> init() async {
    await Purchases.setLogLevel(LogLevel.info);

    PurchasesConfiguration configuration;
    if (Platform.isIOS) {
      configuration = PurchasesConfiguration(_apiKeyApple);
    } else if (Platform.isAndroid) {
      configuration = PurchasesConfiguration(_apiKeyGoogle);
    } else {
      return;
    }

    await Purchases.configure(configuration);
  }

  // Vérifie si l'étudiant a l'abonnement Kiju Pro actif à 1 €/mois
  static Future<bool> isProUser() async {
    try {
      CustomerInfo customerInfo = await Purchases.getCustomerInfo();
      return customerInfo.entitlements.all[entitlementId]?.isActive ?? false;
    } catch (e) {
      print('Erreur vérification abonnement: $e');
      return false;
    }
  }

  // Achète l'abonnement mensuel à 1 €
  static Future<bool> purchaseProSubscription() async {
    try {
      Offerings offerings = await Purchases.getOfferings();
      if (offerings.current != null && offerings.current!.monthly != null) {
        CustomerInfo customerInfo = await Purchases.purchasePackage(
          offerings.current!.monthly!
        );
        return customerInfo.entitlements.all[entitlementId]?.isActive ?? false;
      }
    } catch (e) {
      print('Achat échoué ou annulé: $e');
    }
    return false;
  }
}`
    },

    express_gemini: {
      title: 'Express + Gemini 3.6 Flash (QCM Académique avec Schema Strict)',
      filename: 'server/controllers/quizController.ts',
      language: 'typescript',
      code: `import { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

export async function generateEduQuiz(req: Request, res: Response) {
  const { courseText, questionCount = 5 } = req.body;

  const prompt = \`Tu es un enseignant expert en pédagogie.
Génère \${questionCount} QCM d'évaluation pédagogique d'une précision irréprochable basés STRICTEMENT sur le cours ci-dessous.
Chaque question doit obligatoirement inclure une explication détaillée et justifiée.\n\n\${courseText}\`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.INTEGER },
                explanation: { type: Type.STRING }
              },
              required: ["id", "question", "options", "correctIndex", "explanation"]
            }
          }
        },
        required: ["title", "questions"]
      }
    }
  });

  return res.json(JSON.parse(response.text || '{}'));
}`
    },

    remotion_video: {
      title: 'React Remotion (Génération Composant Animation 3D HD 9:16 MP4)',
      filename: 'src/remotion/EduSlideComposition.tsx',
      language: 'tsx',
      code: `import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SceneProps {
  title: string;
  narration: string;
  visualPrompt: string;
}

export const EduSlideComposition: React.FC<SceneProps> = ({ title, narration, visualPrompt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp' });
  const scale = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill className="bg-slate-950 text-white p-8 flex flex-col justify-between font-sans">
      <div style={{ opacity }} className="space-y-2">
        <span className="bg-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase">Kiju EdTech</span>
        <h1 className="text-3xl font-extrabold text-white leading-tight">{title}</h1>
      </div>

      <div style={{ transform: \`scale(\${scale})\` }} className="my-auto bg-slate-900/90 p-6 rounded-2xl border border-indigo-500/30 text-center">
        <p className="text-xl font-medium text-indigo-200">"{visualPrompt}"</p>
      </div>

      <div className="bg-indigo-950/90 p-4 rounded-xl border border-indigo-800 text-center">
        <p className="text-lg font-semibold text-white">"{narration}"</p>
      </div>
    </AbsoluteFill>
  );
};`
    },

    appstore_edu: {
      title: 'App Store EdTech & Subscription Compliance',
      filename: 'docs/APP_STORE_EDTECH.md',
      language: 'markdown',
      code: `# Conformité App Store Connect & Google Play pour Kiju

## 1. Avertissement Légal Obligatoire (Disclaimer)
Pour respecter la directive Apple **App Store Review Guidelines (Éducation & Propriété Intellectuelle)** :
L'application doit intégrer un pop-up d'acceptation au premier lancement et un bandeau permanent dans les paramètres :

> *"Kiju est un outil pédagogique d'aide à la révision réservé aux étudiants. L'application est conçue pour l'apprentissage et l'assimilation de cours denses via IA."*

## 2. In-App Purchase (Règle 3.1.1)
- L'abonnement à 1 €/mois doit inclure des liens visibles vers les **Conditions Générales d'Utilisation (CGU / EULA)** et la **Politique de Confidentialité**.
- Bouton obligatoire *"Restauration des achats"* (\`Purchases.restorePurchases()\`).`
    }
  };

  const currentSnippet = snippets[activeSnippet];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white font-display">Bibliothèque de Code Source & Conformité</h2>
        <p className="text-slate-400 text-sm mt-1">
          Extraits de code prêts pour la production : initialisation RevenueCat Flutter, contrôleur Express Gemini, composant d'animation 3D Remotion et checklist App Store pour application éducative.
        </p>
      </div>

      {/* Snippet Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSnippet('flutter_rc')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSnippet === 'flutter_rc'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Flutter RevenueCat SDK
        </button>
        <button
          onClick={() => setActiveSnippet('express_gemini')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSnippet === 'express_gemini'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Express + Gemini 3.6 QCM
        </button>
        <button
          onClick={() => setActiveSnippet('remotion_video')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSnippet === 'remotion_video'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Remotion Animation 3D MP4
        </button>
        <button
          onClick={() => setActiveSnippet('appstore_edu')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSnippet === 'appstore_edu'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Conformité Store EdTech
        </button>
      </div>

      {/* Code Display Frame */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono text-slate-300">{currentSnippet.filename}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Copié !
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copier
              </>
            )}
          </button>
        </div>

        <pre className="p-5 text-xs font-mono text-indigo-200 leading-relaxed overflow-x-auto whitespace-pre">
          {currentSnippet.code}
        </pre>
      </div>
    </div>
  );
};
