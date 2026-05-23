import { motion } from "motion/react";

interface ShowcaseDeviceProps {
  lang: "RU" | "EN";
}

export default function ShowcaseDevice({ lang }: ShowcaseDeviceProps) {
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

    </section>
  );
}
