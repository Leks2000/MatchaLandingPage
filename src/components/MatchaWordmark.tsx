import logo from "../imgs/matcha-wordmark-white.png";

export default function MatchaWordmark() {
  return (
    <div className="w-full flex justify-center">
      <img
        src={logo}
        alt="Matcha logo"
        loading="eager"
        decoding="async"
        className="w-[430px] sm:w-[630px] md:w-[820px] h-auto object-contain"
      />
    </div>
  );
}
