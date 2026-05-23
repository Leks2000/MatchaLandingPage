import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ShowcaseDeviceProps {
  lang: "RU" | "EN";
}

export default function ShowcaseDevice({ lang }: ShowcaseDeviceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const rotateXMotion = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const rotateYMotion = useTransform(scrollYProgress, [0, 1], [-7, 0]);
  const translateYMotion = useTransform(scrollYProgress, [0, 1], [36, 0]);
  const scaleMotion = useTransform(scrollYProgress, [0, 1], [0.96, 1.02]);
  const opacityMotion = useTransform(scrollYProgress, [0, 0.8], [0.62, 1]);

  return (
    <section className="relative w-full max-w-5xl mx-auto pt-2 pb-8 px-4 md:px-8">
      <div
        ref={containerRef}
        className="w-full relative -mt-4 sm:-mt-6 flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          style={{
            rotateX: rotateXMotion,
            rotateY: rotateYMotion,
            y: translateYMotion,
            scale: scaleMotion,
            opacity: opacityMotion,
            transformStyle: "preserve-3d",
          }}
          className="w-full rounded-[30px] border-4 border-brand-mint-card/90 bg-[#F7FFFA] p-3 md:p-5 shadow-[0_35px_90px_rgba(8,44,22,0.34)]"
        >
          <div className="overflow-hidden rounded-2xl bg-[#0E1E14]">
            <video
              className="h-full w-full aspect-[16/9] object-cover object-left-top scale-[1.06]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls={false}
              poster="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop"
              aria-label={lang === "RU" ? "Демонстрационное видео Matcha Bot" : "Matcha Bot showcase video"}
            >
              <source src="https://cdn.coverr.co/videos/coverr-office-teamwork-1579/1080p.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
