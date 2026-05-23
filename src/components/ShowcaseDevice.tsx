import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Home, UserRound, MessageSquareText } from "lucide-react";

interface ShowcaseDeviceProps {
  lang: "RU" | "EN";
}

const DEMO_VIDEO = "https://cdn.coverr.co/videos/coverr-man-using-smartphone-1579/1080p.mp4";

const REAL_QR = "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https%3A%2F%2Ft.me%2Fgetmatchabot";

export default function ShowcaseDevice({ lang }: ShowcaseDeviceProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.6], [14, 0]), { stiffness: 80, damping: 22 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.6], [1.04, 1]), { stiffness: 80, damping: 22 });

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-6xl rounded-[28px] bg-[#061743] px-4 pb-10 pt-6 sm:px-8">
      <div className="mx-auto mb-7 w-fit rounded-full border border-white/20 bg-[#030b2a] px-5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        <nav className="flex items-center gap-5 text-sm font-semibold text-white/95">
          <span className="inline-flex items-center gap-1.5"><Home className="h-4 w-4" /> Home</span>
          <span className="inline-flex items-center gap-1.5"><UserRound className="h-4 w-4" /> Marketer</span>
          <span className="inline-flex items-center gap-1.5"><MessageSquareText className="h-4 w-4" /> Promoter</span>
        </nav>
      </div>

      <motion.div
        style={{ rotateX, scale, transformStyle: "preserve-3d" }}
        className="mx-auto w-full max-w-5xl rounded-[34px] border-4 border-[#6b6b6b] bg-[#202020] p-2 sm:p-3 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
      >
        <div className="overflow-hidden rounded-[24px] bg-black">
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
            <source src={DEMO_VIDEO} type="video/mp4" />
          </video>
        </div>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <p className="text-center md:text-left text-xs font-semibold text-white/70">
          {lang === "RU"
            ? "Демо-видео заглушка (автоплей, muted, loop) — легко заменить на ваш ролик."
            : "Placeholder demo video (autoplay, muted, loop) — easy to replace with your final clip."}
        </p>

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
