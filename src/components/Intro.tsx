import { useEffect } from "react";

export function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = setTimeout(onDone, reduce.matches ? 0 : 3600);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDone();
    };
    const onMotion = () => { if (reduce.matches) onDone(); };
    reduce.addEventListener("change", onMotion);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      reduce.removeEventListener("change", onMotion);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = oldOverflow;
    };
  }, [onDone]);

  return (
    <div className="portfolio-intro" aria-hidden="true">
      <div className="intro-name" aria-hidden="true">OJAS</div>
      <div className="intro-title" aria-hidden="true">PORTFOLIO</div>
    </div>
  );
}
