export interface SampleCourse {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  content: string;
}

export const SAMPLE_COURSES: SampleCourse[] = [
  {
    id: 'histoire-revolution',
    title: 'Histoire : La Révolution Française',
    category: 'Histoire',
    difficulty: 'Licence 1',
    content: `La Révolution française est une période de bouleversements sociaux et politiques majeurs en France, de 1789 à 1799. Elle a marqué la fin de l'Ancien Régime et le remplacement de la monarchie absolue par une monarchie constitutionnelle, puis par la Première République.
Principales causes :
1. Crise financière : Dette colossale de l'État et impôts inéquitables (le Tiers État paie la majorité, noblesse et clergé sont exemptés).
2. Inégalités sociales : La société d'ordres est de plus en plus contestée.
3. Influence des Lumières : Les philosophes comme Rousseau et Montesquieu promeuvent la liberté et la séparation des pouvoirs.
Événements clés :
- 5 mai 1789 : Ouverture des États généraux.
- 14 juillet 1789 : Prise de la Bastille.
- 26 août 1789 : Déclaration des droits de l'homme et du citoyen.`
  },
  {
    id: 'eco-macro',
    title: 'Introduction à la Macroéconomie',
    category: 'Économie',
    difficulty: 'Licence 2',
    content: `La macroéconomie étudie le fonctionnement de l'économie dans son ensemble. Les principaux indicateurs macroéconomiques sont :
1. Le Produit Intérieur Brut (PIB) : Valeur totale des biens et services produits sur un territoire donné au cours d'une année.
2. Le taux de chômage : Pourcentage d'actifs sans emploi et à la recherche d'un travail.
3. L'inflation : Augmentation générale et durable des prix, mesurée par l'Indice des Prix à la Consommation (IPC).
Les politiques économiques :
- Politique monétaire : Gérée par la Banque Centrale (ex: BCE) pour contrôler la masse monétaire et les taux d'intérêts (objectif: stabilité des prix).
- Politique budgétaire : Gérée par le gouvernement via les dépenses publiques et la fiscalité pour relancer la croissance (politique expansionniste) ou réduire la dette (politique de rigueur).`
  }
];

export interface StackComparison {
  name: string;
  type: 'framework' | 'backend';
  rating: number; // 1-5
  pros: string[];
  cons: string[];
  recommendation: string;
  verdict: 'RECOMMENDED' | 'ALTERNATIVE' | 'NOT_RECOMMENDED';
}

export const STACK_RECOMMENDATIONS: StackComparison[] = [
  {
    name: 'Flutter (Dart)',
    type: 'framework',
    rating: 4.9,
    pros: [
      'Rendu Skia/Impeller 60-120 FPS ultra-fluide idéal pour le rendu de schémas complexes 2D/3D et animations 3D pédagogiques',
      'Excellente gestion de la vidéo 3D native et des composants de canvas interactifs',
      'Support natif IAP mature avec plugin officiel in_app_purchase & RevenueCat Flutter SDK',
      'Compilateur Ahead-Of-Time (AOT) très performant sur iOS et Android',
      'Un seul codebase 100% partagé avec UI identique pixel-perfect'
    ],
    cons: [
      'Langage Dart moins répandu que TypeScript dans l\'écosystème JS',
      'Taille du bundle APK/IPA légèrement plus lourde (~12-15 Mo minimum)'
    ],
    recommendation: 'RECOMMANDATION CTO OFFICIELLE #1. Flutter est idéal pour Kiju en raison de ses performances graphiques, de sa animation 3D fluide et de son écosystème mobile très robuste.',
    verdict: 'RECOMMENDED'
  },
  {
    name: 'React Native + Expo (TypeScript)',
    type: 'framework',
    rating: 4.5,
    pros: [
      'Utilisation de TypeScript/React identique au web (gain de temps de dev)',
      'Large écosystème de librairies UI et RevenueCat SDK react-native-purchases',
      'Expo EAS permet des builds cloud automatisés et OTA updates (Push JavaScript sans passer par les stores)'
    ],
    cons: [
      'Performances légèrement inférieures sur des composants de canvas lourds/animations complexes',
      'Gestion de la mémoire sur la lecture de fichiers d\'animation 3D très denses'
    ],
    recommendation: 'Très bonne alternative si l\'équipe technique est déjà 100% experte en React/TypeScript.',
    verdict: 'ALTERNATIVE'
  },
  {
    name: 'Supabase + Cloud Run / Serverless',
    type: 'backend',
    rating: 4.9,
    pros: [
      'PostgreSQL natif avec stockage vectoriel (pgvector) parfait pour le RAG sur les documents et cours académiques',
      'Auth natif, Storage CDN ultralois pour la distribution des mp4 générés, Row Level Security (RLS)',
      'Échelle coût/performance imbattable pour un modèle à 1 €/mois (offert jusqu\'à 50,000 MAU)'
    ],
    cons: [
      'Nécessite la gestion des migrations PostgreSQL'
    ],
    recommendation: 'RECOMMANDATION CTO OFFICIELLE pour la base de données, l\'authentification et le CDN de stockage vidéo HD.',
    verdict: 'RECOMMENDED'
  },
  {
    name: 'Firebase (Firestore & Cloud Functions)',
    type: 'backend',
    rating: 4.2,
    pros: [
      'Mise en place ultra-rapide en 1 journée',
      'Realtime database & Push notifications faciles'
    ],
    cons: [
      'Base NoSQL moins adaptée aux requêtes relationnelles complexes et au RAG vectoriel',
      'Facturation au nombre de lectures/écritures risquée lors de quiz intensifs'
    ],
    recommendation: 'Option viable pour un prototype rapide, mais Supabase est supérieur sur la durée.',
    verdict: 'ALTERNATIVE'
  }
];

export const AI_BENCHMARK_MATRIX = [
  {
    task: 'Génération de QCM & RAG Pédagogique',
    bestApi: 'Google Gemini 3.6 Flash / Gemini 3.1 Pro',
    latency: '800ms - 1.5s',
    estimatedCost: '0,0015 € par cours',
    accuracyScore: '98.5% (Ajusté avec Structured JSON Schema)',
    why: 'Fenêtre de contexte gigantesque (1M+ tokens), vitesse fulgurante et support natif de JSON Schema strict (Type.OBJECT) garantissant zéro hallucination sur les distractors QCM.'
  },
  {
    task: 'Synthèse Vocale (Text-to-Speech)',
    bestApi: 'Gemini TTS (gemini-3.1-flash-tts-preview) / ElevenLabs',
    latency: '400ms - 800ms',
    estimatedCost: '0,003 € par animation 3D (60s)',
    accuracyScore: '96% (Prononciation académique naturelle)',
    why: 'Gemini TTS offre une prosodie dynamique et gère très bien le termes techniques et concepts académiques complexes. ElevenLabs est le fallback premium.'
  },
  {
    task: 'Text-to-Video & Micro-Animations',
    bestApi: 'Veo 3.1 Lite + Remotion (Programmatic Slides)',
    latency: '2s (Remotion) / 45s (Veo 3.1)',
    estimatedCost: '0,008 € (Remotion) / 0,12 € (Veo)',
    accuracyScore: '100% de clarté pédagogique (Remotion)',
    why: 'Pour un abonnement à 1 €/mois, générer des animations 3D via Remotion (React/HTML5 vers MP4 sur Cloud Run FFmpeg) avec overlays textuels et schémas synthétisés par IA est rentable. Veo 3.1 est réservé aux animations 3D clés.'
  }
];

export const REVENUECAT_WORKFLOW_STEPS = [
  {
    step: '1. Configuration Apple & Google',
    details: 'Création du produit d\'abonnement récurrent "kiju_pro_1eur_monthly" sur App Store Connect (Tier 1 = 0,99 €) et Google Play Console (1,00 €). Activation du Small Business Program (commission à 15% au lieu de 30%).'
  },
  {
    step: '2. Clés RevenueCat & SDK',
    details: 'Initialisation de `purchases-flutter` ou `react-native-purchases` avec la clé API publique RevenueCat. L\'application vérifie l\'accès "pro" au démarrage via `Purchases.getCustomerInfo()`.'
  },
  {
    step: '3. Webhooks & Backend Sync',
    details: 'Configuration d\'un Webhook RevenueCat vers l\'endpoint `/api/webhooks/revenuecat` sur Supabase/Express pour mettre à jour la colonne `is_pro` dans PostgreSQL de manière sécurisée.'
  },
  {
    step: '4. Gestion des Quotas & Limites',
    details: 'Pour éviter qu\'un utilisateur consomme pour 10 € d\'API IA pour seulement 1 € payé, mise en place d\'un système de jetons mensuels (ex: 30 animations 3D / 100 séries de QCM par mois incluses dans l\'abonnement).'
  }
];

export const DEVELOPMENT_MILESTONES = [
  {
    phase: 'Phase 1 : Conception UI/UX & Prototypes (Semaines 1-3)',
    status: 'COMPLETED',
    tasks: [
      'Design System sombre/lumineux adapté à la révision nocturne des étudiants (Lycée, Prépa, Université)',
      'Prototypage du lecteur d\'animation 3D 9:16 vertical (style TikTok éducatif)',
      'Interface interactive de révision par cartes mémoire (Anki-style) et QCM chrono'
    ]
  },
  {
    phase: 'Phase 2 : Architecture Backend & Pipeline IA (Semaines 4-7)',
    status: 'IN_PROGRESS',
    tasks: [
      'Base de données Supabase PostgreSQL avec RLS et Vector Store pour RAG',
      'Intégration du SDK Gemini 3.6 Flash avec validation JSON Schema pour la précision académique',
      'Moteur de génération d\'animation 3D automatisée via Remotion/FFmpeg sur Cloud Run'
    ]
  },
  {
    phase: 'Phase 3 : Intégration Mobile Cross-Platform (Semaines 8-11)',
    status: 'UPCOMING',
    tasks: [
      'Développement Flutter / React Native de l\'application iOS & Android',
      'Intégration In-App Purchase avec RevenueCat SDK & gestion de l\'état hors-ligne',
      'Lecteur audio/animation 3D haute performance avec mise en cache locale des fichiers de cours'
    ]
  },
  {
    phase: 'Phase 4 : Beta Testing & Soumission Stores (Semaines 12-14)',
    status: 'UPCOMING',
    tasks: [
      'TestFlight iOS (500 étudiants (Bêta Testeurs)) & Google Play Beta Fermée',
      'Conformité RGPD et Conditions App Store (Guidelines EdTech)',
      'Déploiement final sur l\'Apple App Store et Google Play Store'
    ]
  }
];
