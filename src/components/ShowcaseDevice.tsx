import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

interface ShowcaseDeviceProps {
  lang: "RU" | "EN";
}

export default function ShowcaseDevice({ lang }: ShowcaseDeviceProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.55], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.38], [1.035, 1]);
  const yOffset = useTransform(scrollYProgress, [0, 0.4], [-34, 22]);
  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 90, damping: 18 });
  const springYOffset = useSpring(yOffset, { stiffness: 120, damping: 18 });

  return (
    <section ref={containerRef} className="relative w-full max-w-5xl mx-auto pt-0 pb-10 px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#22C55E]/10 to-[#DCFCE7]/30 blur-[130px] opacity-70 pointer-events-none rounded-full" />

      <div className="w-full relative py-6 flex items-center justify-center" style={{ perspective: "1000px" }}>
        <motion.div
          style={{
            rotateX: springRotateX,
            scale: springScale,
            y: springYOffset,
            transformStyle: "preserve-3d",
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-full rounded-[30px] border-4 bg-white p-3 md:p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
        >
          <div className="overflow-hidden rounded-2xl bg-black">
            <video
              className="h-full w-full aspect-[16/9] object-cover"
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

      <div className="mt-6 text-center text-white/70 text-sm font-medium">
        {lang === "RU" ? "Нажмите «ЗАПУСТИТЬ БОТА», чтобы открыть QR и перейти в Telegram." : "Click “LAUNCH MINI APP” to open the QR and launch in Telegram."}
      </div>
    </section>
  );
}
