import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Users, Server, Zap, ShieldCheck, AlertCircle, PieChart } from 'lucide-react';

export const UnitEconomicsCalculator: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState(10000);
  const [monthlyPrice, setMonthlyPrice] = useState(1.0);
  const [coursesPerUser, setCoursesPerUser] = useState(8);
  const [videoRatio, setVideoRatio] = useState(50); // %
  const [videoProvider, setVideoProvider] = useState<'remotion_tts' | 'veo' | 'heygen'>('remotion_tts');
  const [storeFeePercentage, setStoreFeePercentage] = useState(15); // 15% vs 30%

  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    fetch('/api/kiju/unit-economics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        monthlyPrice,
        activeUsers,
        storeFeePercentage,
        coursesPerUserMonth: coursesPerUser,
        videoGenerationRatio: videoRatio / 100,
        videoProvider,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.error(err));
  }, [activeUsers, monthlyPrice, coursesPerUser, videoRatio, videoProvider, storeFeePercentage]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              Rentabilité & Unit Economics
            </div>
            <h2 className="text-2xl font-bold text-white font-display">Calculateur Financier - Abonnement 1 € / mois</h2>
            <p className="text-slate-400 text-sm mt-1">
              Simulez la marge brute, les frais de store App Store/Google Play (15% vs 30%), les coûts d'API Gemini IA et l'hébergement CDN vidéo en temps réel.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Paramètres du Modèle
          </h3>

          {/* Active Users Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300">Étudiants Abonnés (MAU) :</span>
              <span className="text-indigo-400 font-bold font-mono">{activeUsers.toLocaleString()} étudiants</span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={activeUsers}
              onChange={(e) => setActiveUsers(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300">Prix de l'Abonnement / mois :</span>
              <span className="text-emerald-400 font-bold font-mono">{monthlyPrice.toFixed(2)} € / mois</span>
            </div>
            <input
              type="range"
              min="0.99"
              max="3.99"
              step="0.01"
              value={monthlyPrice}
              onChange={(e) => setMonthlyPrice(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Courses per User */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300">Cours Importés / Étudiant / mois :</span>
              <span className="text-indigo-300 font-bold font-mono">{coursesPerUser} cours</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={coursesPerUser}
              onChange={(e) => setCoursesPerUser(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* % Video Ratio */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-300">% de Cours Générant une Animation 3D :</span>
              <span className="text-indigo-300 font-bold font-mono">{videoRatio}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={videoRatio}
              onChange={(e) => setVideoRatio(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Store Fee Tier */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium block">Commission App Store / Google Play :</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStoreFeePercentage(15)}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  storeFeePercentage === 15
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                15% (Small Business Program)
              </button>
              <button
                onClick={() => setStoreFeePercentage(30)}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  storeFeePercentage === 30
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                30% (Standard Tier)
              </button>
            </div>
          </div>

          {/* Video Provider Selector */}
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium block">Moteur de Génération 3D :</label>
            <div className="space-y-2">
              <button
                onClick={() => setVideoProvider('remotion_tts')}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                  videoProvider === 'remotion_tts'
                    ? 'bg-indigo-950 border-indigo-500 text-white font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex justify-between">
                  <span>Remotion + Gemini TTS (Optimisé)</span>
                  <span className="text-emerald-400 font-bold">~0,01 € / animation 3D</span>
                </div>
              </button>
              <button
                onClick={() => setVideoProvider('veo')}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                  videoProvider === 'veo'
                    ? 'bg-indigo-950 border-indigo-500 text-white font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex justify-between">
                  <span>Veo 3.1 Lite Generative Video</span>
                  <span className="text-amber-400 font-bold">~0,15 € / animation 3D</span>
                </div>
              </button>
              <button
                onClick={() => setVideoProvider('heygen')}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                  videoProvider === 'heygen'
                    ? 'bg-indigo-950 border-indigo-500 text-white font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex justify-between">
                  <span>HeyGen Avatar IA</span>
                  <span className="text-rose-400 font-bold">~0,35 € / animation 3D</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {metrics ? (
            <>
              {/* Summary Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Chiffre d'Affaires Brut (MTR)</span>
                  <span className="text-2xl font-extrabold text-white font-mono">
                    {metrics.grossRevenue?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">1,00 € × {activeUsers.toLocaleString()} clients</span>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Marge Brute Globale</span>
                  <span className={`text-2xl font-extrabold font-mono ${metrics.marginPercentage >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {metrics.marginPercentage}%
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Profit net: {metrics.grossProfit?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Profit Net / Étudiant</span>
                  <span className="text-2xl font-extrabold text-indigo-400 font-mono">
                    {metrics.metrics?.netProfitPerUser} € / mo
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">Coût IA/Serveur: {metrics.metrics?.costPerUser} €</span>
                </div>
              </div>

              {/* Cost Breakdown Details */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-400" />
                  Décomposition des Coûts Mensuels
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-300">Commission Stores ({storeFeePercentage}%)</span>
                    <span className="font-mono text-rose-400">-{metrics.storeFeeAmount?.toFixed(2)} €</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-300">RevenueCat (Gestion In-App)</span>
                    <span className="font-mono text-slate-400">
                      {metrics.revenueCatFee === 0 ? 'Offert (< 10k$ MTR)' : `-${metrics.revenueCatFee.toFixed(2)} €`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-300">Coût Génération QCM (Gemini 3.6 Flash)</span>
                    <span className="font-mono text-amber-400">-{metrics.cogsBreakdown?.totalQuizCost.toFixed(2)} €</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-300">Coût Génération 3D ({videoProvider})</span>
                    <span className="font-mono text-amber-400">-{metrics.cogsBreakdown?.totalVideoCost.toFixed(2)} €</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-300">Stockage CDN & Base de données (Supabase/S3)</span>
                    <span className="font-mono text-amber-400">-{metrics.cogsBreakdown?.videoStorageCost.toFixed(2)} €</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 font-bold text-base text-white">
                    <span>Revenu Net Final (Bénéfice)</span>
                    <span className="font-mono text-emerald-400">{metrics.grossProfit?.toFixed(2)} € / mois</span>
                  </div>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="bg-gradient-to-r from-emerald-950/50 via-slate-900 to-indigo-950/50 p-6 rounded-2xl border border-emerald-500/30 space-y-2">
                <span className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Verdict de Viabilité Financière du CTO :
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Le modèle à <strong>1,00 € / mois</strong> est hautement rentable (marge supérieure à <strong>65%</strong>) sous réserve d'utiliser la pile de rendu 3D <strong>Remotion + Gemini TTS</strong> et de bénéficier du taux de commission App Store à <strong>15%</strong>.
                </p>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-500">Chargement des métriques...</div>
          )}
        </div>
      </div>
    </div>
  );
};
