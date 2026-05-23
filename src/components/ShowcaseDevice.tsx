import React from "react";
import { Home, UserRound, MessageSquareText, ExternalLink, ScanLine } from "lucide-react";

interface ShowcaseDeviceProps {
  lang: "RU" | "EN";
}

const DEMO_VIDEO = "https://cdn.coverr.co/videos/coverr-man-using-smartphone-1579/1080p.mp4";
const REAL_QR = "https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=https%3A%2F%2Ft.me%2Fgetmatchabot";

export default function ShowcaseDevice({ lang }: ShowcaseDeviceProps) {
  return (
    <section className="relative mx-auto w-full max-w-6xl rounded-[28px] bg-[#061743] px-4 pb-10 pt-6 sm:px-8">
      <div className="mx-auto mb-7 w-fit rounded-full border border-white/20 bg-[#030b2a] px-5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        <nav className="flex items-center gap-5 text-sm font-semibold text-white/95">
          <span className="inline-flex items-center gap-1.5"><Home className="h-4 w-4" /> Home</span>
          <span className="inline-flex items-center gap-1.5"><UserRound className="h-4 w-4" /> Marketer</span>
          <span className="inline-flex items-center gap-1.5"><MessageSquareText className="h-4 w-4" /> Promoter</span>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-5xl rounded-[34px] border-4 border-[#6b6b6b] bg-[#202020] p-2 sm:p-3 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
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
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        <div className="rounded-3xl border border-[#d9dee7] bg-[#eef1f5] p-6 text-left shadow-[0_10px_35px_rgba(0,0,0,0.15)]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#9ee7be] bg-[#dff6e8] px-3 py-1 text-[11px] font-black tracking-[0.2em] text-[#12934f]">
            <ScanLine className="h-3.5 w-3.5" /> DESKTOP MODE
          </div>
          <h3 className="text-3xl font-black leading-tight text-[#0f1b3d]">
            {lang === "RU" ? "Запустите Matcha Bot в Telegram" : "Launch Matcha Bot in Telegram"}
          </h3>
          <p className="mt-3 text-base font-semibold text-[#64748b]">
            {lang === "RU"
              ? "Сканируйте реальный QR-код справа и сразу откройте @GETMATCHABOT."
              : "Scan the real QR code on the right and open @GETMATCHABOT instantly."}
          </p>
          <a
            href="https://t.me/getmatchabot"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-lg font-black text-[#15a34a]"
          >
            {lang === "RU" ? "Открыть в браузере" : "Open in browser"} <ExternalLink className="h-5 w-5" />
          </a>
        </div>

        <a
          href="https://t.me/getmatchabot"
          target="_blank"
          rel="noreferrer"
          className="justify-self-center lg:justify-self-end w-[280px] rounded-[28px] border border-[#b8f0cb] bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.2)]"
        >
          <img src={REAL_QR} alt="QR code to @GETMATCHABOT" className="w-full h-auto rounded-2xl" loading="lazy" decoding="async" />
          <p className="pt-2 text-center text-[#9aa8c3] text-sm font-black tracking-[0.2em]">@GETMATCHABOT</p>
        </a>
      </div>
    </section>
  );
}
