import { motion } from "motion/react";

interface ShowcaseDeviceProps {
  lang: "RU" | "EN";
}

export default function ShowcaseDevice({ lang }: ShowcaseDeviceProps) {
  const cta =
    lang === "RU"
      ? "Запустите Matcha Bot в Telegram"
      : "Launch Matcha Bot in Telegram";
  const REAL_QR = "https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=https%3A%2F%2Ft.me%2Fgetmatchabot";

  const ctaSub =
    lang === "RU"
      ? "Синхронизируйте ваши интересы по коду и матче с лучшими создателями в IT."
      : "Sync your coding and matcha interests with top IT creators.";

  return (
    <section className="relative w-full max-w-5xl mx-auto pt-2 pb-8 px-4 md:px-8">
      <div className="w-full relative -mt-4 sm:-mt-6 flex items-center justify-center" style={{ perspective: "1400px" }}>
        <motion.div
          style={{
            transformStyle: "preserve-3d",
          }}
          initial={{ rotateX: 10, rotateY: -9, y: 10 }}
          animate={{ rotateX: [10, 8, 10], rotateY: [-9, -6, -9], y: [10, 0, 10] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full rounded-[30px] border-4 border-brand-mint-card/90 bg-[#F7FFFA] p-3 md:p-5 shadow-[0_35px_90px_rgba(8,44,22,0.34)]"
        >
          <div className="overflow-hidden rounded-2xl bg-black">
            <video
              className="h-full w-full aspect-[16/9] object-cover object-left-top scale-[1.06]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls={false}
              poster="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop"
            >
              <source src="https://cdn.coverr.co/videos/coverr-office-teamwork-1579/1080p.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
        <div className="text-center sm:text-left">
          <p className="text-lg sm:text-xl font-black text-white">{cta}</p>
          <p className="mt-1.5 text-xs sm:text-sm font-medium text-[#DAFBE8]">{ctaSub}</p>
        </div>

        <a
          href="https://t.me/getmatchabot"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl bg-brand-green px-5 py-3 text-white font-black text-sm shadow-[0_12px_24px_rgba(34,197,94,0.3)] hover:scale-[1.02] transition-transform"
        >
          {lang === "RU" ? "Запустить бота" : "Launch bot"}
        </a>
      </div>
    </section>
  );
}
