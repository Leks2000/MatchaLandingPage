export interface TranslationSchema {
  heroTag: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSub: string;
  btnLaunch: string;
  navSim: string;
  navPitch: string;
  navStrat: string;
  navFaq: string;
  langSwitch: string;
  simTag: string;
  simTitle: string;
  simSub: string;
  vibePitchTag: string;
  vibePitchTitle: string;
  vibePitchSub: string;
  faqTitle: string;
  faqSub: string;
  strategyTitle: string;
  strategySub: string;
  strategyTag: string;
  videoPlaceholder: string;
  videoPlayTitle: string;
  videoPlaySub: string;
}

export const LOCALES: Record<"RU" | "EN", TranslationSchema> = {
  RU: {
    heroTag: "✨ Telegram Mini App запускается совсем скоро",
    heroTitle: "Найди своих людей на той же",
    heroTitleAccent: "частоте.",
    heroSub: "Matcha — это полностью AI-driven нетворкинг бот для фаундеров, инди-разработчиков и дизайнеров. Мэтчинг по реальной синергии голосовых питчей и вайба проектов, а не по сухим резюме.",
    btnLaunch: "ЗАПУСТИТЬ БОТА",
    navSim: "Симулятор бота",
    navPitch: "Видео-Вайб Студия",
    navStrat: "Стратегия Продукта",
    navFaq: "Часто задаваемые вопросы",
    langSwitch: "RU",
    simTag: "100% РАБОЧИЙ СИМУЛЯТОР MINI APP 🍵",
    simTitle: "Интерактивный кликер бота",
    simSub: "Настройте свой профиль, выберите теги частоты и получите реальное ИИ-описание характера в реальном времени с помощью Gemini!",
    vibePitchTag: "ИНТЕРАКТИВНЫЙ 3D-ШОУКЕЙС 📹",
    vibePitchTitle: "Vocal Vibe-Signature Studio",
    vibePitchSub: "Почувствуйте механику видео и аудио визиток напрямую. Наша ИИ модель измерит совместимость за пару кликов.",
    faqTitle: "Часто Задаваемые Вопросы",
    faqSub: "Всё, что вы хотели знать об архитектуре Matcha Bot",
    strategyTitle: "Анализ MVP & Рекомендации по Запуску",
    strategySub: "Экспертная оценка траектории развития Matcha Bot от венчурного продакт-менеджера.",
    strategyTag: "🍵 PRODUCT STRATEGY HUB",
    videoPlaceholder: "Демонстрация Matcha Video-Pitch",
    videoPlayTitle: "Кликни для запуска видео-презентации",
    videoPlaySub: "Почувствуй вайб моментальной совместимости"
  },
  EN: {
    heroTag: "✨ Telegram Mini App Launcher Commencing",
    heroTitle: "Find your crowd on the exact same",
    heroTitleAccent: "frequency.",
    heroSub: "Matcha is a fully AI-driven networking app for founders, indie creators, and designers. Match on real sonic synergy and project vibes, rather than dry resume checkpoints.",
    btnLaunch: "LAUNCH MINI APP",
    navSim: "Bot Simulator",
    navPitch: "Video Vibe Studio",
    navStrat: "Product Strategy",
    navFaq: "FAQ",
    langSwitch: "EN",
    simTag: "100% INTERACTIVE TMA SIMULATOR 🍵",
    simTitle: "Interactive Mini App Clicker",
    simSub: "Configure your profile, select vibe tags, and watch Gemini generate high-fidelity, quirky persona summaries on the fly!",
    vibePitchTag: "INTERACTIVE 3D SHOWCASE 📹",
    vibePitchTitle: "Vocal Vibe-Signature Studio",
    vibePitchSub: "Test the video-pitch preview directly. See how AI matches talking frequency signatures in seconds.",
    faqTitle: "Frequently Asked Questions",
    faqSub: "Everything you wished to know about major Matcha Bot systems",
    strategyTitle: "MVP Analysis & Launch Strategy Guide",
    strategySub: "A complete expert product manager study on launching Matcha with viral loops.",
    strategyTag: "🍵 PRODUCT STRATEGY HUB",
    videoPlaceholder: "Matcha Video-Pitch Demo Reels",
    videoPlayTitle: "Click to launch mock interactive video presentation",
    videoPlaySub: "Experience physical and vocal vibe alignment"
  }
};
