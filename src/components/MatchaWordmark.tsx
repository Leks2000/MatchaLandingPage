import React from "react";
import { Leaf } from "lucide-react";

export default function MatchaWordmark() {
  return (
    <div className="w-full flex justify-center">
      <div className="inline-flex items-center gap-3 text-white">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 border border-white/20">
          <Leaf className="h-8 w-8 text-[#8fffc9]" />
        </span>
        <span className="font-display font-black tracking-tight text-5xl sm:text-6xl md:text-7xl leading-none">
          Matcha
        </span>
      </div>
    </div>
  );
}
