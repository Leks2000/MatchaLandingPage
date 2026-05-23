import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Video, Sparkles, Volume2, ShieldCheck, Heart, Play, Pause } from "lucide-react";

interface ShowcaseDeviceProps {
  lang: "RU" | "EN";
}

export default function ShowcaseDevice({ lang }: ShowcaseDeviceProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentCaptionIdx, setCurrentCaptionIdx] = useState(0);
  const [reactions, setReactions] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // We track the scroll position of the parent container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // TRANSFORMS matching exactly the inspect screenshots:
  // Starts with rotateX(24deg) and scale(1.08) when entering, straightens up to rotateX(0deg) / transform: none on scroll as it approaches center
  const scrollRotateX = useTransform(scrollYProgress, [0.0, 0.55], [24, 0]);
  const scrollScale = useTransform(scrollYProgress, [0.0, 0.55], [1.08, 1]);
  const scrollTranslateZ = useTransform(scrollYProgress, [0.0, 0.55], [-45, 0]);

  // Use crisp yet responsive spring dynamics for fluid scroll updates
  const springRotateX = useSpring(scrollRotateX, { stiffness: 80, damping: 22 });
  const springScale = useSpring(scrollScale, { stiffness: 80, damping: 22 });
  const springTranslateZ = useSpring(scrollTranslateZ, { stiffness: 80, damping: 22 });

  const isRu = lang === "RU";

  const CAPTIONS = {
    RU: [
      "«Привет! Я Артем, пилю распределенные базы данных на Rust... 🦀»",
      "...и обожаю чай матча! Ищу сильного UX/UI дизайнера в кофаундеры 🤝",
      "«Свайпни мою голосовую волну, если готов задизайнить будущее вместе!» ✨",
      "«Запускай Matcha Bot и давай настроимся на одну частоту кода!» 💚"
    ],
    EN: [
      "\"Hey! I'm Artem, building ultra-fast distributed storage engines in Rust... 🦀\"",
      "...and absolutely addicted to Matcha! Looking for a seasoned UX/UI cofounder 🤝",
      "\"Swipe my vocal frequency if you are down to construct the future layout!\" ✨",
      "\"Launch Matcha Bot right now and let's lock onto the same coding frequency!\" 💚"
    ]
  };

  // Subtitle cycle
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentCaptionIdx((prev) => (prev + 1) % CAPTIONS[lang].length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, lang]);

  // Particle feedback bursts
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const symbols = ["🍵", "🔥", "🤝", "💻", "🚀", "💚"];
      const s = symbols[Math.floor(Math.random() * symbols.length)];
      setReactions((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          emoji: s,
          x: Math.random() * 60 + 20,
          y: Math.random() * 30 + 40
        }
      ]);
      setTimeout(() => {
        setReactions((prev) => prev.slice(1));
      }, 2500);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto py-10 px-4 md:px-8 flex flex-col items-center justify-center select-none"
    >
      {/* Background soft ambient glow behind the mockup */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#22C55E]/10 to-[#DCFCE7]/30 blur-[130px] opacity-70 pointer-events-none rounded-full" />

      {/* PERSPECTIVE PARENT: exactly matching "style='perspective: 1000px;'" as examined in inspect screenshot */}
      <div 
        className="w-full relative py-6 flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        
        {/* INNER 3D CONTAINER: exactly modeled after the inspect parameters with premium soft shadow cascade */}
        <motion.div
          style={{
            rotateX: springRotateX,
            scale: springScale,
            translateZ: springTranslateZ,
            transformStyle: "preserve-3d",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px, rgba(0, 0, 0, 0.14) 0px 9px 20px, rgba(0, 0, 0, 0.12) 0px 37px 37px, rgba(0, 0, 0, 0.08) 0px 84px 50px, rgba(0, 0, 0, 0.02) 0px 149px 60px, rgba(0, 0, 0, 0.01) 0px 233px 65px"
          }}
          className="w-full max-w-5xl border-4 border-[#DCFCE7] bg-[#FFFFFF] rounded-[30px] p-2.5 md:p-5.5 transition-all relative overflow-hidden"
        >
          {/* Top subtle screen bar */}
          <div className="flex items-center justify-between pb-3 px-3 border-b border-[#E2E8F0] mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[9px] font-mono font-bold text-[#16A34A] tracking-wider uppercase">
                {isRu ? "Голосовой Питч Активен" : "Voice Pitch Connection Live"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#DCFCE7]">
              <Volume2 className="w-3.5 h-3.5 text-[#22C55E] animate-bounce" />
              <span className="text-[8px] font-mono font-bold text-[#14532D]">MATCH_FREQ_MODE</span>
            </div>
          </div>

          {/* Vibe Video Mockup Screen Canvas */}
          <div className="relative aspect-[16/9.5] w-full bg-gradient-to-b from-[#FAFDFB] to-[#F3FBF6] rounded-2xl overflow-hidden border border-[#DCFCE7]/60 flex flex-col justify-between">
            
            {/* Ambient grid inside the video player */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="p-4 flex items-center justify-between z-10">
              <span className="bg-[#FFFFFF]/95 backdrop-blur-sm border border-[#DCFCE7] text-[10px] font-mono font-semibold text-[#14532D] px-3.5 py-1.5 rounded-xl shadow-xs">
                🎥 {isRu ? "Интерактивная Визитка" : "Interactive Audio Pitch"}
              </span>

              {/* Matching score badge */}
              <div className="flex items-center gap-1.5 bg-white border border-[#22C55E] px-3 py-1 rounded-xl shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
                <span className="font-display font-black text-xs text-[#0F172A]">98%</span>
                <span className="text-[8px] font-mono text-[#16A34A]">{isRu ? "ВАЙБ" : "VIBE"}</span>
              </div>
            </div>

            {/* Simulated interactive waves & user avatar */}
            <div className="relative flex-1 flex flex-col items-center justify-center -mt-4">
              
              {/* Voice waves expansion rings */}
              <div className="absolute w-44 h-44 rounded-full border border-[#22C55E]/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
              <div className="absolute w-32 h-32 rounded-full border border-[#22C55E]/30 animate-pulse pointer-events-none" />

              <div className="relative w-28 h-28 rounded-full border-[3px] border-[#22C55E] p-1 bg-white shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#F0FDF4]">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=350&auto=format&fit=crop" 
                    alt="Active Creator User" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Rising and falling audio visualizer bars */}
              <div className="flex items-center gap-1 mt-4.5 h-6">
                {[0.4, 0.9, 0.5, 0.8, 0.3, 0.7, 0.95, 0.5, 0.85, 0.4, 0.75, 0.35, 0.6].map((ratio, idx) => (
                  <motion.div
                    key={idx}
                    className="w-1 rounded-full bg-[#22C55E]"
                    animate={{ height: isPlaying ? [10, ratio * 28, 10] : 10 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + (idx % 3) * 0.15,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Animated feedback reactions bursting up */}
              <AnimatePresence>
                {reactions.map((r) => (
                  <motion.span
                    key={r.id}
                    initial={{ opacity: 0, scale: 0.5, y: 15 }}
                    animate={{ opacity: 1, scale: 1.3, y: -70 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                    style={{ left: `${r.x}%`, top: `${r.y}%` }}
                    className="absolute text-xl z-20 pointer-events-none select-none filter drop-shadow-xs"
                  >
                    {r.emoji}
                  </motion.span>
                ))}
              </AnimatePresence>

            </div>

            {/* Captions & Playback tracking bar */}
            <div className="bg-white/95 border-t border-[#DCFCE7]/60 p-4.5 backdrop-blur-xs flex flex-col gap-3 relative z-10">
              
              {/* Dynamic Subtitle */}
              <div className="min-h-[44px] flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={currentCaptionIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#0F172A] text-xs sm:text-sm font-display font-black tracking-tight"
                  >
                    {CAPTIONS[lang][currentCaptionIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress and control row */}
              <div className="flex items-center justify-between gap-4 font-mono text-[10px] text-[#14532D] font-bold">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-4 py-2 bg-[#16A34A] text-white hover:bg-[#15803D] rounded-xl flex items-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer font-bold"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? (isRu ? "ПАУЗА" : "PAUSE") : (isRu ? "ЗАПУСТИТЬ" : "PLAY")}</span>
                </button>

                {/* Progress bar line */}
                <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden relative">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#22C55E] to-[#16A34A]"
                    animate={{ width: isPlaying ? ["0%", "100%"] : "50%" }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <span>0:08 / 0:15</span>
              </div>

            </div>

          </div>
        </motion.div>

      </div>

      {/* THREE EXPLANATION CARD TRUST MODULES BELOW VIDEO (Mint Light Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12 bg-white border border-[#DCFCE7] p-6 rounded-2xl text-left shadow-xs">
        
        <div className="space-y-1.5 md:border-r border-[#E2E8F0] last:border-0 md:pr-4">
          <div className="flex items-center gap-1.5 text-[#16A34A] font-mono text-[10px] uppercase font-bold tracking-widest">
            <Volume2 className="w-4 h-4 text-[#22C55E]" /> VOICE ALIGNMENT
          </div>
          <p className="text-[#0F172A] text-sm font-bold leading-tight font-display">
            {isRu ? "Свайпайте аудио-питчи" : "Swipe Audio Pitches"}
          </p>
          <p className="text-[#64748B] text-xs leading-relaxed font-semibold">
            {isRu ? "Голос передает энергетику и характер лучше любого текстового резюме." : "Voice signatures tell more about technical vibe than static words."}
          </p>
        </div>

        <div className="space-y-1.5 md:border-r border-[#E2E8F0] last:border-0 md:px-4">
          <div className="flex items-center gap-1.5 text-[#16A34A] font-mono text-[10px] uppercase font-bold tracking-widest">
            <Sparkles className="w-4 h-4 text-[#22C55E]" /> AI FREQUENCY MATRIX
          </div>
          <p className="text-[#0F172A] text-sm font-bold leading-tight font-display">
            {isRu ? "Мэтчинг по интересам" : "Interests Matching Index"}
          </p>
          <p className="text-[#64748B] text-xs leading-relaxed font-semibold">
            {isRu ? "Модели Gemini вычисляют общие теги настроения, стек и IT-роли в реальном времени." : "Gemini parses tech tags, product roles, and interests instantly."}
          </p>
        </div>

        <div className="space-y-1.5 last:border-0 md:pl-4">
          <div className="flex items-center gap-1.5 text-[#16A34A] font-mono text-[10px] uppercase font-bold tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" /> TG PRIVATE CLOUD
          </div>
          <p className="text-[#0F172A] text-sm font-bold leading-tight font-display">
            {isRu ? "Полная анонимность" : "Encrypted Privacy"}
          </p>
          <p className="text-[#64748B] text-xs leading-relaxed font-semibold">
            {isRu ? "Ваш голос шифруется и никогда не выйдет за защищенные рамки Telegram." : "Complete user control: audio traces live natively inside safe structures."}
          </p>
        </div>
        
      </div>

    </div>
  );
}
