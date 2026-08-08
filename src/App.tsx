import React, { useState } from 'react';
import { CtoRoadmapView } from './components/CtoRoadmapView';
import { LiveStudioSimulator } from './components/LiveStudioSimulator';
import { UnitEconomicsCalculator } from './components/UnitEconomicsCalculator';
import { ArchitectureDiagramView } from './components/ArchitectureDiagramView';
import { CodeSnippetsView } from './components/CodeSnippetsView';
import { Layers, Sparkles, Calculator, Network, Code2, HeartPulse, CheckCircle2, ShieldCheck, Github } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'roadmap' | 'studio' | 'calculator' | 'architecture' | 'code'>('roadmap');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black font-display tracking-tight text-white flex items-center gap-1.5">
                Kiju <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-sans font-semibold">CTO Portal</span>
              </span>
              <span className="block text-[11px] text-slate-400 font-medium">Outil de Révision IA & Micro-Abonnement 1 €</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentView('roadmap')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                currentView === 'roadmap'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Rapport CTO
            </button>

            <button
              onClick={() => setCurrentView('studio')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                currentView === 'studio'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Simulateur IA Studio
            </button>

            <button
              onClick={() => setCurrentView('calculator')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                currentView === 'calculator'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Rentabilité (1€)
            </button>

            <button
              onClick={() => setCurrentView('architecture')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                currentView === 'architecture'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Schéma Système
            </button>

            <button
              onClick={() => setCurrentView('code')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                currentView === 'code'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Code Source
            </button>
          </nav>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-800/80 gap-2 no-scrollbar">
          <button
            onClick={() => setCurrentView('roadmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 ${
              currentView === 'roadmap' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Rapport CTO
          </button>
          <button
            onClick={() => setCurrentView('studio')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 ${
              currentView === 'studio' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Simulateur IA Studio
          </button>
          <button
            onClick={() => setCurrentView('calculator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 ${
              currentView === 'calculator' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Rentabilité (1€)
          </button>
          <button
            onClick={() => setCurrentView('architecture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 ${
              currentView === 'architecture' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Architecture
          </button>
          <button
            onClick={() => setCurrentView('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 ${
              currentView === 'code' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Code Source
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'roadmap' && <CtoRoadmapView />}
        {currentView === 'studio' && <LiveStudioSimulator />}
        {currentView === 'calculator' && <UnitEconomicsCalculator />}
        {currentView === 'architecture' && <ArchitectureDiagramView />}
        {currentView === 'code' && <CodeSnippetsView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Kiju EdTech Architecture & Decision Framework • Conçu pour la réussite étudiante</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Apple & Google Store Ready</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Gemini 3.6 Flash Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
