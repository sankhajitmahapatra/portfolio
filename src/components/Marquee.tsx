import React from "react";

interface MarqueeProps {
  texts: string[];
  direction?: "left" | "right";
  speed?: "slow" | "medium" | "fast";
  rotate?: string; // CSS rotation e.g. "rotate-1" or "rotate-2"
  bgClass?: string;
  textClass?: string;
}

export default function Marquee({
  texts,
  direction = "left",
  speed = "slow",
  rotate = "",
  bgClass = "bg-secondary-bg",
  textClass = "text-text-light"
}: MarqueeProps) {
  const scrollClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";
  
  // Construct a large continuous repeated string of phrases to cover wide viewports
  const repeatedPhrases = Array(20).fill(texts).flat();

  return (
    <div
      className={`w-full overflow-hidden border-y border-border-dark py-4 flex items-center select-none ${bgClass} ${rotate}`}
    >
      <div className="flex whitespace-nowrap min-w-full">
        {/* We output twice to create an infinite loop effect */}
        <div className={`flex gap-8 px-4 items-center shrink-0 ${scrollClass}`}>
          {repeatedPhrases.map((phrase, idx) => (
            <React.Fragment key={idx}>
              <span className={`font-display text-xs md:text-sm tracking-[0.25em] uppercase ${textClass}`}>
                {phrase}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-crimson shrink-0" />
            </React.Fragment>
          ))}
        </div>
        <div className={`flex gap-8 px-4 items-center shrink-0 ${scrollClass}`} aria-hidden="true">
          {repeatedPhrases.map((phrase, idx) => (
            <React.Fragment key={`dup-${idx}`}>
              <span className={`font-display text-xs md:text-sm tracking-[0.25em] uppercase ${textClass}`}>
                {phrase}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-crimson shrink-0" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
