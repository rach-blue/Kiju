import React, { useState } from 'react';
import { Smartphone, Server, Database, Cpu, CreditCard, Film, ArrowRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export const ArchitectureDiagramView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('app');

  const nodes = [
    {
      id: 'app',
      name: 'Mobile App (Flutter / RN)',
      icon: Smartphone,
      category: 'Client iOS / Android',
      description: 'Application mobile native multiplateforme gérant l\'interface de révision, la lecture d\'animations 3D HD 9:16, le lecteur QCM et la mise en cache locale.',
      tech: ['Flutter (Dart)', 'SQLite / Drift', 'Video Player', 'RevenueCat SDK']
    },
    {
      id: 'revenuecat',
      name: 'RevenueCat IAP Engine',
      icon: CreditCard,
      category: 'Facturation Micro-Abonnement',
      description: 'Gestion des achats In-App (Apple App Store / Google Play). Synchronise automatiquement les droits "pro" et gère le renouvellement récurrent à 1 €/mois.',
      tech: ['In-App Purchase', 'Webhooks', 'Entitlement Validation', 'Apple Small Business (15%)']
    },
    {
      id: 'backend',
      name: 'Backend API Server',
      icon: Server,
      category: 'Serveur Métier (Cloud Run)',
      description: 'Passerelle sécurisée Node.js Express orchestrant les requêtes vers l\'IA Gemini, appliquant la logique de quotas d\'utilisation et protégeant les clés d\'API.',
      tech: ['Node.js Express', 'TypeScript', 'Rate Limiter', 'Gemini SDK Server-Side']
    },
    {
      id: 'gemini',
      name: 'Google Gemini 3.6 Flash & TTS',
      icon: Cpu,
      category: 'Moteur d\'IA Pédagogique',
      description: 'Moteur IA de synthèse académique, génération de QCM structurés avec schéma JSON strict (anti-hallucination) et synthèse vocale Gemini TTS.',
      tech: ['Gemini 3.6 Flash', 'Gemini TTS', 'Structured JSON Schema', 'RAG Context']
    },
    {
      id: 'video',
      name: 'Remotion 3D Animation Rendering',
      icon: Film,
      category: 'Génération d\'Animation 3D Automatisée',
      description: 'Pipeline de rendu React Remotion / FFmpeg exécuté sur des containers Cloud Run éphémères pour fabriquer le fichier MP4 d\'animation 3D final de 60 secondes.',
      tech: ['Remotion React', 'Cloud Run Jobs', 'FFmpeg', 'H.264 MP4']
    },
    {
      id: 'supabase',
      name: 'Supabase DB & CDN',
      icon: Database,
      category: 'Base de Données & Stockage',
      description: 'Base PostgreSQL avec extension pgvector pour le RAG sur les cours de médecine et stockage CDN S3 pour la distribution ultra-rapide des cours et animations 3D HD.',
      tech: ['PostgreSQL', 'pgvector', 'Storage CDN', 'Row Level Security']
    }
  ];

  const activeNodeData = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white font-display">Schéma d'Architecture Système Globale</h2>
        <p className="text-slate-400 text-sm mt-1">
          Topologie interconnectée des micro-services, flux de paiement RevenueCat, pipeline IA Gemini et stockage CDN. Cliquez sur un bloc pour inspecter sa configuration.
        </p>
      </div>

      {/* Node Interactive Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nodes.map((node) => {
          const Icon = node.icon;
          const isSelected = selectedNode === node.id;

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-950/80 border-indigo-500 shadow-xl ring-2 ring-indigo-500/30'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {node.category}
                </span>
              </div>

              <h3 className="font-bold text-white text-base mb-1">{node.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{node.description}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Panel */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-indigo-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-600 text-white">
            {React.createElement(activeNodeData.icon, { className: 'w-6 h-6' })}
          </div>
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{activeNodeData.category}</span>
            <h3 className="text-xl font-bold text-white">{activeNodeData.name}</h3>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
          {activeNodeData.description}
        </p>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technologies clés utilisées :</h4>
          <div className="flex flex-wrap gap-2">
            {activeNodeData.tech.map((t, idx) => (
              <span key={idx} className="text-xs px-3 py-1.5 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800/50 font-mono">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
