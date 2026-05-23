import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Smartphone, ArrowRight, Sparkles, AlertCircle, ExternalLink, QrCode } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "RU" | "EN";
}

export default function OnboardingModal({ isOpen, onClose, lang }: OnboardingModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  const isRu = lang === "RU";

  // Simple runtime client device detection
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const mobileKeywords = ["android", "webos", "iphone", "ipad", "ipod", "blackberry", "windows phone"];
    const hasMobileKeyword = mobileKeywords.some((keyword) => ua.includes(keyword));
    setIsMobile(hasMobileKeyword || window.innerWidth < 768);
  }, [isOpen]);

  const BOT_LINK = "https://t.me/GetMatchaBot";
  // Native deep link to bypass browser intermediates on mobile
  const DEEP_LINK = "tg://resolve?domain=GetMatchaBot";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card Content Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg bg-white border-2 border-[#DCFCE7] rounded-[32px] overflow-hidden p-6 md:p-8 shadow-[0_30px_90px_rgba(22,163,74,0.22)] z-10 text-center"
          >
            
            {/* Top exit button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100/80 transition-all text-slate-400 hover:text-slate-600 active:scale-95 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Custom logo watermarking background */}
            <div className="absolute top-[-30px] left-[-30px] w-40 h-40 bg-[#22C55E]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-[-30px] right-[-30px] w-40 h-40 bg-[#DCFCE7]/30 rounded-full blur-2xl pointer-events-none" />

            {/* Icon Banner Header */}
            <div className="relative mx-auto w-16 h-16 bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl flex items-center justify-center mb-5 shadow-xs">
              <Sparkles className="w-8 h-8 text-[#22C55E] animate-pulse" />
            </div>

            <div className="space-y-2 mb-6.5">
              <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 tracking-tight">
                {isRu ? "Запустите Matcha Bot в Telegram" : "Launch Matcha Bot Native Onboarding"}
              </h3>
              <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto">
                {isRu 
                  ? "Синхронизируйте ваши интересы по коду и матче с лучшими создателями в IT." 
                  : "Sync your coding frequency and matcha vibes with lead creators across the modern tech ecosystem."}
              </p>
            </div>

            {/* DUAL ONBOARDING SELECTOR BRANCHES */}
            <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-5 relative overflow-hidden">
              
              {isMobile ? (
                /* MOBILE LAYOUT DEEP LINK BRANCH */
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-[#16A34A] font-mono text-[10px] uppercase font-bold tracking-widest bg-[#ECFDF5] border border-[#A7F3D0] px-3.5 py-1 rounded-full w-fit mx-auto">
                    <Smartphone className="w-3.5 h-3.5" /> MOBILE DEEPLINK DETECTED
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    {isRu 
                      ? "Мы обнаружили мобильное устройство. Вы будете напрямую перенаправлены в приложение Telegram в 1 клик." 
                      : "We detected your mobile environment. Open Telegram to configure your voice vibe and start swiping immediately."}
                  </p>

                  <a
                    href={DEEP_LINK}
                    rel="noopener noreferrer"
                    className="w-full py-4.5 bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white font-display font-black text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95"
                  >
                    <span>{isRu ? "ЗАПУСТИТЬ BOT В 1 КЛИК" : "LAUNCH BOT IN 1-CLICK"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-semibold text-slate-400 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-300" />
                    <span>{isRu ? "Прямой переход без веб-браузера" : "Direct routing bypassing intermediary screens"}</span>
                  </div>
                </div>
              ) : (
                /* DESKTOP LAYOUT QR-CODE COUPLING */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center text-left">
                  
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-1.5 text-[#16A34A] font-mono text-[9px] uppercase font-bold tracking-widest bg-[#ECFDF5] border border-[#A7F3D0] px-3.5 py-1 rounded-full w-fit">
                      <QrCode className="w-3.5 h-3.5" /> DESKTOP MODE
                    </div>

                    <h4 className="text-sm font-display font-black text-slate-900 leading-snug">
                      {isRu ? "Наведите камеру смартфона" : "Scan to Activate Your Vibe"}
                    </h4>
                    
                    <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                      {isRu 
                        ? "Откройте камеру телефона и отсканируйте код справа для мгновенного старта Matcha Bot в мобильном Telegram." 
                        : "Point your smartphone camera to reveal the safe Telegram launch path or click the secondary hub link."}
                    </p>

                    <a
                      href={BOT_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#16A34A] font-mono font-bold hover:underline"
                    >
                      <span>{isRu ? "Открыть в браузере" : "Open in browser web client"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="relative mx-auto rounded-2xl border-2 border-[#DCFCE7] bg-white p-3 shadow-sm select-none">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https%3A%2F%2Ft.me%2FGetMatchaBot"
                      alt="QR code to @GETMATCHABOT"
                      className="w-36 h-36 rounded-xl border border-slate-100"
                    />
                    <div className="text-center font-mono text-[10px] text-[#5b7ee8] uppercase tracking-wider pt-2 font-black">
                      @GETMATCHABOT
                    </div>
                  </div>

                </div>
              )}

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
