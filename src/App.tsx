import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Heart, Send, Globe, Layout, Smartphone, Github, CheckCircle2,
  Bookmark, GitCommit, Link
} from "lucide-react";
import TMAEmulator from "./components/TMAEmulator";
import StrategyHub from "./components/StrategyHub";
import ShowcaseDevice from "./components/ShowcaseDevice";
import OnboardingModal from "./components/OnboardingModal";
import { LOCALES } from "./locales";

export default function App() {
  const [lang, setLang] = useState<"RU" | "EN">("RU");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const t = LOCALES[lang];

  const FAQ_TRANSLATIONS = {
    RU: [
      {
        q: "Как работает считывание «вайба» в Matcha Bot?",
        a: "ИИ анализирует выбранные при регистрации роли и теги настроения, а также считывает тембр и паттерны вашей 5-секундной аудиовизитки. После этого Gemini генерирует три персонализированных цепляющих факта для вашего профиля, заметных при свайпе."
      },
      {
        q: "В чем преимущество реферального буста?",
        a: "Пользователи делятся реферальной ссылкой напрямую в Telegram, получая дополнительные приоритетные свайпы в Wave Deck. Это создает естественный виральный цикл без затрат на рекламу."
      },
      {
        q: "Насколько безопасно записывать туда свой голос?",
        a: "Все данные голосовых визиток шифруются и хранятся исключительно внутри защищенной облачной инфраструктуры Telegram, сопоставляясь только с алгоритмами подбора вашей волны."
      }
    ],
    EN: [
      {
        q: "How does the sound vibe mapping analyze users inside Matcha Bot?",
        a: "The integrated Gemini parsed intelligence maps matching scores on selected mood tags, and sonic textures processed from your 5-second voice signature. It translates frequency parameters directly into three distinct profile traits."
      },
      {
        q: "What is the primary benefit of the Referral Boost?",
        a: "Users distribute localized referral structures directly into Telegram. Scoring +5 priority wave deck boosts without secondary ads or marketing spend."
      },
      {
        q: "How secure is the voice note verification?",
        a: "All personal waveforms are encrypted natively within standard Telegram private cloud infrastructures, referencing only algebraic compatibility matrix patterns."
      }
    ]
  };

  const activeFaqList = FAQ_TRANSLATIONS[lang];

  return (
    <div id="landing-root-container" className="min-h-screen bg-[#F0FAF4] text-brand-primary font-sans relative overflow-hidden pb-20 selection:bg-brand-green selection:text-brand-deep-green">
      
      {/* Background Animated Subtle Blob Orbs for Visual Rhythm */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          x: [0, 40, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-brand-green/15 blur-[120px] pointer-events-none"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, -50, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-brand-dark-green/10 blur-[130px] pointer-events-none"
      />

      {/* Elegant grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* Header element */}
      <header className="sticky top-0 z-40 bg-[#F0FAF4]/85 backdrop-blur-md border-b border-brand-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3.5 group select-none cursor-pointer">
            {/* Custom high-fidelity glowing multilayer organic Matcha logo vector */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#22C55E]/25 blur-lg rounded-full group-hover:scale-135 transition-transform duration-500" />
              <svg className="w-11 h-11 relative z-10 transition-transform duration-500 group-hover:rotate-[12deg]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Central organic glowing backdrop */}
                <circle cx="20" cy="20" r="16" fill="url(#leaf-bg)" opacity="0.15" />
                
                {/* Overlaying curved tea leaf ripples resembling image inspirations */}
                <path d="M20 33C11 25.5 10.5 15.5 20 7C29.5 15.5 29 25.5 20 33Z" fill="url(#leaf-grad-main)" />
                <path d="M20 33C14.5 27 14 19 20 12C26 19 25.5 27 20 33Z" fill="url(#leaf-grad-[inner])" opacity="0.85" />
                
                {/* Swirling highlights representing liquid flow */}
                <path d="M12 22C14.5 28 20 29.5 24 27.5" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                <path d="M16 11C19.5 10.5 24.5 13 26 17" stroke="#86EFAC" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                
                {/* Central glowing energy spark element */}
                <circle cx="20" cy="19" r="2.5" fill="#FDF089" className="animate-pulse" />
                <path d="M20 13V25M14 19H26" stroke="#FEF08A" strokeWidth="0.75" strokeLinecap="round" opacity="0.8" />
                
                <defs>
                  <linearGradient id="leaf-bg" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4ADE80" />
                    <stop offset="1" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="leaf-grad-main" x1="12" y1="7" x2="28" y2="33" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4ADE80" />
                    <stop offset="0.5" stopColor="#22C55E" />
                    <stop offset="1" stopColor="#15803D" />
                  </linearGradient>
                  <linearGradient id="leaf-grad-[inner]" x1="14" y1="12" x2="26" y2="33" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#86EFAC" />
                    <stop offset="0.6" stopColor="#15803D" />
                    <stop offset="1" stopColor="#14532D" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div className="text-left leading-none">
              <span className="font-display font-black text-2xl tracking-tighter text-[#0F172A] flex items-center gap-0.5">
                M<span className="text-[#22C55E]">a</span>tch<span className="text-[#16A34A] rotate-6 text-xl">a</span>
                <span className="text-[9px] font-mono text-[#10B981] bg-[#ECFDF5] border border-[#A7F3D0] px-1.5 py-0.5 rounded ml-1 font-bold">TM</span>
              </span>
              <span className="text-[8px] font-mono font-bold text-[#14532D] uppercase tracking-widest block mt-1.5">
                {lang === "RU" ? "ВАЙБ-НЕТВОРКИНГ ДЛЯ IT" : "NEXT-GEN VIBE NETWORK"}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
            <a href="#showcase-section" className="hover:text-[#16A34A] transition-colors">{lang === "RU" ? "Презентация" : "Showcase"}</a>
            <a href="#tma-simulator-section" className="hover:text-[#16A34A] transition-colors">{lang === "RU" ? "Симулятор" : "Simulator"}</a>
            <a href="#faq-section" className="hover:text-[#16A34A] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Lang Swappable Switch Toggle */}
            <button 
              onClick={() => setLang(lang === "RU" ? "EN" : "RU")}
              className="px-3 py-1.5 bg-brand-white border border-brand-green/20 hover:border-brand-green/45 rounded-xl text-xs font-mono font-bold text-brand-deep-green flex items-center gap-1.5 shadow-sm hover:shadow active:scale-95 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-brand-green" />
              <span>{lang}</span>
            </button>

            <button 
              onClick={() => setIsOnboardingOpen(true)}
              className="bg-brand-green hover:bg-[#16A34A] text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              {t.btnLaunch} <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 space-y-20 relative z-10 text-center">
        
        {/* HERO TITLE BLOCK */}
        <section className="max-w-4xl mx-auto space-y-6 pt-6">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tight leading-[1.05] text-slate-900"
          >
            {t.heroTitle} <span className="text-brand-dark-green relative inline-block underline decoration-brand-green decoration-wavy underline-offset-8 decoration-2">{t.heroTitleAccent}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-semibold pt-2"
          >
            {t.heroSub}
          </motion.p>
        </section>

        {/* HIGH-QUALITY MARQUEE RUNNING STRING (Slim Dense/Tight Padding, Giant High-Contrast Professional Logo Graphics) */}
        <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-2 sm:py-3.5 bg-white border-y border-[#DCFCE7] shadow-[inset_0_1px_4px_rgba(22,163,74,0.015)] select-none">
          {/* Mask left and right fade bounds for elite professional look */}
          <div className="absolute top-0 bottom-0 left-0 w-32 sm:w-64 bg-gradient-to-r from-white via-white/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 sm:w-64 bg-gradient-to-l from-white via-white/40 to-transparent z-10 pointer-events-none" />
          
          <div className="text-[10px] sm:text-xs font-display uppercase tracking-[0.25em] text-[#15803D] block pb-2 font-black text-center">
            ✦ TRUSTED BY BIG INDUSTRIES ✦
          </div>

          <div className="relative w-full overflow-hidden flex items-center justify-center">
            {/* Running continuous marquee row with calibrated original sized images */}
            <div className="animate-marquee flex gap-10 sm:gap-14 items-center">
              {[
                { name: "Microsoft", url: "https://skill-connect-job-board.vercel.app/microsoft.svg" },
                { name: "Amazon", url: "https://skill-connect-job-board.vercel.app/amazon.svg" },
                { name: "Accenture", url: "https://skill-connect-job-board.vercel.app/accenture.svg" },
                { name: "Airbus", url: "https://skill-connect-job-board.vercel.app/airbus.svg" },
                { name: "Cisco", url: "https://skill-connect-job-board.vercel.app/cisco.svg" },
                { name: "Disney", url: "https://skill-connect-job-board.vercel.app/deisney.svg" },
                { name: "Deloitte", url: "https://skill-connect-job-board.vercel.app/delloite.svg" },
                // Duplicate for infinite scroll loop
                { name: "Microsoft", url: "https://skill-connect-job-board.vercel.app/microsoft.svg" },
                { name: "Amazon", url: "https://skill-connect-job-board.vercel.app/amazon.svg" },
                { name: "Accenture", url: "https://skill-connect-job-board.vercel.app/accenture.svg" },
                { name: "Airbus", url: "https://skill-connect-job-board.vercel.app/airbus.svg" },
                { name: "Cisco", url: "https://skill-connect-job-board.vercel.app/cisco.svg" },
                { name: "Disney", url: "https://skill-connect-job-board.vercel.app/deisney.svg" },
                { name: "Deloitte", url: "https://skill-connect-job-board.vercel.app/delloite.svg" }
              ].map((comp, idx) => (
                <div key={idx} className="flex items-center shrink-0 group hover:scale-[1.03] transition-transform duration-300 px-4 sm:px-6">
                  <img 
                    src={comp.url} 
                    alt={`${comp.name} logo`} 
                    referrerPolicy="no-referrer"
                    className="h-24 sm:h-30 md:h-36 object-contain opacity-85 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 1: 3D UNRAVEL LAPTOP DEVICE SHOWCASE */}
        <section id="showcase-section" className="pt-8 scroll-mt-24">
          <div className="max-w-3xl mx-auto space-y-3 mb-8">
            <span className="text-[10px] font-mono font-bold text-brand-dark-green bg-brand-mint-light border border-brand-green/35 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
              {t.vibePitchTag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
              {t.vibePitchTitle}
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto font-medium">
              {t.vibePitchSub}
            </p>
          </div>

          <ShowcaseDevice lang={lang} />
        </section>

        {/* SECTION 2: INTERACTIVE BOT DISCOVERY EMULATOR */}
        <section id="tma-simulator-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 scroll-mt-24 text-left">
          
          <div className="lg:col-span-5 space-y-6 max-w-md mx-auto">
            <span className="text-[10px] font-bold font-mono text-brand-dark-green tracking-widest uppercase block bg-brand-mint-card border border-brand-green/35 px-3.5 py-1.5 rounded-full w-fit">
              {t.simTag}
            </span>
            <h3 className="text-3xl font-display font-black text-slate-900 leading-tight">
              {t.simTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-normal font-medium">
              {t.simSub}
            </p>

            <ul className="space-y-3 font-mono text-xs">
              <li className="flex items-start gap-2 text-slate-700">
                <span className="text-brand-green text-sm">✓</span>
                <span>{lang === "RU" ? "Пройдите моментальный ИИ-онбординг с ИИ" : "Complete friction-free instant AI onboarding"}</span>
              </li>
              <li className="flex items-start gap-2 text-slate-700">
                <span className="text-brand-green text-sm">✓</span>
                <span>{lang === "RU" ? "Калибровка по любимым тегам (кодинг, матча, крипта)" : "Calibrate on loved tech tags (rust, matcha, crypto)"}</span>
              </li>
              <li className="flex items-start gap-2 text-slate-700">
                <span className="text-brand-green text-sm">✓</span>
                <span>{lang === "RU" ? "Симулируйте реальный свайп и пишите мэтчам в 1 клик!" : "Simulate live swipe gestures and connect instantly"}</span>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 block pb-1">// PLATFORM MATRIX ENGAGEMENT</span>
              <div className="flex gap-2">
                <div className="bg-white border border-brand-green/15 p-3 rounded-xl flex-1 text-center">
                  <span className="text-lg font-black block text-slate-900">4.9 ★</span>
                  <span className="text-[9px] text-slate-500 uppercase font-mono mt-0.5 block">APP RATING</span>
                </div>
                <div className="bg-white border border-brand-green/15 p-3 rounded-xl flex-1 text-center">
                  <span className="text-lg font-black block text-slate-900">12K+</span>
                  <span className="text-[9px] text-slate-500 uppercase font-mono mt-0.5 block">MATCHES DONE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            <TMAEmulator />
          </div>
        </section>

        {/* SECTION 3: STRATEGIC INSIGHT ROADMAP */}
        <section id="strategy-section" className="pt-10 scroll-mt-24">
          <div className="max-w-4xl mx-auto">
            <StrategyHub lang={lang} />
          </div>
        </section>

        {/* SECTION 4: TRANSLATED FAQ SECTION */}
        <section id="faq-section" className="max-w-4xl mx-auto space-y-6 pt-6 text-left scroll-mt-24">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-display font-black text-slate-900">{t.faqTitle}</h3>
            <p className="text-xs text-slate-500 font-medium">{t.faqSub}</p>
          </div>

          <div className="space-y-3 bg-brand-white border border-brand-green/10 p-6 rounded-3xl shadow-md">
            {activeFaqList.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border-b border-slate-100 last:border-b-0 pb-3 last:pb-0 pt-3 first:pt-0">
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center text-left text-xs font-mono font-bold text-slate-800 py-1 hover:text-brand-dark-green transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <span className="text-brand-green font-bold text-sm">{isOpen ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-slate-500 leading-relaxed pt-2.5 pl-1 select-text font-medium"
                      >
                        {item.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dynamic Trust metrics badge line */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono font-bold text-slate-500 uppercase">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-green" /> 100% GDPR Compliant</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-green" /> End-to-End Encryption</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-green" /> Powered by Gemini API</span>
        </div>

        {/* Clean footer */}
        <footer className="pt-12 border-t border-brand-green/10 text-center font-mono text-[10px] text-slate-400 space-y-2">
          <div className="flex items-center justify-center gap-1">
            <span>Made for Matcha Bot creators</span>
            <Heart className="w-3.5 h-3.5 text-brand-green fill-current animate-pulse" />
            <span>in 2026</span>
          </div>
          <p className="text-[9px]">All visual states, palettes, and animations simulated at production-ready specs.</p>
        </footer>

      </main>

      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} lang={lang} />
    </div>
  );
}
