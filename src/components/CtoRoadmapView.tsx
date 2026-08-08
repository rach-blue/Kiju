import React, { useState } from 'react';
import { STACK_RECOMMENDATIONS, AI_BENCHMARK_MATRIX, REVENUECAT_WORKFLOW_STEPS, DEVELOPMENT_MILESTONES } from '../data/kijuContent';
import { Layers, Cpu, CreditCard, Calendar, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Zap, Sparkles } from 'lucide-react';

export const CtoRoadmapView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack' | 'ai' | 'payment' | 'timeline'>('stack');

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-emerald-950/40 p-6 md:p-8 rounded-2xl border border-indigo-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Rapport de Directivité Technique (CTO)
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-white">
              Feuille de Route & Architecture pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Kiju</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
              Plan d'action stratégique et choix technologiques optimisés pour la révision académique mobile, avec génération d'animations 3D HD par IA et abonnement à 1 € / mois.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="bg-slate-900/80 backdrop-blur px-4 py-3 rounded-xl border border-slate-800 text-center">
              <span className="block text-xs text-slate-400">Target Monthly Fee</span>
              <span className="text-xl font-bold text-emerald-400">1,00 € / mois</span>
            </div>
            <div className="bg-slate-900/80 backdrop-blur px-4 py-3 rounded-xl border border-slate-800 text-center">
              <span className="block text-xs text-slate-400">Core Platform</span>
              <span className="text-xl font-bold text-indigo-400">iOS & Android</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('stack')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'stack'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            1. Stack Technique
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'ai'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            2. API d'IA & Précision
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'payment'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            3. Paiement RevenueCat (1€)
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'timeline'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            4. Étapes & Jalons
          </button>
        </div>
      </div>

      {/* SECTION 1: STACK TECHNIQUE */}
      {activeTab === 'stack' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Recommandation d'Architecture & Stack Technique
            </h2>
            <p className="text-slate-400 text-sm">
              Analyse comparative du framework mobile (Cross-Platform) et du backend pour soutenir Kiju sur iOS & Android.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STACK_RECOMMENDATIONS.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all ${
                  item.verdict === 'RECOMMENDED'
                    ? 'bg-slate-900/90 border-indigo-500/50 ring-1 ring-indigo-500/30'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {item.type === 'framework' ? 'Framework Mobile' : 'Backend & Base de Données'}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{item.name}</h3>
                  </div>
                  {item.verdict === 'RECOMMENDED' ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Recommandé CTO
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium">
                      Alternative Viable
                    </span>
                  )}
                </div>

                <p className="text-xs text-indigo-300 bg-indigo-950/50 p-3 rounded-xl border border-indigo-900/50 mb-4">
                  {item.recommendation}
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Avantages clés pour Kiju
                    </h4>
                    <ul className="space-y-1.5 text-sm text-slate-300">
                      {item.pros.map((pro, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {item.cons.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Points de vigilance
                      </h4>
                      <ul className="space-y-1.5 text-sm text-slate-400">
                        {item.cons.map((con, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Synthèse Globale de la Stack Gagnante
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="block text-xs text-slate-400 mb-1">Mobile App</span>
                <span className="font-bold text-white text-base">Flutter (Dart)</span>
                <p className="text-xs text-slate-400 mt-1">Rendu Impeller 120 FPS, intégration 3D native et canvas interactifs.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="block text-xs text-slate-400 mb-1">Backend & Auth</span>
                <span className="font-bold text-white text-base">Supabase</span>
                <p className="text-xs text-slate-400 mt-1">PostgreSQL + pgvector (RAG cours) + Auth + CDN stockage vidéo 3D HD.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="block text-xs text-slate-400 mb-1">AI Pipeline Server</span>
                <span className="font-bold text-white text-base">Node.js Express / Cloud Run</span>
                <p className="text-xs text-slate-400 mt-1">Serveur sécurisé pour requêtes Gemini 3.6 Flash & tâches de rendu 3D FFmpeg.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="block text-xs text-slate-400 mb-1">In-App Purchase</span>
                <span className="font-bold text-white text-base">RevenueCat</span>
                <p className="text-xs text-slate-400 mt-1">Gestion automatique des abonnements iOS/Android à 1 € / mois.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: API AI & PRECISION */}
      {activeTab === 'ai' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              Sélection des API d'Intelligence Artificielle & Précision Académique
            </h2>
            <p className="text-slate-400 text-sm">
              Dans l'apprentissage, le risque de résumés tronqués ou d'erreurs dans les QCM est inacceptable. Voici l'architecture IA garantissant la rigueur académique.
            </p>
          </div>

          <div className="space-y-4">
            {AI_BENCHMARK_MATRIX.map((item, idx) => (
              <div key={idx} className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Module IA #{idx + 1}</span>
                    <h3 className="text-xl font-bold text-white">{item.task}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-indigo-950 text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-800/50 font-mono">
                      API: {item.bestApi}
                    </span>
                    <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg font-mono">
                      Latence: {item.latency}
                    </span>
                    <span className="bg-emerald-950 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-800/50 font-mono">
                      Coût: {item.estimatedCost}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase">Pourquoi cette solution ?</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.why}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
                    <span className="text-xs text-slate-400">Score de Précision Académique</span>
                    <span className="text-2xl font-extrabold text-emerald-400 mt-1">{item.accuracyScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Precision Mechanisms */}
          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 p-6 rounded-2xl border border-indigo-500/20 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              Garantie de Précision Académique (Anti-Hallucination)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <span className="font-bold text-indigo-300 block mb-1">1. RAG Strict sur le Cours</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  L'IA ne génère jamais de questions à partir de ses connaissances générales sans ancrage. Tout le QCM est extrait strictement du document importé par l'étudiant.
                </p>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <span className="font-bold text-indigo-300 block mb-1">2. Structured JSON Schema</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Utilisation du mode JSON natif Gemini (`responseSchema`) qui force une structure rigide (question, options, correctIndex, justification académique).
                </p>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <span className="font-bold text-indigo-300 block mb-1">3. Justification Académique Obligatoire</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Chaque question générée s'accompagne obligatoirement d'une explication pédagogique ou théorique claire pour ancrer la mémorisation active.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: REVENUECAT & PAYMENT */}
      {activeTab === 'payment' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              Architecture In-App Purchase & Modèle 1 € / mois avec RevenueCat
            </h2>
            <p className="text-slate-400 text-sm">
              Stratégie technique pour intégrer un micro-abonnement mensuel sur Apple App Store et Google Play Store sans perte de rentabilité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Optimisation des Frais de Store (15% vs 30%)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Sur un prix de 1,00 € TTC, la commission standard d'Apple/Google de 30% laisserait seulement 0,70 €.
              </p>
              <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-900/50 text-sm space-y-2">
                <span className="font-bold text-emerald-300 block">Solution : Apple Small Business Program & Google Tier 15%</span>
                <p className="text-xs text-slate-300">
                  En inscrivant Kiju au Small Business Program d'Apple et au niveau 15% de Google (valable pour toutes les entreprises générant &lt; 1M$ / an), la commission tombe à <strong className="text-emerald-400">15%</strong>.
                </p>
                <div className="pt-2 flex justify-between items-center text-xs border-t border-emerald-900/50">
                  <span>Prix Client : 1,00 € TTC</span>
                  <span className="font-bold text-emerald-400">Revenu Net Store : ~0,85 €</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Stratégie Anti-Abus & Quotas de Consommation IA
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Si un utilisateur génère 200 animations 3D par mois, le coût de l'API IA dépassera largement son abonnement de 1 €.
              </p>
              <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-900/50 text-sm space-y-2">
                <span className="font-bold text-amber-300 block">Mise en place d'un système de Jetons Mensuels</span>
                <p className="text-xs text-slate-300">
                  L'abonnement à 1 € donne accès à <strong className="text-amber-400">30 animations 3D courtes HD / mois</strong> et des QCM illimités. Des recharges optionnelles de jetons peuvent être proposées en In-App Purchase ponctuel (0,99 € pour 50 animations 3D supplémentaires).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Flux d'Intégration RevenueCat Récurrent</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {REVENUECAT_WORKFLOW_STEPS.map((step, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mb-2">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-white text-sm mb-1">{step.step}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: TIMELINE & MILESTONES */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              Feuille de Route & Phases de Développement
            </h2>
            <p className="text-slate-400 text-sm">
              Planning de réalisation sur 14 semaines, du design de l'interface jusqu'à la publication officielle sur l'App Store et Google Play.
            </p>
          </div>

          <div className="space-y-4">
            {DEVELOPMENT_MILESTONES.map((phase, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{phase.phase}</h3>
                  {phase.status === 'COMPLETED' && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                      Option Déjà Câblée dans la Demo
                    </span>
                  )}
                  {phase.status === 'IN_PROGRESS' && (
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                      En Cours
                    </span>
                  )}
                  {phase.status === 'UPCOMING' && (
                    <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium">
                      Planifié
                    </span>
                  )}
                </div>

                <ul className="space-y-2 text-sm text-slate-300">
                  {phase.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
