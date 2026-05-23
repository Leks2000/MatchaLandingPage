import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Video, Mic, RefreshCw, Sparkles, AlertCircle, Play, Square, Check } from "lucide-react";

export default function VibePitchWidget() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<"idle" | "requesting" | "ready" | "recording" | "analyzing" | "done" | "denied">("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [waveformBars, setWaveformBars] = useState<number[]>([]);
  const [extractedFacts, setExtractedFacts] = useState<string[]>([]);
  
  // Custom pre-set pitch examples for fallback
  const PRESET_PITCHES = [
    {
      name: "Юля, 23 (Product Manager)",
      vibe: "Creative Chaos Finder",
      quote: "Я собираю безумные пет-проекты на ноукоде и заставляю команду плакать от восторга от моих роадмапов. Ищу сооснователя-разработчика, который соберет MVP за коробку пиццы и бесконечное уважение.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      facts: [
        "coordinates meetings directly from the skatepark",
        "creates custom database diagrams on coffee napkins",
        "convinced that sleep is just a low-priority backlog item"
      ]
    },
    {
      name: "Влад, 24 (Tech Lead)",
      vibe: "Async Overthinker",
      quote: "Пишу бэкенд на Rust, презираю синхронные звонки и собираю виниловые проигрыватели. Хочу запилить мобилку, которая убьет все календари. Нужен дизайнер, который сделает мне стильно.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
      facts: [
        "refuses to code in languages without strong algebraic types",
        "has a 300-day GitHub streak consisting of minor config edits",
        "can detect an unoptimized express router with 99.8% precision"
      ]
    }
  ];

  const [activePresetIdx, setActivePresetIdx] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const countdownIntervalRef = useRef<any>(null);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Generate responsive random moving waveform wave visualizers
  useEffect(() => {
    let animId: any;
    const updateWaveform = () => {
      const barsCount = 28;
      const newBars = Array.from({ length: barsCount }, () => {
        if (cameraState === "recording") {
          return Math.floor(Math.random() * 55) + 12; // High active amplitude
        } else if (cameraState === "ready") {
          return Math.floor(Math.random() * 18) + 6; // Low ambient amplitude
        }
        return 4; // Flat base
      });
      setWaveformBars(newBars);
      animId = setTimeout(updateWaveform, 120);
    };
    updateWaveform();
    return () => clearTimeout(animId);
  }, [cameraState]);

  // Handle requesting webcam
  const requestCamera = async () => {
    setCameraState("requesting");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 480, height: 480, facingMode: "user" },
        audio: true
      });
      setStream(mediaStream);
      setCameraState("ready");
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(e => console.log("Play failed: ", e));
      }
    } catch (e) {
      console.warn("Camera permission denied or unsupported device:", e);
      setCameraState("denied");
    }
  };

  // Start 5 second dynamic recording simulation
  const startRecording = () => {
    setCameraState("recording");
    setCountdown(5);
    
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          stopAndAnalyze();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopAndAnalyze = () => {
    setCameraState("analyzing");
    
    // Simulate smart analysis of video and sound timbre
    const factsList = [
      "has a highly structured developer pitch energy",
      "voice pitch indicates 92% compatibility with matcha developers",
      "body language suggests high obsession with typography and visual rhythms"
    ];

    setTimeout(() => {
      setExtractedFacts(factsList);
      setCameraState("done");
    }, 2800);
  };

  const resetCamera = () => {
    setCameraState("ready");
    setExtractedFacts([]);
    setCountdown(5);
  };

  return (
    <div id="vibe-pitch-visual-card" className="bg-brand-white border border-brand-border rounded-3xl p-5 md:p-6 shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
      
      {/* Absolute badge label header */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-brand-primary text-brand-white px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest select-none shadow">
        <Video className="w-3.5 h-3.5 text-brand-green" /> LIVE MATCH STUDIO
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-4">
        
        {/* Visualizer Feed Frame Area */}
        <div className="relative w-full aspect-square max-w-[340px] mx-auto rounded-2xl bg-slate-950 overflow-hidden border-2 border-slate-200 shadow-inner flex items-center justify-center">
          
          {/* Grid lines styling overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,23,42,0.4)_100%)] z-10 pointer-events-none"></div>
          
          {cameraState === "idle" && (
            <div className="text-center p-6 space-y-3 z-10">
              <div className="w-14 h-14 bg-brand-green/10 border border-brand-green rounded-full flex items-center justify-center mx-auto text-brand-green animate-pulse">
                <Camera className="w-7 h-7" />
              </div>
              <p className="text-xs font-bold text-slate-300">ПРОТЕСТИРУЙТЕ ГОЛОСОВУЮ И ВИДЕО ВИЗИТКУ</p>
              <p className="text-[10px] text-slate-400 max-w-[220px] mx-auto">
                Запишите секундный питч через вебкамеру и посмотрите, как ИИ выделит ваши сильнейшие вайбы.
              </p>
              <button
                onClick={requestCamera}
                className="bg-brand-green text-brand-deep-green font-extrabold text-xs px-5 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-transform"
              >
                Разрешить камеру 🍵
              </button>
            </div>
          )}

          {cameraState === "requesting" && (
            <div className="text-center p-4 z-10 space-y-2">
              <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-mono text-slate-300 font-bold">ПОДКЛЮЧЕНИЕ КАМЕРЫ...</p>
            </div>
          )}

          {(cameraState === "ready" || cameraState === "recording") && (
            <>
              <video 
                ref={videoRef} 
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" 
                playsInline 
                muted 
              />
              
              {/* Timing Countdown Overlay */}
              {cameraState === "recording" && (
                <div className="absolute top-4 right-4 bg-red-500 text-white font-mono font-bold text-xs px-3 py-1 rounded-full z-20 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  0:0{countdown}
                </div>
              )}

              {/* Bottom recorder actions inside card */}
              <div className="absolute bottom-4 inset-x-4 z-20 flex flex-col space-y-2 text-center pointer-events-auto">
                <div className="flex items-center justify-center gap-1.5 h-6">
                  {waveformBars.map((barHeight, idx) => (
                    <span 
                      key={idx} 
                      style={{ height: `${barHeight}px` }} 
                      className={`w-[3px] rounded-full transition-all duration-100 ${
                        cameraState === "recording" ? "bg-red-400" : "bg-brand-green"
                      }`}
                    ></span>
                  ))}
                </div>

                {cameraState === "ready" ? (
                  <button 
                    onClick={startRecording}
                    className="bg-brand-green text-brand-deep-green font-extrabold text-xs py-2 px-6 rounded-xl mx-auto shadow-md hover:scale-105 active:scale-95 transition-all outline-none border border-brand-dark-green"
                  >
                    НАЧАТЬ 5с ЗАПИСЬ 🎙
                  </button>
                ) : (
                  <button 
                    onClick={stopAndAnalyze}
                    className="bg-red-500 text-white font-extrabold text-xs py-2 px-6 rounded-xl mx-auto shadow-md active:scale-95 transition-all flex items-center gap-1"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" /> ОСТАНОВИТЬ
                  </button>
                )}
              </div>
            </>
          )}

          {cameraState === "analyzing" && (
            <div className="text-center z-10 space-y-3 p-5 bg-slate-950/80 absolute inset-0 flex flex-col justify-center items-center">
              <div className="relative">
                <span className="absolute animate-ping inline-flex h-8 w-8 rounded-full bg-brand-green opacity-40"></span>
                <Sparkles className="w-10 h-10 text-brand-green animate-spin" />
              </div>
              <div className="space-y-1 font-mono text-left max-w-[200px]">
                <span className="text-[9px] text-brand-green block tracking-wider">➔ EXTRACTING PITCH TIMBRE...</span>
                <span className="text-[9px] text-brand-green block tracking-wider">➔ EXTRAPOLATING MATCH VALUE...</span>
                <span className="text-[9px] text-brand-green block tracking-wider animate-pulse">➔ RUNNING GEMINI PARSER...</span>
              </div>
            </div>
          )}

          {cameraState === "done" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-brand-mint-light p-4 flex flex-col justify-between text-left z-20"
            >
              <div className="space-y-2">
                <h4 className="text-xs font-bold font-mono text-brand-dark-green tracking-wide">// ВАШИ ИИ ВАЙБОВЫЕ ХАРАКТЕРИСТИКИ:</h4>
                <div className="space-y-2 font-mono bg-white border border-brand-border p-3.5 rounded-xl">
                  {extractedFacts.map((fact, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-[10px] leading-snug">
                      <span className="text-brand-green font-bold">✓</span>
                      <span className="text-slate-700 italic">"{fact}"</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={resetCamera}
                className="w-full bg-brand-green text-brand-deep-green font-extrabold text-xs py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" /> Перезаписать питч
              </button>
            </motion.div>
          )}

          {cameraState === "denied" && (
            <div className="text-center p-5 z-10 space-y-4">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500 border border-amber-200">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-300 uppercase">ИСПОЛЬЗУЕМ КРЕАТИВНЫХ БУСТЕРОВ</p>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[240px] mx-auto leading-normal">
                  Камера занята или не поддерживается. Ничего страшного, бро! Смотри, как питчи других ребят выглядят внутри:
                </p>
              </div>

              {/* Slider for preset pitches */}
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-left flex gap-3 relative overflow-hidden items-center select-none">
                <img 
                  src={PRESET_PITCHES[activePresetIdx].avatar} 
                  alt="Preset avatar" 
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full border border-brand-green/30 object-cover shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-white block truncate leading-none">{PRESET_PITCHES[activePresetIdx].name}</span>
                  <span className="text-[8px] bg-brand-green/20 text-brand-green font-mono px-1 py-0.5 rounded uppercase mt-1 inline-block">{PRESET_PITCHES[activePresetIdx].vibe}</span>
                </div>
                <button 
                  onClick={() => setActivePresetIdx((prev) => (prev === 0 ? 1 : 0))}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-[8px] px-2 py-1.5 rounded"
                >
                  СЛЕДУЮЩИЙ
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Display details of preset pitches if camera is denied or idle */}
        {(cameraState === "denied" || cameraState === "idle") && (
          <div className="border border-brand-mint-card bg-[#F4FDF7] p-3 rounded-2xl text-left border-dashed">
            <span className="text-[9px] font-extrabold text-brand-dark-green uppercase tracking-wide font-mono block mb-1">Цитата активного питча:</span>
            <p className="text-[10px] text-slate-600 italic leading-snug font-medium">
              "{PRESET_PITCHES[activePresetIdx].quote}"
            </p>
            <div className="flex gap-1.5 mt-2 overflow-x-auto pb-0.5">
              {PRESET_PITCHES[activePresetIdx].facts.map((fac, i) => (
                <span key={i} className="text-[8px] font-mono leading-none bg-white border border-slate-200 rounded px-1.5 py-1 shrink-0 text-slate-500">
                  {fac}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Informative advice */}
        <div className="text-center">
          <p className="text-[9px] text-brand-muted font-mono">
            * ИИ определяет твой тембр, скорость речи и энергетику, сопоставляя с базой единомышленников
          </p>
        </div>

      </div>

    </div>
  );
}
