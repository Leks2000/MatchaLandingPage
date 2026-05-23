import React from "react";
import { motion } from "motion/react";
import { Sparkles, CheckCircle2, Zap, Share2, Award, UserCheck, Shield } from "lucide-react";

interface StrategyHubProps {
  lang: "RU" | "EN";
}

export default function StrategyHub({ lang }: StrategyHubProps) {
  const isRu = lang === "RU";

  const RU_REC = [
    {
      title: "1. Энергия Общения (Sparks) ⚡",
      desc: "При регистрации вы получаете 15 ежедневных искр (Sparks). Каждый свайп расходует одну искру. Это помогает находить только тех людей, кто действительно вам интересен, без спама.",
      metric: "15 Sparks / День",
      icon: <Zap className="w-5 h-5 text-[#22C55E]" />
    },
    {
      title: "2. Приглашайте друзей 🔗",
      desc: "Поделитесь своей индивидуальной пригласительной ссылкой. За каждого приглашенного друга вы оба моментально получите приятный бонус — плюс 5 дополнительных искр на свайпы!",
      metric: "+5 Sparks Лимит",
      icon: <Share2 className="w-5 h-5 text-[#22C55E]" />
    },
    {
      title: "3. Приоритет в Поиске 📈",
      desc: "Чем активнее вы общаетесь, добавляете интересные теги и записываете аудио-приветствия, тем выше поднимается ваша карточка в общей ленте нетворкинга.",
      metric: "Выше в Ленте",
      icon: <Award className="w-5 h-5 text-[#22C55E]" />
    },
    {
      title: "4. Умные Интересы и Теги 🏷️",
      desc: "Выбирайте любимые темы — будь то дизайн, разработка, стартапы или просто любовь к хорошему чаю. Алгоритм Matchа автоматически предложит вам наиболее подходящих людей.",
      metric: "Точные Мэтчи",
      icon: <Sparkles className="w-5 h-5 text-[#22C55E]" />
    },
    {
      title: "5. Только реальные профили 🛡️",
      desc: "Никаких фейков и ботов. Все пользователи подтверждают свои аккаунты через Telegram, гарантируя безопасность, уважительное общение и подлинность каждого собеседника.",
      metric: "100% Верифицировано",
      icon: <UserCheck className="w-5 h-5 text-[#22C55E]" />
    }
  ];

  const EN_REC = [
    {
      title: "1. Daily Energy (Sparks) ⚡",
      desc: "On registration you get 15 daily swiping Sparks. Each swipe uses 1 Spark. This keeps the network high-quality and ensures you match only with active, authentic peers.",
      metric: "15 Sparks / Day",
      icon: <Zap className="w-5 h-5 text-[#22C55E]" />
    },
    {
      title: "2. Easy Referral Bonus 🔗",
      desc: "Share your unique invite link with colleagues. Every successful sign-up rewards both of you with an instant boost of +5 swiping Sparks!",
      metric: "+5 Sparks Bonus",
      icon: <Share2 className="w-5 h-5 text-[#22C55E]" />
    },
    {
      title: "3. Priority Visibility 📈",
      desc: "Your profile visibility rises automatically when you record vibe audio clips, match often, and keep active within the networking community.",
      metric: "Search Boost",
      icon: <Award className="w-5 h-5 text-[#22C55E]" />
    },
    {
      title: "4. Smart Matchmaking Tags 🏷️",
      desc: "Select what you love: design, development, business or just great matcha. Our algorithm suggests relevant co-builders with matching interests.",
      metric: "Smart Matching",
      icon: <Sparkles className="w-5 h-5 text-[#22C55E]" />
    },
    {
      title: "5. Safe & Verified Network 🛡️",
      desc: "No passwords or synthetic fake cards. Secure connections map directly onto verified active Telegram accounts. Zero bots, zero spam.",
      metric: "Verified Only",
      icon: <UserCheck className="w-5 h-5 text-[#22C55E]" />
    }
  ];

  const records = isRu ? RU_REC : EN_REC;

  return (
    <div id="strategy-consultant-hub" className="bg-[#FFFFFF] border border-[#DCFCE7] rounded-[32px] p-6 md:p-10 shadow-[0_20px_50px_rgba(22,163,74,0.06)] text-left relative overflow-hidden">
      
      {/* Visual background atmospheric effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F0FDF4] rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#DCFCE7]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header and Core Meta Fields */}
      <div className="space-y-4 relative z-10 border-b border-[#E2E8F0]/80 pb-6 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#16A34A] bg-[#F0FDF4] border border-[#DCFCE7] px-3.5 py-1.5 rounded-full">
            🧠 {isRu ? "ПРАВИЛА ИГРЫ" : "HOW IT WORKS"}
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#14532D] bg-[#22C55E]/15 border border-[#22C55E]/30 px-3 py-1.5 rounded-full">
            {isRu ? "БЕЗОПАСНО КАНАЛЫ" : "SAFETY SECURED"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-2">
            <h3 className="text-2xl md:text-4xl font-display font-black text-[#0F172A] tracking-tight">
              {isRu ? "Как устроен Matcha Bot 🍵" : "How Matcha Bot Works"}
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-semibold">
              {isRu
                ? "Простые и понятные правила, разработанные специально для того, чтобы ваш нетворкинг приносил пользу без бесконечного прокручивания ленты."
                : "Simple, human-centric rules designed to make sure your networking brings real energy, and values your attention."}
            </p>
          </div>
          
          <div className="lg:col-span-4 bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#16A34A] shrink-0" />
            <div>
              <p className="font-mono text-[9px] text-[#64748B] font-bold uppercase tracking-wider">{isRu ? "Надежная Платформа" : "VERIFIED PLATFORM"}</p>
              <p className="font-display font-black text-xs text-[#0F172A] leading-tight mt-0.5">
                {isRu ? "Прямое подключение к Telegram" : "Direct native Telegram connection"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid mapping of variables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {records.map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="bg-[#F0FDF4]/50 border border-[#DCFCE7] p-6 rounded-2xl flex flex-col justify-between hover:bg-[#F0FDF4] transition-all hover:scale-[1.02] shadow-[0_4px_12px_rgba(22,163,74,0.015)]"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-white rounded-xl border border-[#DCFCE7] shadow-xs inline-flex text-[#22C55E]">
                  {rec.icon}
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#FFFFFF] text-[#16A34A] border border-[#DCFCE7] px-3 py-1 rounded-lg">
                  {rec.metric}
                </span>
              </div>
              <h4 className="text-sm font-display font-black text-[#0F172A] leading-tight">
                {rec.title}
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                {rec.desc}
              </p>
            </div>

            <div className="pt-4.5 border-t border-[#E2E8F0]/40 mt-3 flex items-center gap-1.5 text-[#16A34A] font-mono text-[9px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" /> {isRu ? "ФУНКЦИЯ ДОСТУПНА" : "NATIVE FEATURE ENABLED"}
            </div>
          </motion.div>
        ))}

        {/* Dynamic Spark Energy Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-gradient-to-br from-[#22C55E] to-[#16A34A] border border-[#DCFCE7] p-6 rounded-2xl flex flex-col justify-between text-[#14532D] shadow-md"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-white">
              <span className="w-9 h-9 rounded-xl bg-white/20 text-white font-mono font-bold text-base flex items-center justify-center">
                🔋
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#14532D] text-[#22C55E] px-3 py-1.5 rounded-lg border border-[#22C55E]/20">
                ⚡ {isRu ? "15 ИСКР НА СТАРТЕ" : "15 FREE SPARKS"}
              </span>
            </div>
            <h4 className="text-sm font-display font-black text-white leading-tight">
              {isRu ? "Готовы встретить единомышленников?" : "Ready to Find Your People?"}
            </h4>
            <p className="text-xs text-[#F0FDF4] leading-relaxed font-semibold">
              {isRu
                ? "Запускайте Matcha Bot прямо сейчас, разблокируйте свой баланс в 15 Sparks и делитесь пригласительной ссылкой с коллегами!"
                : "Launch Matcha Bot right away, claim your starting balance of 15 Sparks, and share your unique invite link with friends!"}
            </p>
          </div>

          <div className="pt-4.5 flex items-center gap-2 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-white animate-pulse" /> {isRu ? "СТАРТ ГОТОВ" : "READY TO LAUNCH"}
          </div>
        </motion.div>
      </div>

    </div>
  );
}
