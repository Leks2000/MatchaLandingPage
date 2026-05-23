import logo from "../imgs/matcha-wordmark-white.png";

export default function MatchaWordmark() {
  return (
    <div className="w-full flex justify-center">
      <img
        src={logo}
        alt="Matcha logo"
        loading="eager"
        decoding="async"
        className="w-[520px] sm:w-[760px] md:w-[980px] h-auto object-contain"
      />
    </div>
  );
}
