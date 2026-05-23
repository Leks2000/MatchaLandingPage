import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

interface ShowcaseDeviceProps {
  lang: "RU" | "EN";
}

const REAL_QR =
  "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https%3A%2F%2Ft.me%2Fgetmatchabot";

export default function ShowcaseDevice({ lang }: ShowcaseDeviceProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.55], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [1.02, 1]);
  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 60, damping: 20 });

  const cta =
    lang === "RU"
      ? "Сканируйте QR и откройте @GETMATCHABOT"
      : "Scan the QR to open @GETMATCHABOT";

  return (
    <section
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto py-10 px-4 md:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#22C55E]/10 to-[#DCFCE7]/30 blur-[130px] opacity-70 pointer-events-none rounded-full" />

      <div className="w-full relative py-6 flex items-center justify-center" style={{ perspective: "1000px" }}>
        <motion.div
          style={{
            rotateX: springRotateX,
            scale: springScale,
            transformStyle: "preserve-3d",
          }}
          className="w-full rounded-[30px] border-4 border-[#DCFCE7] bg-white p-3 md:p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
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

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <p className="text-center md:text-left text-xs font-semibold text-white/70">{cta}</p>

        <a
          href="https://t.me/getmatchabot"
          target="_blank"
          rel="noreferrer"
          className="justify-self-center md:justify-self-end w-[220px] rounded-2xl bg-white p-3 shadow-xl hover:scale-[1.02] transition-transform"
        >
          <img src={REAL_QR} alt="QR code to @GETMATCHABOT" className="w-full h-auto rounded-xl" loading="lazy" />
          <p className="pt-2 text-center text-[#5b7ee8] text-xl font-black tracking-wide">@GETMATCHABOT</p>
        </a>
      </div>
    </section>
  );
}
