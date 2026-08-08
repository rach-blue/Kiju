import React, { useState, useRef } from 'react';
import { SAMPLE_COURSES, SampleCourse } from '../data/kijuContent';
import { Sparkles, FileText, Play, Volume2, CheckCircle2, XCircle, RotateCcw, Clapperboard, HelpCircle, Loader2, Video, Award, RefreshCw, Check, ArrowRight, Upload, UploadCloud, FileUp, FileCheck, Image, FileType } from 'lucide-react';

export const LiveStudioSimulator: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<SampleCourse>(SAMPLE_COURSES[0]);
  const [customTitle, setCustomTitle] = useState('');
  const [customText, setCustomText] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [inputTab, setInputTab] = useState<'preset' | 'upload' | 'text'>('preset');

  // File upload state
  const [isExtractingFile, setIsExtractingFile] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{ name: string; size: string; type: string } | null>(null);
  const [keyConcepts, setKeyConcepts] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Output states
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const [quizError, setQuizError] = useState<string | null>(null);

  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoScriptData, setVideoScriptData] = useState<any>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Interactive Quiz State
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  // TTS State
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [ttsError, setTtsError] = useState<string | null>(null);

  const currentContent = isCustomMode ? customText : selectedCourse.content;
  const currentTitle = isCustomMode ? (customTitle || 'Cours Personnalisé') : selectedCourse.title;

  const processFile = async (file: File) => {
    if (!file) return;
    setIsExtractingFile(true);
    setExtractionError(null);
    setUploadedFileInfo({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type || 'Document'
    });

    try {
      let payload: any = {
        fileName: file.name,
        fileType: file.type || 'application/pdf',
      };

      if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const text = await file.text();
        payload.textContent = text;
      } else {
        // Read binary/PDF/image as base64
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        payload.base64Data = btoa(binary);
      }

      const response = await fetch('/api/kiju/extract-course-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const res = await response.json();
      if (res.success && res.data) {
        setCustomTitle(res.data.title || file.name.replace(/\.[^/.]+$/, ''));
        setCustomText(res.data.extractedText || '');
        setKeyConcepts(res.data.keyConcepts || []);
        setIsCustomMode(true);
      } else {
        setExtractionError(res.error || 'Erreur lors de l\'extraction du contenu du fichier.');
      }
    } catch (err: any) {
      setExtractionError(err.message || 'Erreur lors du traitement du fichier.');
    } finally {
      setIsExtractingFile(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSamplePdfUpload = () => {
    setIsExtractingFile(true);
    setTimeout(() => {
      const demoContent = `# Histoire : La Révolution Française
La Révolution française est une période de bouleversements sociaux et politiques majeurs en France, de 1789 à 1799.
## Causes de la Révolution
- **Crise financière** : Dette colossale de l'État.
- **Inégalités sociales** : La société d'ordres est contestée.
- **Idées des Lumières** : Remise en cause de l'absolutisme.
- **Crise agricole** : Mauvaises récoltes.`;
      setCustomText(demoContent);
      setCustomTitle('Histoire : La Révolution Française');
      setKeyConcepts(['Crise financière', 'Lumières', 'Bastille', '1789', 'Tiers État']);
      setIsCustomMode(true);
      setIsExtractingFile(false);
    }, 1000);
  };

  const handleGenerateQuiz = async () => {
    if (!currentContent.trim()) return;
    setIsGeneratingQuiz(true);
    setQuizError(null);
    setUserAnswers({});
    setShowResults(false);

    try {
      const response = await fetch('/api/kiju/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseTitle: currentTitle,
          courseContent: currentContent,
          questionCount: 5,
        }),
      });

      const res = await response.json();
      if (res.success && res.data) {
        setQuizData(res.data);
      } else {
        setQuizError(res.error || 'Erreur lors de la génération');
      }
    } catch (err: any) {
      setQuizError(err.message || 'Erreur réseau');
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleGenerateVideoScript = async () => {
    if (!currentContent.trim()) return;
    setIsGeneratingVideo(true);
    setVideoError(null);

    try {
      const response = await fetch('/api/kiju/generate-video-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseTitle: currentTitle,
          courseContent: currentContent,
          targetDurationSeconds: 60,
        }),
      });

      const res = await response.json();
      if (res.success && res.data) {
        setVideoScriptData(res.data);
      } else {
        setVideoError(res.error || 'Erreur lors de la génération du script');
      }
    } catch (err: any) {
      setVideoError(err.message || 'Erreur réseau');
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handlePlayTTS = async (textToSpeak: string) => {
    setIsPlayingTTS(true);
    setTtsError(null);

    try {
      const response = await fetch('/api/kiju/generate-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, voiceName: 'Kore' }),
      });

      const res = await response.json();
      if (res.success && res.audioBase64) {
        // Decode audio/pcm 24kHz or audio data
        const binary = atob(res.audioBase64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary.charCodeAt(i);
        }

        // Web Audio API to play PCM or Audio
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const pcm16 = new Int16Array(bytes.buffer);
        const float32 = new Float32Array(pcm16.length);
        for (let i = 0; i < pcm16.length; i++) {
          float32[i] = pcm16[i] / 32768.0;
        }

        const buffer = audioCtx.createBuffer(1, float32.length, 24000);
        buffer.getChannelData(0).set(float32);

        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.onended = () => setIsPlayingTTS(false);
        source.start(0);
      } else {
        setTtsError(res.error || 'Synthèse vocale indisponible');
        setIsPlayingTTS(false);
      }
    } catch (err: any) {
      setTtsError(err.message || 'Erreur audio');
      setIsPlayingTTS(false);
    }
  };

  const handleOptionSelect = (questionId: string, optionIdx: number) => {
    if (showResults) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    if (!quizData || !quizData.questions) return 0;
    let correct = 0;
    quizData.questions.forEach((q: any) => {
      if (userAnswers[q.id] === q.correctIndex) correct++;
    });
    return correct;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Simulateur & Transcripteur
            </div>
            <h2 className="text-2xl font-bold text-white font-display">Kiju Studio - Moteur de Transcription Vidéo & QCM par IA</h2>
            <p className="text-slate-400 text-sm mt-1">
              Téléversez vos propres fiches de cours (PDF, Scan, Document, Texte) ou utilisez nos modèles pour les transcrire automatiquement en animations 3D HD 9:16 et QCMs de révision.
            </p>
          </div>
        </div>
      </div>

      {/* Course Selection & Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Course Selector, File Uploader & Text */}
        <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Source du Cours
            </h3>
            {uploadedFileInfo && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                Fichier Chargé
              </span>
            )}
          </div>

          {/* Input Mode Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => {
                setInputTab('preset');
                setIsCustomMode(false);
              }}
              className={`py-2 px-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                inputTab === 'preset' && !isCustomMode
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Modèles
            </button>

            <button
              onClick={() => {
                setInputTab('upload');
                setIsCustomMode(true);
              }}
              className={`py-2 px-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                inputTab === 'upload' || (isCustomMode && uploadedFileInfo)
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Téléverser
            </button>

            <button
              onClick={() => {
                setInputTab('text');
                setIsCustomMode(true);
              }}
              className={`py-2 px-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                inputTab === 'text' && isCustomMode && !uploadedFileInfo
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileType className="w-3.5 h-3.5" />
              Coller Texte
            </button>
          </div>

          {/* TAB 1: Preset Models */}
          {inputTab === 'preset' && !isCustomMode && (
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-medium block">Sélectionnez un modèle de cours :</label>
              <div className="space-y-2">
                {SAMPLE_COURSES.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => {
                      setSelectedCourse(course);
                      setQuizData(null);
                      setVideoScriptData(null);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all cursor-pointer ${
                      selectedCourse.id === course.id
                        ? 'bg-indigo-950/80 border-indigo-500 text-white font-semibold shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono">
                        {course.category}
                      </span>
                      <span className="text-xs text-slate-400">{course.difficulty}</span>
                    </div>
                    <span className="block font-medium">{course.title}</span>
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 mt-3">
                <span className="text-xs text-slate-400 font-semibold block">Aperçu du cours modèle :</span>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-5">
                  {selectedCourse.content}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Upload File (PDF, Image Scan, Markdown, Text) */}
          {inputTab === 'upload' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.md,.doc,.docx"
                className="hidden"
              />

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-indigo-500/40 hover:border-indigo-400 bg-indigo-950/20 hover:bg-indigo-950/40 p-6 rounded-2xl text-center cursor-pointer transition-all space-y-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">Téléversez votre cours à transcrire</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Glissez-déposez votre document ou <span className="text-indigo-400 underline font-semibold">parcourez vos fichiers</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Formats acceptés : PDF, Fiches Word/MD, Scans PNG/JPG, Documents de cours
                  </p>
                </div>
              </div>

              {/* Sample PDF Demo Trigger */}
              <button
                type="button"
                onClick={handleSamplePdfUpload}
                disabled={isExtractingFile}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Tester l'upload avec une Fiche PDF d'exemple (Révolution Française)
              </button>

              {/* Extraction Progress */}
              {isExtractingFile && (
                <div className="p-4 rounded-xl bg-indigo-950/80 border border-indigo-500/50 flex items-center gap-3 animate-pulse">
                  <Loader2 className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Lecture et Analyse OCR Gemini 3.6 Flash...</h5>
                    <p className="text-[11px] text-indigo-200">Extraction de la terminologie académiquee et structuration du cours.</p>
                  </div>
                </div>
              )}

              {/* Extraction Error */}
              {extractionError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-xs text-rose-300">
                  <strong>Erreur :</strong> {extractionError}
                </div>
              )}

              {/* Uploaded File Info Card */}
              {uploadedFileInfo && !isExtractingFile && (
                <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-bold text-white truncate">{uploadedFileInfo.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">{uploadedFileInfo.size}</span>
                  </div>

                  {keyConcepts.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Concepts extraits :</span>
                      <div className="flex flex-wrap gap-1">
                        {keyConcepts.map((concept, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Extracted Content Text Preview */}
                  {customText && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-slate-400 block">Aperçu du cours transcrit :</span>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 max-h-36 overflow-y-auto font-mono leading-relaxed whitespace-pre-wrap">
                        {customText}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Paste Custom Text */}
          {inputTab === 'text' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Titre du cours :</label>
                <input
                  type="text"
                  placeholder="Ex: Cardiologie - Insuffisance Cardiaque"
                  value={customTitle}
                  onChange={(e) => {
                    setCustomTitle(e.target.value);
                    setIsCustomMode(true);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Contenu texte du cours :</label>
                <textarea
                  rows={8}
                  placeholder="Collez ici le texte de votre cours, notes de classe, documents..."
                  value={customText}
                  onChange={(e) => {
                    setCustomText(e.target.value);
                    setIsCustomMode(true);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-indigo-500 outline-none leading-relaxed font-sans"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleGenerateVideoScript}
              disabled={isGeneratingVideo || isExtractingFile || !currentContent.trim()}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isGeneratingVideo ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Génération Animation 3D HD 9:16...
                </>
              ) : (
                <>
                  <Clapperboard className="w-4 h-4 text-emerald-200" />
                  Créer une Animation 3D HD du Cours
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleGenerateQuiz}
                disabled={isGeneratingQuiz || isExtractingFile || !currentContent.trim()}
                className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isGeneratingQuiz ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    QCM...
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-3.5 h-3.5" />
                    Générer QCM
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  handleGenerateVideoScript();
                  handleGenerateQuiz();
                }}
                disabled={isGeneratingVideo || isGeneratingQuiz || isExtractingFile || !currentContent.trim()}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 font-semibold text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Tout Générer (Animation 3D HD + QCM)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Outputs (Quiz & Video) */}
        <div className="lg:col-span-7 space-y-6">
          {/* QUIZ SECTION */}
          {quizError && (
            <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/50 text-rose-300 text-sm">
              <strong>Erreur :</strong> {quizError}
            </div>
          )}

          {quizData && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs text-indigo-400 font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> QCM Académique Automatisé
                  </div>
                  <h3 className="text-xl font-bold text-white">{quizData.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{quizData.summary}</p>
                </div>

                {showResults && (
                  <div className="bg-indigo-950 p-3 rounded-xl border border-indigo-800 text-center shrink-0">
                    <span className="text-xs text-slate-300 block">Score d'évaluation</span>
                    <span className="text-xl font-extrabold text-emerald-400">
                      {calculateScore()} / {quizData.questions.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Key Terms */}
              {quizData.keyTerms && (
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs text-slate-400 self-center mr-1">Notions clés :</span>
                  {quizData.keyTerms.map((term: string, idx: number) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700 font-mono">
                      {term}
                    </span>
                  ))}
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-6">
                {quizData.questions.map((q: any, qIdx: number) => {
                  const selectedOpt = userAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div key={q.id || qIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">
                            Q{qIdx + 1}
                          </span>
                          <span className="text-xs font-mono uppercase text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                            {q.type === 'qcm' ? 'QCM' : 'Vrai / Faux'}
                          </span>
                          <span className="text-xs text-indigo-400 font-medium">[{q.difficulty}]</span>
                        </div>

                        {showResults && isAnswered && (
                          isCorrect ? (
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-rose-400 flex items-center gap-1 bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-800">
                              <XCircle className="w-3.5 h-3.5" /> Erreur
                            </span>
                          )
                        )}
                      </div>

                      <h4 className="text-sm font-semibold text-white leading-snug">{q.question}</h4>

                      {/* Options Grid */}
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt: string, optIdx: number) => {
                          const isSelected = selectedOpt === optIdx;
                          let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                          if (showResults) {
                            if (optIdx === q.correctIndex) {
                              optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                            }
                          } else if (isSelected) {
                            optionStyle = 'bg-indigo-950 border-indigo-500 text-white font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleOptionSelect(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                            >
                              <span>{opt}</span>
                              {showResults && optIdx === q.correctIndex && (
                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Educational Explanation Rationale */}
                      {showResults && q.explanation && (
                        <div className="p-3.5 rounded-lg bg-indigo-950/40 border border-indigo-900/60 text-xs text-indigo-200 space-y-1">
                          <span className="font-bold text-indigo-300 block">Rappel académique :</span>
                          <p className="leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                {!showResults ? (
                  <button
                    onClick={() => setShowResults(true)}
                    disabled={Object.keys(userAnswers).length === 0}
                    className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    Valider mes Réponses
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setUserAnswers({});
                    }}
                    className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /> Recommencer le QCM
                  </button>
                )}
              </div>
            </div>
          )}

          {/* VIDEO SCRIPT SECTION */}
          {videoError && (
            <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/50 text-rose-300 text-sm">
              <strong>Erreur Animation 3D :</strong> {videoError}
            </div>
          )}

          {videoScriptData && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold mb-1">
                    <Video className="w-3.5 h-3.5" /> Storyboard Animation 3D HD TikTok/Reels (9:16)
                  </div>
                  <h3 className="text-xl font-bold text-white">{videoScriptData.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Durée estimée : {videoScriptData.estimatedTotalDuration}s | Ton : {videoScriptData.audioVoiceTone || 'Pédagogique'}
                  </p>
                </div>

                <button
                  onClick={() => handlePlayTTS(videoScriptData.scenes?.[0]?.narration || 'Bienvenue dans Kiju')}
                  disabled={isPlayingTTS}
                  className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isPlayingTTS ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Lecture Voix Off...
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" /> Écouter la Voix Off Gemini TTS
                    </>
                  )}
                </button>
              </div>

              {ttsError && (
                <div className="text-xs text-amber-400 bg-amber-950/40 p-2.5 rounded-lg border border-amber-900/50">
                  {ttsError}
                </div>
              )}

              {/* Vertical Mobile Phone Video Frame Preview */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Simulated Phone Frame */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="w-64 h-[440px] bg-slate-950 rounded-[36px] border-4 border-slate-800 shadow-2xl p-4 flex flex-col justify-between relative overflow-hidden ring-1 ring-slate-700">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-full z-20" />

                    <div className="mt-6 flex-1 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden border border-slate-800">
                      <div className="space-y-1">
                        <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full inline-block">
                          Scène 1
                        </span>
                        <p className="text-xs font-bold text-white leading-tight">
                          {videoScriptData.scenes?.[0]?.onScreenText}
                        </p>
                      </div>

                      {/* Visual animation placeholder */}
                      <div className="my-auto py-6 text-center space-y-2">
                        <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center animate-pulse">
                          <Clapperboard className="w-8 h-8 text-indigo-400" />
                        </div>
                        <span className="text-[10px] text-slate-400 block px-2 italic">
                          "{videoScriptData.scenes?.[0]?.visualPrompt}"
                        </span>
                      </div>

                      {/* On screen subtitles */}
                      <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 text-center">
                        <p className="text-[11px] text-indigo-200 font-medium leading-tight line-clamp-3">
                          "{videoScriptData.scenes?.[0]?.narration}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scenes Breakdown List */}
                <div className="md:col-span-7 space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Découpage par Scène ({videoScriptData.scenes?.length} scènes) :</h4>
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {videoScriptData.scenes?.map((scene: any, idx: number) => (
                      <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-indigo-400 font-semibold">
                          <span>Scène {scene.sceneNumber} ({scene.durationSeconds}s)</span>
                          <button
                            onClick={() => handlePlayTTS(scene.narration)}
                            disabled={isPlayingTTS}
                            className="text-[10px] text-indigo-300 hover:text-white flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-800"
                          >
                            <Volume2 className="w-3 h-3" /> Écouter
                          </button>
                        </div>
                        <p className="text-white font-medium">"{scene.narration}"</p>
                        <p className="text-slate-400 text-[11px]">🎨 Visuel: {scene.visualPrompt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
