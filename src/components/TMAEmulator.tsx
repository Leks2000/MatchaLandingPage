import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, User, Settings, Zap, Copy, Check, Lock, Bell, Globe, 
  RotateCcw, ArrowRight, Play, Square, Heart, X, CheckSquare, Trash2, Mic
} from "lucide-react";
import { Screen, UserProfile } from "../types";
import { MOCK_CANDIDATES } from "../data";

export default function TMAEmulator() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.PROFILE_SETUP);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Александр",
    age: 22,
    role: "Студент",
    tags: ["ИИ и Автоматизация", "Фриланс / Инди", "Матча / Кофе"],
    vibeFacts: [
      "always ready for spontaneous matchas in local hubs",
      "regularly stays up until 3AM exploring things",
      "never replies to texts in under 12 hours unless vital"
    ],
    voiceNotesCount: 0,
    referralsCount: 2,
    swipeCountToday: 8,
    activeDays: 14,
    boostPoints: 15,
    refLink: "t.me/matchabot?start=REF_xedanler",
    ghostMode: false,
    notifications: true,
    language: "RU",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
  });

  const [customTagInput, setCustomTagInput] = useState("");
  const [isGeneratingFacts, setIsGeneratingFacts] = useState(false);
  const [deck, setDeck] = useState(MOCK_CANDIDATES);
  const [matchedCandidate, setMatchedCandidate] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<"swipe" | "profile">("swipe");
  const [isCopied, setIsCopied] = useState(false);
  
  // Voice recording state in emulator
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [hasVoiceVibe, setHasVoiceVibe] = useState(false);

  // Available roles for Screen 1
  const ROLES = [
    "Студент",
    "Специалист в компании",
    "Инди-разработчик / Фрилансер",
    "Креатор / Дизайнер",
    "Сооснователь / Создатель",
    "В поиске себя"
  ];

  // Available tags for Screen 2
  const SUGGESTED_TAGS = [
    "ИИ и Автоматизация",
    "Фриланс / Инди",
    "Дизайн / Арт",
    "Создание контента",
    "Стартапы",
    "Гейминг",
    "Крипта",
    "Музыка",
    "Мемы / Юмор",
    "Код по ночам",
    "Матча / Кофе",
    "Разговоры по душам"
  ];

  // Referral list
  const REFERRALS = [
    { name: "Kirill", role: "Meme Curator", status: "АКТИВЕН +5" },
    { name: "Sofia", role: "Digital Nomad", status: "АКТИВЕН +5" }
  ];

  // Voice recording interval
  useEffect(() => {
    let interval: any = null;
    if (isRecordingVoice) {
      interval = setInterval(() => {
        setVoiceSeconds((prev) => {
          if (prev >= 5) {
            setIsRecordingVoice(false);
            setHasVoiceVibe(true);
            setProfile(p => ({ ...p, voiceNotesCount: 1 }));
            return 5;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setVoiceSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingVoice]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profile.refLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleTag = (tag: string) => {
    if (profile.tags.includes(tag)) {
      setProfile({
        ...profile,
        tags: profile.tags.filter((t) => t !== tag)
      });
    } else {
      if (profile.tags.length < 6) {
        setProfile({
          ...profile,
          tags: [...profile.tags, tag]
        });
      }
    }
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = customTagInput.trim();
    if (tag && !profile.tags.includes(tag) && profile.tags.length < 6) {
      setProfile({
        ...profile,
        tags: [...profile.tags, tag]
      });
      setCustomTagInput("");
    }
  };

  // Real backend call to Gemini to generate the 3 vibe facts
  const triggerAIProfileGeneration = async () => {
    setIsGeneratingFacts(true);
    setCurrentScreen(Screen.AI_PROFILE_GENERATED);
    
    try {
      const response = await fetch("/api/profile-vibe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          age: profile.age,
          role: profile.role,
          tags: profile.tags
        })
      });

      const data = await response.json();
      if (data.vibeFacts && data.vibeFacts.length >= 3) {
        setProfile(p => ({
          ...p,
          vibeFacts: data.vibeFacts
        }));
      }
    } catch (e) {
      console.warn("Error calling Gemini endpoint, using client simulated template fallback:", e);
    } finally {
      setIsGeneratingFacts(false);
    }
  };

  const handleSwipe = (direction: "left" | "right", candidate: any) => {
    if (direction === "right") {
      // Create a gorgeous Matcha match event
      setMatchedCandidate(candidate);
    }
    setDeck(prev => prev.filter(c => c.id !== candidate.id));
    setProfile(p => ({ ...p, swipeCountToday: p.swipeCountToday + 1 }));
  };

  const resetDeck = () => {
    setDeck(MOCK_CANDIDATES);
    setMatchedCandidate(null);
  };

  return (
    <div id="tma-simulator-container" className="relative w-full max-w-[390px] mx-auto bg-white p-3 rounded-[50px] shadow-[0_25px_60px_rgba(22,163,74,0.12)] border-4 border-[#DCFCE7]">
      {/* Speaker and notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-5 w-32 bg-[#DCFCE7] rounded-b-2xl z-50 flex items-center justify-center">
        <div className="w-12 h-1 bg-[#16A34A]/25 rounded-full"></div>
      </div>

      {/* Internal Mini App Container */}
      <div className="relative h-[730px] w-full bg-brand-white rounded-[40px] overflow-hidden flex flex-col font-sans select-none border border-[#DCFCE7]/60">
        
        {/* Telegram Header Bar */}
        <div className="bg-brand-white border-b border-brand-border px-4 pt-6 pb-2 flex items-center justify-between text-[#0F172A] z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse"></span>
            <span className="text-xs font-mono font-semibold text-brand-dark-green tracking-wide">MATCHA BOT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 bg-brand-mint-light px-2 py-0.5 rounded-full border border-brand-mint-card">
              <span className="text-amber-500 text-[10px]">⚡</span>
              <span className="text-[10px] font-mono font-bold text-brand-primary">{profile.boostPoints} Boost</span>
            </div>
            <span className="text-[10px] bg-brand-mint-card text-brand-deep-green px-1.5 py-0.5 rounded font-bold font-mono">TMA INSTANT</span>
          </div>
        </div>

        {/* Swipe Matrix Match Alert (Overlay) */}
        <AnimatePresence>
          {matchedCandidate && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-50 bg-[#0F172A]/90 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="text-4xl animate-bounce">🍵✨</div>
              <h3 className="text-2xl font-display font-bold text-brand-white mt-4">IT'S A MATCHA LATTÉ!</h3>
              <p className="text-sm text-brand-mint-light/80 mt-1 max-w-[240px]">
                You and {matchedCandidate.name} share the exact same project vibe signature!
              </p>

              {/* Venn diagram representation */}
              <div className="flex items-center justify-center gap-3 my-6 relative">
                <div className="w-20 h-20 rounded-full border-4 border-brand-green overflow-hidden z-10 bg-slate-800">
                  <img src={profile.avatarUrl} alt="Your profile avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div className="absolute text-brand-green z-20 font-bold font-mono bg-slate-900 border border-brand-green rounded-full p-1 text-xs">92%</div>
                <div className="w-20 h-20 rounded-full border-4 border-brand-green overflow-hidden z-10 bg-slate-800">
                  <img src={matchedCandidate.avatarUrl} alt="Candidate avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="bg-brand-mint-card/20 border border-brand-green/35 text-left p-3.5 rounded-xl w-full">
                <span className="text-[10px] uppercase tracking-wider font-bold text-brand-green">Shared Frequency Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {matchedCandidate.tags.filter((t: string) => profile.tags.includes(t)).map((t: string, i: number) => (
                    <span key={i} className="text-[10px] bg-brand-green/30 text-brand-white px-2 py-0.5 rounded-full font-medium">{t}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full mt-6">
                <a 
                  href={`https://t.me/${matchedCandidate.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green text-brand-deep-green font-bold text-sm py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all text-center"
                >
                  Write in Telegram @{matchedCandidate.username}
                </a>
                <button 
                  onClick={() => setMatchedCandidate(null)}
                  className="text-brand-white/70 hover:text-brand-white text-xs py-2"
                >
                  Keep swiping waves
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Screen Views Content */}
        <div className="flex-1 overflow-y-auto bg-brand-white p-4 pb-20 relative">
          
          {/* PROFILE SETUP (STEP 1 OF 2) */}
          {currentScreen === Screen.PROFILE_SETUP && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-center mt-2">
                <span className="text-[10px] font-bold text-brand-dark-green uppercase tracking-widest bg-brand-mint-light px-2.5 py-1 rounded-full border border-brand-mint-card flex items-center gap-1.5 w-fit mx-auto">
                  <Sparkles className="w-3.5 h-3.5" /> Настройка профиля • 1 из 2
                </span>
                <h2 className="text-2xl font-display font-extrabold text-brand-primary mt-2 leading-tight">Давайте сделаем стиль.</h2>
                <p className="text-xs text-brand-muted mt-1 px-4 leading-medium">
                  Настройте параметры вашей личности для поиска людей на одной волне.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative w-20 h-20 rounded-full border-4 border-brand-mint-card bg-brand-mint-light overflow-hidden shadow-sm group">
                  <img src={profile.avatarUrl} alt="User Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-[8px] text-white">Изменить</span>
                  </div>
                </div>
                <span className="text-[9px] text-brand-muted mt-1.5 font-mono">Нажмите на аватар для загрузки</span>
                <span className="text-[8px] bg-brand-mint-light text-brand-dark-green py-0.5 px-1.5 rounded-full mt-0.5 font-bold">Авто-сжатие включено</span>
              </div>

              {/* Form Input Fields */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-brand-dark-green block mb-1">Ваше имя</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <input 
                        type="text" 
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-brand-white border border-slate-200 rounded-xl text-xs font-medium text-brand-primary focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                  </div>
                  <div className="w-24">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-brand-dark-green block mb-1">Возраст</label>
                    <input 
                      type="number" 
                      value={profile.age === 0 ? "" : profile.age}
                      onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 bg-brand-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-center text-brand-primary focus:outline-none focus:border-brand-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-brand-dark-green block mb-1.5">Основная роль</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLES.map((role) => {
                      const isSelected = profile.role === role;
                      return (
                        <button
                          key={role}
                          onClick={() => setProfile({ ...profile, role: role })}
                          className={`px-3 py-2.5 rounded-xl text-[10px] font-bold text-left transition-all leading-snug cursor-pointer ${
                            isSelected 
                              ? "bg-brand-mint-card border-2 border-brand-green text-brand-deep-green shadow-sm"
                              : "bg-brand-white border border-slate-200 text-brand-primary hover:bg-slate-50"
                          }`}
                        >
                          {role}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentScreen(Screen.VIBE_CALIBRATION)}
                  className="w-full bg-brand-green text-brand-deep-green hover:bg-brand-dark-green hover:text-white font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer mt-2"
                >
                  ВЫБРАТЬ ТЕГИ <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* VIBE CALIBRATION (STEP 2 OF 2) */}
          {currentScreen === Screen.VIBE_CALIBRATION && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-center mt-2">
                <span className="text-[10px] font-bold text-brand-dark-green uppercase tracking-widest bg-brand-mint-light px-2.5 py-1 rounded-full border border-brand-mint-card flex items-center gap-1.5 w-fit mx-auto">
                  <Sparkles className="w-3.5 h-3.5" /> Калибровка вайба • 2 из 2
                </span>
                <h2 className="text-2xl font-display font-extrabold text-brand-primary mt-2">Матчим вайб.</h2>
                <p className="text-xs text-brand-muted mt-1 px-4 leading-medium">
                  Выберите или впишите до 6 тегов, подходящих под ваше настроение и интересы.
                </p>
              </div>

              {/* Tag Selection Matrix */}
              <div className="flex flex-wrap gap-1.5 justify-center py-2">
                {SUGGESTED_TAGS.map((tag) => {
                  const isSelected = profile.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`text-[10px] font-bold px-3 py-2 rounded-full border transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                        isSelected
                          ? "bg-brand-green border-brand-dark-green text-brand-deep-green flex items-center"
                          : "bg-brand-white border-slate-200 text-brand-primary hover:border-brand-green"
                      }`}
                    >
                      {tag} {isSelected && " ✓"}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleAddCustomTag} className="flex gap-2 bg-brand-mint-light p-2 rounded-xl border border-brand-mint-card">
                <input 
                  type="text" 
                  placeholder="Впишите свой тег..."
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  className="flex-1 bg-transparent text-xs px-2.5 focus:outline-none font-medium placeholder:text-slate-400"
                />
                <button 
                  type="submit" 
                  className="bg-brand-green text-brand-deep-green font-bold text-[10px] px-3.5 py-1.5 rounded-lg active:scale-95 transition-transform"
                >
                  Добавить
                </button>
              </form>

              <div className="text-center font-mono text-[9px] text-brand-muted">
                Выбрано: <span className="font-bold text-brand-dark-green">{profile.tags.length} / 6</span>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={triggerAIProfileGeneration}
                  disabled={profile.tags.length === 0}
                  className={`w-full text-xs font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer ${
                    profile.tags.length === 0
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                      : "bg-brand-green text-brand-deep-green hover:bg-brand-dark-green hover:text-white"
                  }`}
                >
                  <Sparkles className="w-4 h-4" /> СОЗДАТЬ КОЛОДУ ВАЙБА
                </button>
                <button 
                  onClick={() => setCurrentScreen(Screen.PROFILE_SETUP)}
                  className="text-brand-muted hover:text-brand-primary font-bold text-[10px] py-1 text-center"
                >
                  ← Вернуться назад
                </button>
              </div>
            </motion.div>
          )}

          {/* AI PROFILE GENERATED (STEP 3 OF 2) */}
          {currentScreen === Screen.AI_PROFILE_GENERATED && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="text-center mt-2">
                <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-[#E8FBF0] px-3 py-1 rounded-full border border-brand-green/30 flex items-center gap-1.5 w-fit mx-auto">
                  <span className="animate-ping w-1.5 h-1.5 rounded-full bg-brand-green"></span> ВАЙБ-СИГНАТУРА СОЗДАНА
                </span>
                <h2 className="text-3xl font-display font-extrabold text-brand-primary mt-3">ваш AI профиль</h2>
                <p className="text-xs text-brand-muted px-4 leading-medium mt-1">
                  Эти короткие факты точечно описывают вашу уникальную энергию на основе роли и выбранных тегов:
                </p>
              </div>

              {/* Handcrafted AI notebook texture layout rendering the real generated bullet points */}
              {isGeneratingFacts ? (
                <div id="ai-generating-loader" className="border-2 border-dashed border-brand-green/45 bg-brand-mint-light p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 min-h-[180px]">
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-brand-green opacity-45"></span>
                    <Sparkles className="w-8 h-8 text-brand-green animate-spin" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-mono text-brand-dark-green font-bold">GEMINI ЛОМАЕТ ШАБЛОНЫ...</span>
                    <p className="text-[10px] text-brand-muted mt-1 animate-pulse">генерируем три дерзких факта твоей частоты</p>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="bg-brand-mint-light border-2 border-brand-mint-card p-5 rounded-2xl shadow-sm relative overflow-hidden"
                >
                  {/* Lines background pattern */}
                  <div className="absolute inset-y-0 left-10 w-0.5 bg-brand-green/10 border-r border-dotted border-brand-green/15"></div>
                  
                  <ul className="space-y-4 relative z-10 pl-6">
                    {profile.vibeFacts.map((fact, index) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        key={index} 
                        className="flex items-start gap-4 font-mono text-left"
                      >
                        <span className="text-brand-green text-xs font-bold leading-none mt-1">{index + 1}.</span>
                        <span className="text-xs text-brand-primary font-semibold leading-normal break-words">{fact}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => setCurrentScreen(Screen.SWIPE_DECK)}
                  disabled={isGeneratingFacts}
                  className="w-full bg-brand-green text-brand-deep-green hover:bg-brand-dark-green hover:text-white font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer mt-2"
                >
                  ПОДТВЕРДИТЬ И ПРОДОЛЖИТЬ <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={triggerAIProfileGeneration}
                    disabled={isGeneratingFacts}
                    className="flex-1 border border-slate-200 hover:bg-slate-50 text-brand-primary font-bold text-[10px] py-2.5 rounded-xl text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    ↻ ПЕРЕСОЗДАТЬ
                  </button>
                  <button 
                    onClick={() => setCurrentScreen(Screen.SWIPE_DECK)}
                    disabled={isGeneratingFacts}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold text-[10px] py-2.5 rounded-xl text-center cursor-pointer"
                  >
                    ПРОПУСТИТЬ
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SWIPE DECK (MAIN INTERACTIVE VIEW) */}
          {currentScreen === Screen.SWIPE_DECK && activeTab === "swipe" && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Filter Row sub-tag navigation links */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-[9px] font-bold font-mono tracking-wider no-scrollbar">
                <span className="bg-brand-deep-green text-white px-2.5 py-1 rounded-full shrink-0">ALL</span>
                <span className="bg-slate-100 text-brand-primary px-2.5 py-1 rounded-full shrink-0 uppercase">DEVELOPERS</span>
                <span className="bg-slate-100 text-brand-primary px-2.5 py-1 rounded-full shrink-0 uppercase">DESIGNERS</span>
                <span className="bg-slate-100 text-brand-primary px-2.5 py-1 rounded-full shrink-0 uppercase">FOUNDERS</span>
                <span className="bg-slate-100 text-brand-primary px-2.5 py-1 rounded-full shrink-0 uppercase">CREATORS</span>
              </div>

              {/* Informative Bubble above the card */}
              <div className="bg-[#E8FBF0] outline-dashed outline-1 outline-brand-green border border-brand-green/20 px-3 py-2 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-left text-[9px] leading-snug">
                  <span className="text-base">🍵</span>
                  <div>
                    <span className="font-extrabold text-brand-dark-green block">СВЕЖАЯ МАТЧА ЖДЕТ</span>
                    <span className="text-brand-muted font-medium block">Ребята на твоей частоте. Нажми Свайп!</span>
                  </div>
                </div>
              </div>

              {/* Swiper Deck view */}
              <div className="relative h-[460px] w-full flex items-center justify-center mt-1">
                {deck.length > 0 ? (
                  deck.map((candidate, index) => {
                    const isTop = index === deck.length - 1;
                    return (
                      <AnimatePresence key={candidate.id}>
                        {isTop && (
                          <motion.div 
                            drag="x"
                            dragConstraints={{ left: -100, right: 100 }}
                            onDragEnd={(e, info) => {
                              if (info.offset.x > 80) {
                                handleSwipe("right", candidate);
                              } else if (info.offset.x < -80) {
                                handleSwipe("left", candidate);
                              }
                            }}
                            animate={{ scale: 1, rotation: 0 }}
                            whileTap={{ scale: 0.98 }}
                            className="absolute inset-0 bg-brand-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col cursor-grab active:cursor-grabbing z-20 touch-none"
                          >
                            {/* Profile Image & Role Header Overlay */}
                            <div className="relative h-36 w-full bg-slate-900 overflow-hidden">
                              <img src={candidate.avatarUrl} alt={candidate.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                              <div className="absolute bottom-3 left-4 right-4 text-left">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-base font-display font-extrabold text-white leading-none">{candidate.name}, {candidate.age}</h4>
                                  <span className="bg-brand-green text-brand-deep-green font-bold text-[8px] px-1.5 py-0.5 rounded font-mono select-none">{candidate.matchScore}% Vibe</span>
                                </div>
                                <p className="text-[10px] font-medium text-brand-mint-light/90 mt-1 uppercase font-mono tracking-wide">@{candidate.username} • {candidate.role}</p>
                              </div>
                            </div>

                            {/* Facts and tags and voice notes */}
                            <div className="flex-1 p-3.5 space-y-3 flex flex-col justify-between">
                              
                              {/* Vibe Facts list */}
                              <div className="space-y-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-left">
                                <p className="text-[9px] font-extrabold text-brand-muted uppercase tracking-wider font-mono">// Vibe signature facts:</p>
                                <ul className="space-y-1.5 list-none">
                                  {candidate.vibeFacts.map((fact, idx) => (
                                    <li key={idx} className="flex gap-1.5 text-[10px] items-start leading-tight">
                                      <span className="text-brand-green text-xs">•</span>
                                      <span className="text-slate-700 font-mono italic select-none font-medium">{fact}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Intersecting Tags chips */}
                              <div className="flex flex-wrap gap-1 leading-none select-none">
                                {candidate.tags.map((t) => {
                                  const matchesUser = profile.tags.includes(t);
                                  return (
                                    <span 
                                      key={t} 
                                      className={`text-[9px] font-bold px-2 py-1 rounded-full ${
                                        matchesUser 
                                          ? "bg-brand-green/20 text-brand-deep-green border border-brand-green/35"
                                          : "bg-slate-100 text-slate-500 border border-slate-200"
                                      }`}
                                    >
                                      {t} {matchesUser && "⚡"}
                                    </span>
                                  );
                                })}
                              </div>

                              {/* Action swiper buttons */}
                              <div className="flex items-center justify-around gap-2 pt-2 border-t border-slate-100">
                                <button 
                                  onClick={() => handleSwipe("left", candidate)}
                                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-50 text-red-500 border border-red-100 overflow-hidden flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                                <button 
                                  onClick={() => handleSwipe("right", candidate)}
                                  className="w-12 h-12 rounded-full bg-[#EBFDF1] hover:bg-brand-green hover:text-white border border-brand-green text-brand-green overflow-hidden flex items-center justify-center active:scale-95 transition-transform shadow-md cursor-pointer"
                                >
                                  <Heart className="w-6 h-6 fill-current" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    );
                  })
                ) : (
                  <div className="text-center p-6 space-y-4">
                    <span className="text-3xl animate-pulse">🛸</span>
                    <h4 className="text-lg font-display font-extrabold text-brand-primary">No More Waves Today</h4>
                    <p className="text-xs text-brand-muted leading-medium">
                      You have matching-toured all active innovators matching your vibe frequency for now. 
                    </p>
                    <button 
                      onClick={resetDeck}
                      className="bg-brand-green text-brand-deep-green hover:bg-brand-dark-green hover:text-white font-extrabold text-xs py-2.5 px-6 rounded-xl flex items-center justify-center gap-1.5 shadow mx-auto transition-transform active:scale-95 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" /> RESET WAVE DECK
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* PROFILE SETTINGS TAB SCREEN */}
          {((currentScreen === Screen.PROFILE_SETTINGS) || (currentScreen === Screen.SWIPE_DECK && activeTab === "profile")) && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Profile Main Card */}
              <div className="bg-brand-mint-light border border-brand-mint-card p-4 rounded-3xl text-center relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <button 
                    onClick={() => setCurrentScreen(Screen.EDIT_PROFILE)}
                    className="p-1 px-2.5 bg-brand-white rounded-full border border-brand-border text-[9px] font-bold text-brand-dark-green tracking-wider hover:bg-brand-mint-card flex items-center gap-1 cursor-pointer"
                  >
                    <Settings className="w-3 h-3" /> РЕДАКТИРОВАТЬ
                  </button>
                </div>

                <div className="relative w-20 h-20 rounded-full border-4 border-brand-white bg-slate-100 overflow-hidden mx-auto shadow-sm">
                  <img src={profile.avatarUrl} alt="Your profile avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-display font-extrabold text-brand-primary mt-2">{profile.name}, {profile.age}</h3>
                <span className="text-[10px] font-bold font-mono tracking-wider text-brand-dark-green block mt-0.5 bg-brand-white px-2.5 py-0.5 rounded-full w-fit mx-auto border border-brand-mint-card uppercase">
                  @{profile.name.toLowerCase()}vibe • {profile.role}
                </span>

                {/* Tags preview */}
                <div className="flex flex-wrap gap-1 justify-center mt-3">
                  {profile.tags.map((t) => (
                    <span key={t} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-mint-card border border-brand-green/20 text-brand-deep-green">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Referral Boost Widget */}
              <div className="bg-[#EBFDF1] border border-brand-green/20 p-4 rounded-3xl text-left relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <span className="text-[8px] bg-brand-green text-brand-deep-green font-bold px-1.5 py-0.5 rounded font-mono uppercase tracking-widest">GROWTH ⚡</span>
                </div>
                <h4 className="text-xs font-display font-extrabold text-brand-deep-green">Invite a founder</h4>
                <p className="text-[10px] text-brand-muted leading-snug mt-1">
                  Generate ref links and score +5 stack priority boost for both when they join.
                </p>

                {/* Link generator inline card */}
                <div className="flex gap-1.5 mt-3 justify-between bg-brand-white p-2 rounded-xl border border-brand-border">
                  <span className="text-[9px] font-mono text-brand-muted truncate max-w-[180px] self-center ml-1">{profile.refLink}</span>
                  <button 
                    onClick={handleCopyLink}
                    className="bg-brand-green/25 hover:bg-brand-green/45 text-brand-deep-green font-extrabold text-[9px] px-3 py-1.5 rounded-lg active:scale-95 transition-all text-center flex items-center gap-1 cursor-pointer"
                  >
                    {isCopied ? <span className="text-brand-dark-green font-bold">Copied ✓</span> : <><Copy className="w-3 h-3" /> COPY</>}
                  </button>
                </div>
              </div>

              {/* Referral List */}
              <div className="space-y-2">
                <p className="text-[9px] font-extrabold text-brand-muted uppercase tracking-wider font-mono text-left block">// ПРИГЛАШЕННЫЕ СОЗДАТЕЛИ</p>
                <div className="space-y-1.5">
                  {REFERRALS.map((ref, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 rounded-xl bg-slate-50 border border-slate-100 text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-slate-200 border border-slate-300 rounded-full flex items-center justify-center font-bold text-xs font-mono text-slate-500">
                          {ref.name[0]}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-brand-primary block leading-none">{ref.name}</span>
                          <span className="text-[9px] text-brand-muted font-mono block mt-0.5">{ref.role}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-brand-dark-green bg-brand-mint-light border border-slate-200 px-2 py-0.5 rounded-full">{ref.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Energy Signature */}
              <div className="space-y-2">
                <p className="text-[9px] font-extrabold text-brand-muted uppercase tracking-wider font-mono text-left block">// CONFIG ENERGY SIGNATURE</p>
                <div className="flex gap-2">
                  {profile.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[9px] font-bold font-mono py-1 px-3 border border-slate-200 rounded text-slate-700 bg-white">
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-2 py-2">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-center">
                    <span className="text-base font-extrabold font-mono text-brand-primary leading-none block">{profile.swipeCountToday}</span>
                    <span className="text-[9px] text-brand-muted uppercase font-mono tracking-wider block mt-1">свайпов сегодня</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-center">
                    <span className="text-base font-extrabold font-mono text-brand-primary leading-none block">{profile.activeDays}d</span>
                    <span className="text-[9px] text-brand-muted uppercase font-mono tracking-wider block mt-1">дни</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-center">
                    <span className="text-base font-extrabold font-mono text-brand-primary leading-none block">+{profile.referralsCount * 5}</span>
                    <span className="text-[9px] text-brand-muted uppercase font-mono tracking-wider block mt-1">Очки буста</span>
                  </div>
                </div>
              </div>

              {/* Settings configuration settings */}
              <div className="space-y-2">
                <p className="text-[9px] font-extrabold text-brand-muted uppercase tracking-wider font-mono text-left block">// НАСТРОЙКИ СЕКЬЮРНОСТИ</p>
                <div className="bg-slate-50 rounded-2xl border border-slate-150 overflow-hidden divide-y divide-slate-100 text-xs">
                  <div className="p-3.5 flex justify-between items-center">
                    <span className="font-semibold text-slate-700">Пуш-уведомления</span>
                    <input 
                      type="checkbox" 
                      checked={profile.notifications}
                      onChange={(e) => setProfile({ ...profile, notifications: e.target.checked })}
                      className="accent-brand-green w-4 h-4"
                    />
                  </div>
                  <div className="p-3.5 flex justify-between items-center">
                    <span className="font-semibold text-slate-700">Режим невидимки</span>
                    <input 
                      type="checkbox" 
                      checked={profile.ghostMode}
                      onChange={(e) => setProfile({ ...profile, ghostMode: e.target.checked })}
                      className="accent-brand-green w-4 h-4"
                    />
                  </div>
                  <div className="p-3.5 flex justify-between items-center">
                    <span className="font-semibold text-slate-700">Язык приложения</span>
                    <button 
                      onClick={() => setProfile(p => ({ ...p, language: p.language === "RU" ? "EN" : "RU" }))}
                      className="text-[10px] bg-slate-200 font-mono font-bold px-2 py-1.5 rounded-lg border border-slate-300 text-brand-primary"
                    >
                      {profile.language} 🌐
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    resetDeck();
                    setProfile(p => ({ ...p, swipeCountToday: 0 }));
                  }}
                  className="w-full bg-brand-green hover:bg-brand-dark-green hover:text-white text-brand-deep-green text-xs font-bold py-3.5 px-4 rounded-xl leading-none text-center block mt-2 cursor-pointer"
                >
                  СБРОСИТЬ ИСТОРИЮ ВОЛНЫ
                </button>
              </div>
            </motion.div>
          )}

          {/* EDIT PROFILE VIEW */}
          {currentScreen === Screen.EDIT_PROFILE && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setCurrentScreen(Screen.SWIPE_DECK)}
                  className="bg-brand-green hover:bg-brand-dark-green hover:text-white text-brand-deep-green text-[9px] font-extrabold px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  ← НАЗАД К АНКЕТАМ
                </button>
                <span className="text-[10px] font-mono font-bold text-brand-muted uppercase tracking-widest">ПРОФИЛЬ</span>
              </div>

              <div className="text-center">
                <div className="relative w-20 h-20 rounded-full border-4 border-brand-mint-card bg-slate-100 overflow-hidden mx-auto shadow-sm">
                  <img src={profile.avatarUrl} alt="User avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-primary mt-2">{profile.name} / {profile.age}</h3>
                <span className="text-[10px] font-mono font-bold text-brand-dark-green">@{profile.name.toLowerCase()}vibe • {profile.role}</span>
              </div>

              {/* Form panel inputs */}
              <div className="bg-brand-mint-light/40 border border-brand-mint-card p-4 rounded-3xl space-y-3 shadow-inner">
                <h4 className="text-[10px] font-bold font-mono tracking-wider text-brand-muted uppercase flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-brand-green" /> Редактировать Профиль
                </h4>
                
                <div className="space-y-2 text-left">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Имя (Никнейм)</label>
                      <input 
                        type="text" 
                        value={profile.name} 
                        onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-white text-xs px-2.5 py-2 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Возраст</label>
                      <input 
                        type="number" 
                        value={profile.age} 
                        onChange={(e) => setProfile(p => ({ ...p, age: Number(e.target.value) }))}
                        className="w-full bg-white text-xs px-2.5 py-2 border border-slate-200 rounded-xl focus:outline-none font-mono font-bold text-center"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block mb-1">О Себе (Био)</label>
                    <textarea 
                      rows={2}
                      defaultValue={`${profile.role}. Interested in: ${profile.tags.join(', ')}.`}
                      className="w-full bg-white text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none leading-snug"
                    />
                  </div>
                </div>
              </div>

              {/* Voice business card signature recorder mimicking Screen 6 */}
              <div className="bg-slate-50 border border-slate-150 p-4 rounded-3xl text-left space-y-2">
                <h4 className="text-[10px] font-bold font-mono tracking-wider text-brand-muted uppercase flex items-center gap-1">
                  <Mic className="w-3.5 h-3.5 text-brand-green" /> ГОЛОСОВАЯ ВИЗИТКА (ВАЙБ ГОЛОСА)
                </h4>

                <div className="bg-white border border-slate-200 p-3 rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isRecordingVoice ? 'bg-red-500 animate-ping' : hasVoiceVibe ? 'bg-brand-green' : 'bg-slate-300'}`}></span>
                    <span className="text-[10px] font-mono font-bold text-slate-600">
                      {isRecordingVoice 
                        ? `Запись... 0:0${voiceSeconds} (из 5с)` 
                        : hasVoiceVibe 
                          ? "Вайб-голос записан! 🌟" 
                          : "Нет записи. Наговорите 5 секунд вайба!"}
                    </span>
                  </div>

                  {isRecordingVoice ? (
                    <button 
                      onClick={() => setIsRecordingVoice(false)}
                      className="bg-red-500 text-white p-2 rounded-full shadow-md active:scale-95 flex items-center justify-center cursor-pointer"
                    >
                      <Square className="w-3 h-3 fill-current" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setIsRecordingVoice(true);
                        setVoiceSeconds(0);
                        setHasVoiceVibe(false);
                      }}
                      className="bg-brand-mint-light hover:bg-brand-mint-card text-brand-dark-green font-bold text-[9px] px-3.5 py-1.5 border border-brand-green/30 rounded-full flex items-center gap-1 cursor-pointer"
                    >
                      🎙 Записать голос
                    </button>
                  )}
                </div>
              </div>

              {/* Modify facts area */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold font-mono tracking-wider text-brand-muted uppercase text-left flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-green" /> Modify My Vibe Facts
                </h4>
                <div className="space-y-1.5 text-left">
                  {profile.vibeFacts.map((fact, index) => (
                    <div key={index} className="bg-white border border-slate-150 rounded-xl p-2.5 flex items-start justify-between">
                      <p className="text-[10px] font-mono text-slate-700 leading-snug break-words max-w-[240px] italic">"{fact}"</p>
                      <button 
                        onClick={() => {
                          setProfile(p => ({
                            ...p,
                            vibeFacts: p.vibeFacts.filter((_, idx) => idx !== index)
                          }));
                        }}
                        className="text-red-500 hover:text-red-700 p-1 flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {profile.vibeFacts.length === 0 && (
                    <button 
                      onClick={triggerAIProfileGeneration}
                      className="text-brand-dark-green hover:underline text-[10px] font-bold py-1 flex items-center gap-1.5"
                    >
                      + Сгенерировать новые ИИ факты
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setCurrentScreen(Screen.SWIPE_DECK)}
                  className="w-full bg-brand-green text-brand-deep-green hover:bg-brand-dark-green hover:text-white font-extrabold text-xs py-3.5 px-4 rounded-xl leading-none text-center shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  СОХРАНИТЬ ДАННЫЕ
                </button>
              </div>
            </motion.div>
          )}

        </div>

        {/* Realistic iOS Bottom Navigation Bar showing swipe state */}
        {currentScreen !== Screen.PROFILE_SETUP && currentScreen !== Screen.VIBE_CALIBRATION && currentScreen !== Screen.AI_PROFILE_GENERATED && (
          <div className="absolute bottom-0 left-0 right-0 bg-brand-white border-t border-brand-border py-2 px-6 flex items-center justify-around z-25">
            <button 
              onClick={() => {
                setActiveTab("swipe");
                if (currentScreen !== Screen.SWIPE_DECK) {
                  setCurrentScreen(Screen.SWIPE_DECK);
                }
              }}
              className={`flex flex-col items-center gap-1.5 py-1 cursor-pointer transition-all ${
                activeTab === "swipe" && currentScreen === Screen.SWIPE_DECK
                  ? "text-brand-green scale-105 font-bold" 
                  : "text-brand-muted hover:text-brand-primary"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-[9px] tracking-wide font-medium">СВАЙП</span>
            </button>
            <button 
              onClick={() => {
                setActiveTab("profile");
                setCurrentScreen(Screen.PROFILE_SETTINGS);
              }}
              className={`flex flex-col items-center gap-1.5 py-1 cursor-pointer transition-all ${
                activeTab === "profile" || currentScreen === Screen.PROFILE_SETTINGS || currentScreen === Screen.EDIT_PROFILE
                  ? "text-brand-green scale-105 font-bold" 
                  : "text-brand-muted hover:text-brand-primary"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[9px] tracking-wide font-medium">ПРОФИЛЬ</span>
            </button>
          </div>
        )}

        {/* Telegram footer indicator stamp label */}
        <div className="absolute bottom-1 left-0 right-0 text-center pointer-events-none select-none">
          <span className="text-[8px] font-semibold text-slate-300 font-mono tracking-widest bg-brand-white/70 px-4 py-0.5 rounded-full">@GetMatchaBot</span>
        </div>

      </div>
    </div>
  );
}
